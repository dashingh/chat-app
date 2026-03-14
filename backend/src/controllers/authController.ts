import type { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { clerkClient } from "@clerk/express";

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    next(error);
  }
};



export const authCallback = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId: clerkId } = req.body;
    if (!clerkId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(clerkId);
      if (!clerkUser) {
        res.status(404).json({ message: "User not found" });
      }

      res.status(404).json({ message: "User not found" });

      user = await User.create({
        clerkId,
        name: clerkUser.firstName
          ? `${clerkUser.firstName} ${clerkUser.lastName}`.trim()
          : clerkUser.emailAddresses[0]?.emailAddress.split("@")[0] || "User",
        email: clerkUser.emailAddresses[0]?.emailAddress,
        avatar: clerkUser.imageUrl,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    next(error);
  }
};
