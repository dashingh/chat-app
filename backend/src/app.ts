import express from "express";
import { clerkMiddleware } from '@clerk/express'

import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import messagesRoutes from "./routes/messagesRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";


const app = express();

app.use(clerkMiddleware())
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.json({ message: "Server is running", status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", userRoutes);


// error handler must come after all the routes and other middlewares so they can catch errors passed with next(err) or thrown inside async handler.
app.use(errorHandler);



export default app;
