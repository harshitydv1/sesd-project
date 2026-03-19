import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import ProductModel from "../models/productModel";

// functions for add product
const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, category, subcategory, sizes, bestseller } =
      req.body as {
        name: string;
        description: string;
        price: string;
        category: string;
        subcategory: string;
        sizes: string;
        bestseller: string;
      };

    const image1 =
      (req.files as Record<string, Express.Multer.File[]>)?.image1?.[0];
    const image2 =
      (req.files as Record<string, Express.Multer.File[]>)?.image2?.[0];
    const image3 =
      (req.files as Record<string, Express.Multer.File[]>)?.image3?.[0];
    const image4 =
      (req.files as Record<string, Express.Multer.File[]>)?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl: string[] = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        console.log("Cloudinary upload result:", result);
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subcategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      images: imagesUrl,
      date: new Date(),
    };

    const product = new ProductModel(productData);
    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// functions for list product
const listProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// functions for remove product
const removeProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    await ProductModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// functions for single product info
const singleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.body as { productId: string };
    const product = await ProductModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
