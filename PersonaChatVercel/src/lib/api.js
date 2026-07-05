const API_BASE = import.meta.env.VITE_API_URL || "/api";

/**
 * Sends a chat message (or a regenerate request) and returns the full reply.
 * Vercel's serverless functions don't support long-lived SSE streaming on
 * the free tier, so this is a single request/response instead of a stream.
 */
export const sendChatMessage = async ({ chatId, sessionId, persona, message, regenerate }) => {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId, sessionId, persona, message, regenerate }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to reach the server.");
  }

  return data; // { success, chatId, title, reply }
};

export const fetchChatHistory = async (chatId) => {
  const res = await fetch(`${API_BASE}/chat/${chatId}`);
  if (!res.ok) throw new Error("Failed to load chat history");
  const data = await res.json();
  return data.chat;
};

export const fetchChatList = async (sessionId) => {
  const res = await fetch(`${API_BASE}/chats/${sessionId}`);
  if (!res.ok) throw new Error("Failed to load chat list");
  const data = await res.json();
  return data.chats;
};

export const deleteChatThread = async (chatId) => {
  const res = await fetch(`${API_BASE}/chat/${chatId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete chat");
  return res.json();
};
