import express, { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb";
import connectCloudinary from "./config/cloudinary";
import userRouter from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import cartRouter from "./routes/cartRoute";
import orderRouter from "./routes/orderRoute";

// App config
const app: Express = express();
const port: string | number = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server started on PORT : " + port));
