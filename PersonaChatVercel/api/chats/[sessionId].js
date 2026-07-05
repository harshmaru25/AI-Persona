import { connectDB } from "../_lib/db.js";
import Chat from "../_lib/chatModel.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { sessionId } = req.query;

  try {
    await connectDB();
    const chats = await Chat.find({ sessionId })
      .sort({ updatedAt: -1 })
      .select("chatId persona title updatedAt createdAt");
    return res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("Error in /api/chats/[sessionId]:", error);
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
}
