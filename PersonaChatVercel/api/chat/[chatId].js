import { connectDB } from "../_lib/db.js";
import Chat from "../_lib/chatModel.js";

export default async function handler(req, res) {
  const { chatId } = req.query;

  try {
    await connectDB();

    if (req.method === "GET") {
      const chat = await Chat.findOne({ chatId });
      if (!chat) {
        return res.status(404).json({ success: false, error: "Chat not found" });
      }
      return res.status(200).json({
        success: true,
        chat: {
          chatId: chat.chatId,
          persona: chat.persona,
          title: chat.title,
          messages: chat.messages,
        },
      });
    }

    if (req.method === "DELETE") {
      const deleted = await Chat.findOneAndDelete({ chatId });
      if (!deleted) {
        return res.status(404).json({ success: false, error: "Chat not found" });
      }
      return res.status(200).json({ success: true });
    }

    res.setHeader("Allow", ["GET", "DELETE"]);
    return res.status(405).json({ success: false, error: "Method not allowed" });
  } catch (error) {
    console.error("Error in /api/chat/[chatId]:", error);
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
}
