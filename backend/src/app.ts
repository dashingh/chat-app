import express from "express";

import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import messagesRoutes from "./routes/messagesRoutes";
import userRoutes from "./routes/userRoutes";


const app = express();


app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.json({ message: "Server is running", status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", userRoutes);


export default app;
