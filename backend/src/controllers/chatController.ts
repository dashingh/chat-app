import type { NextFunction, Request, Response } from "express";
import { Chat } from "../models/Chat";

export const getChats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const chats = await Chat.find({ participants: userId })
      .populate("participants", "name email avatar")
      .populate("lastMessage", "text createdAt")
      .sort({ updatedAt: -1 });

    const formattedChats = chats.map((chat) => {
      const otherParticipants = chat.participants.find(
        (p) => p._id.toString() !== userId,
      );

      return {
        _id: chat._id,
        participant: otherParticipants,
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt,
        createdAt: chat.createdAt,
      };
    });

    res.status(200).json(formattedChats);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

export const getOrCreateChat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    const participantId = req.params.participantId;

    // chk if chat exists
    let chat = await Chat.findOne({
      participants: { $all: [userId, participantId] },
    })
      .populate("participants", "name email avatar")
      .populate("lastMessage", "text createdAt");

    if (!chat) {
      const newChat = new Chat({
        participants: [userId, participantId],
      });
      await newChat.save();
      chat = await newChat.populate("participants", "name email avatar");
    }

    const otherParticipants = chat.participants.find(
      (p) => p._id.toString() !== userId,
    );

    res.status(200).json({
      _id: chat._id,
      participant: otherParticipants ?? null,
      lastMessage: chat.lastMessage,
      lastMessageAt: chat.lastMessageAt,
      createdAt: chat.createdAt,
    });


  } catch (error) {
    res.status(500);
    next(error);
  }
};
