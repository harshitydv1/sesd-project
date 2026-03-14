import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  body: Request["body"] & { userId?: string };
}

const authUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { token } = req.headers as { token?: string };

  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const token_decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default authUser;
