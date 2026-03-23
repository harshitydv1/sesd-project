import express, { Router } from "express";
import { addToCart, getUserCart, updateCart } from "../controllers/cartController";
import authUser from "../middleware/auth";

const cartRouter: Router = express.Router();

cartRouter.post("/get", authUser, getUserCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
