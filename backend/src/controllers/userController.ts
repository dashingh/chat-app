import type { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { clerkClient } from "@clerk/express";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const users = await User.find({ _id: { $ne: userId } })
      .select("name email avatar")
      .limit(50);

    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    next(error);
  }
};
