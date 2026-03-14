import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MongoDB_URI = process.env.MONGODB_URI;
    if (!MongoDB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }
    await mongoose.connect(MongoDB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
