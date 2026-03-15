import type { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { clerkClient } from "@clerk/express";
import { Chat } from "../models/Chat";
import { Message } from "../models/Message";

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    const chatId = req.params.chatId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const chat = await Chat.findOne({ _id: chatId, participants: userId });

    if (!chat) {
      res.status(404).json({ message: "Chat not found" });
      return;
    }

    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name avatar email")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500);
    next(error);
  }
};
