import mongoose, { type Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>("User", UserSchema);