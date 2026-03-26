import express, { Router } from "express";
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController";
import authUser from "../middleware/auth";
import adminAuth from "../middleware/adminAuth";

const orderRouter: Router = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth as any, allOrders);
orderRouter.post("/status", adminAuth as any, updateStatus);

// Payment Features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);

// User Features
orderRouter.post("/userorders", authUser, userOrders);

// Verify Payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
