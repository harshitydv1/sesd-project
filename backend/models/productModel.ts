import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory: string;
  sizes: string[];
  bestseller?: boolean;
  date: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  sizes: { type: [String], required: true },
  bestseller: { type: Boolean },
  date: { type: Date, required: true },
});

const ProductModel =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
