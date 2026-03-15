import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import UserModel from "../models/userModel";

const createToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

// Route for user login
const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.json({ success: false, message: "User does not exist" });
      return;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id.toString());
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

//Route for user registration
const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    // Check if user already exists
    const exists = await UserModel.findOne({ email });
    if (exists) {
      res.json({ success: false, message: "User already exists" });
      return;
    }

    // Validate email format and strong password
    if (!validator.isEmail(email)) {
      res.json({ success: false, message: "Please enter a valid email" });
      return;
    }
    if (password.length < 8) {
      res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
      return;
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id.toString());

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

//Route for admin login
const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email, password },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export { loginUser, registerUser, adminLogin };
