import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import { getPersonaById, getPersonaByName } from "../data/personas";
import { getSessionId, generateChatId } from "../lib/session";
import {
  sendChatMessage,
  fetchChatHistory,
  fetchChatList,
  deleteChatThread,
} from "../lib/api";
import { revealText } from "../lib/typingReveal";

const Chat = () => {
  const { personaId } = useParams();
  const navigate = useNavigate();
  const sessionId = getSessionId();

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [activePersona, setActivePersona] = useState(getPersonaById(personaId));
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const refreshChatList = useCallback(async () => {
    try {
      const list = await fetchChatList(sessionId);
      setChats(list);
    } catch (err) {
      console.error(err);
    }
  }, [sessionId]);

  useEffect(() => {
    refreshChatList();
  }, [refreshChatList]);

  // Fresh visit from a persona card — start a brand-new, unsaved chat thread.
  useEffect(() => {
    const persona = getPersonaById(personaId);
    if (persona) {
      setActivePersona(persona);
      setActiveChatId(generateChatId());
      setMessages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personaId]);

  const handleSelectChat = async (chat) => {
    setActiveChatId(chat.chatId);
    setActivePersona(getPersonaByName(chat.persona));
    setMessages([]);
    try {
      const full = await fetchChatHistory(chat.chatId);
      setMessages(full.messages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewChat = (personaName) => {
    const persona = getPersonaByName(personaName);
    setActivePersona(persona);
    setActiveChatId(generateChatId());
    setMessages([]);
    navigate(`/chat/${persona.id}`, { replace: true });
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChatThread(chatId);
      setChats((prev) => prev.filter((c) => c.chatId !== chatId));
      if (chatId === activeChatId) {
        handleNewChat(activePersona.name);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const runRequest = async (payload) => {
    setIsStreaming(true);
    try {
      const data = await sendChatMessage(payload);
      revealText(
        data.reply,
        (partial) => {
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            updated[updated.length - 1] = { ...last, content: partial };
            return updated;
          });
        },
        () => {
          setIsStreaming(false);
          refreshChatList();
        }
      );
    } catch (err) {
      setIsStreaming(false);
      const errMsg = err.message || "Something went wrong.";
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        updated[updated.length - 1] = { ...last, content: `⚠️ ${errMsg}` };
        return updated;
      });
    }
  };

  const handleSend = (text) => {
    if (isStreaming) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "model", content: "" },
    ]);
    runRequest({
      chatId: activeChatId,
      sessionId,
      persona: activePersona.name,
      message: text,
      regenerate: false,
    });
  };

  const handleRegenerate = () => {
    if (isStreaming) return;
    setMessages((prev) => {
      const updated = [...prev];
      if (updated[updated.length - 1]?.role === "model") updated.pop();
      return [...updated, { role: "model", content: "" }];
    });
    runRequest({
      chatId: activeChatId,
      sessionId,
      persona: activePersona.name,
      regenerate: true,
    });
  };

  if (!activePersona) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p style={{ color: "var(--text-secondary)" }}>Persona not found.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--bg)" }}>
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />
      <div className="flex flex-1 flex-col">
        <ChatWindow
          persona={activePersona}
          messages={messages}
          isStreaming={isStreaming}
          onRegenerate={handleRegenerate}
        />
        <ChatInput onSend={handleSend} disabled={isStreaming} />
      </div>
    </div>
  );
};

export default Chat;
