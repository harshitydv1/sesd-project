import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  userId: string;
  items: Record<string, Record<string, number>>;
  amount: number;
  address: string;
  status: string;
  paymentMethod: string;
  payment: boolean;
  Date: number;
}

const orderSchema = new Schema<IOrder>({
  userId: { type: String, required: true },
  items: { type: Object, required: true },
  amount: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  Date: { type: Number, required: true },
});

const orderModel =
  mongoose.models.order || mongoose.model<IOrder>("order", orderSchema);

export default orderModel;
