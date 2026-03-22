import { Request, Response } from "express";
import UserModel from "../models/userModel";

// add product to cart
const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, itemId, size } = req.body as {
      userId: string;
      itemId: string;
      size: string;
    };
    const userData = await UserModel.findById(userId);
    if (!userData) {
      res.json({ success: false, message: "User not found" });
      return;
    }
    let cartData = userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await UserModel.findByIdAndUpdate(userId, { cartData });
    res.json({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// update user cart
const updateCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, itemId, size, quantity } = req.body as {
      userId: string;
      itemId: string;
      size: string;
      quantity: number;
    };
    const userData = await UserModel.findById(userId);
    if (!userData) {
      res.json({ success: false, message: "User not found" });
      return;
    }
    let cartData = userData.cartData;

    cartData[itemId][size] = quantity;

    await UserModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// get user cart
const getUserCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body as { userId: string };
    const userData = await UserModel.findById(userId);
    if (!userData) {
      res.json({ success: false, message: "User not found" });
      return;
    }
    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export { addToCart, updateCart, getUserCart };
