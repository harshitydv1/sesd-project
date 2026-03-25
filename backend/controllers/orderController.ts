import { Request, Response } from "express";
import orderModel from "../models/orderModel";
import UserModel from "../models/userModel";
import Stripe from "stripe";

interface AuthenticatedRequest extends Request {
  body: Request["body"] & { userId?: string };
}

// global variable
const currency = "inr";
const deliveryCharges = 10;

// Lazy initialize Stripe
let stripe: Stripe | null = null;

const getStripeInstance = (): Stripe => {
  if (!stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY environment variable is not set");
    }
    stripe = new Stripe(secretKey);
  }
  return stripe;
};

// Placing orders using COD Method
const placeOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { userId, items, amount, address } = req.body as {
      userId: string;
      items: Record<string, Record<string, number>>;
      amount: number;
      address: string;
    };

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      Date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Placing orders using Stripe Method
const placeOrderStripe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { userId, items, amount, address } = req.body as {
      userId: string;
      items: Array<{ name: string; price: number; quantity: number }>;
      amount: number;
      address: string;
    };
    const { origin } = req.headers as { origin?: string };

    const orderData = {
      userId,
      items: {} as Record<string, Record<string, number>>,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      Date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await getStripeInstance().checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items: line_items as Stripe.Checkout.SessionCreateParams.LineItem[],
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Verify stripe
const verifyStripe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { orderId, success, userId } = req.body as {
    orderId: string;
    success: string;
    userId: string;
  };

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await UserModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// All Orders for admin Panel
const allOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// User Order data for Frontend
const userOrders = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.body as { userId: string };
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

//update order status
const updateStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, status } = req.body as {
      orderId: string;
      status: string;
    };

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export {
  verifyStripe,
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
