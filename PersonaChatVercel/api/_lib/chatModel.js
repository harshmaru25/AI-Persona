import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "model"], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const chatSchema = new mongoose.Schema(
  {
    chatId: { type: String, required: true, unique: true, index: true },
    sessionId: { type: String, required: true, index: true },
    persona: { type: String, required: true },
    title: { type: String, default: "New Chat" },
    messages: { type: [messageSchema], default: [] },
  },
  { timestamps: true }
);

// Prevent "OverwriteModelError" when the serverless function is invoked
// on an already-warm container that has this module cached.
const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
