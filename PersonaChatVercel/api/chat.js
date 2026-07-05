import { connectDB } from "./_lib/db.js";
import Chat from "./_lib/chatModel.js";
import client from "./_lib/geminiClient.js";
import { personaPrompts, toGeminiHistory, makeTitle } from "./_lib/chatHelpers.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { chatId, sessionId, persona, message, regenerate } = req.body || {};

  if (!chatId || !sessionId || !persona || (!regenerate && !message)) {
    return res.status(400).json({
      success: false,
      error: "chatId, sessionId, persona and message are required",
    });
  }

  const systemPrompt = personaPrompts[persona];
  if (!systemPrompt) {
    return res.status(400).json({ success: false, error: "Invalid persona selected!" });
  }

  try {
    await connectDB();

    let chat = await Chat.findOne({ chatId });
    if (!chat) {
      chat = new Chat({ chatId, sessionId, persona, messages: [] });
    }

    let messageToSend;

    if (regenerate) {
      if (chat.messages.length === 0) {
        return res.status(400).json({ success: false, error: "Nothing to regenerate yet." });
      }
      if (chat.messages[chat.messages.length - 1].role === "model") {
        chat.messages.pop();
      }
      const lastUserMsg = chat.messages[chat.messages.length - 1];
      if (!lastUserMsg || lastUserMsg.role !== "user") {
        return res.status(400).json({ success: false, error: "No previous message found to regenerate." });
      }
      messageToSend = lastUserMsg.content;
    } else {
      chat.messages.push({ role: "user", content: message });
      messageToSend = message;
    }

    const history = toGeminiHistory(chat.messages.slice(0, -1));

    const chatSession = client.chats.create({
      model: "gemini-2.5-flash",
      history,
      config: { systemInstruction: systemPrompt },
    });

    const result = await chatSession.sendMessage({ message: messageToSend });
    const reply = result.text;

    chat.messages.push({ role: "model", content: reply });

    const isFirstMessage = chat.messages.filter((m) => m.role === "user").length === 1;
    if (isFirstMessage) {
      chat.title = makeTitle(chat.messages[0].content);
    }

    await chat.save();

    return res.status(200).json({
      success: true,
      chatId: chat.chatId,
      title: chat.title,
      reply,
    });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return res.status(500).json({ success: false, error: "Something went wrong while generating a response." });
  }
}
