const SESSION_KEY = "persona-chat-session-id";

export const getSessionId = () => {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
};

export const generateChatId = () => crypto.randomUUID();
