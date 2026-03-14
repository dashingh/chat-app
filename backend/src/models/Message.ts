import mongoose, { type Document, Schema } from "mongoose";

export interface IMessage extends Document {
  chat: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true},
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true},
    text: { type: String, trim: true , required: true},
  },
  {
    timestamps: true,
  },
);

// indexes for faster query
MessageSchema.index({ chat: 1, createdAt: 1 }); // oldest one first
// 1 - asc
// -1 - desc

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
