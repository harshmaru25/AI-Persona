import { Plus, Trash2, MessageSquare, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PERSONAS } from "../data/personas";

const Sidebar = ({ chats, activeChatId, onSelectChat, onNewChat, onDeleteChat }) => {
  const navigate = useNavigate();

  return (
    <aside
      className="flex h-full w-72 shrink-0 flex-col border-r"
      style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-2 border-b p-4" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={() => navigate("/")}
          aria-label="Back to home"
          className="flex h-8 w-8 items-center justify-center rounded-lg border"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
        >
          <ArrowLeft size={16} />
        </button>
        <span className="font-semibold">Your Chats</span>
      </div>

      <div className="flex flex-col gap-2 p-3">
        {PERSONAS.map((persona) => (
          <button
            key={persona.id}
            onClick={() => onNewChat(persona.name)}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors hover:opacity-90"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            <Plus size={15} />
            New chat with {persona.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-3">
        {chats.length === 0 && (
          <p className="px-3 py-4 text-xs" style={{ color: "var(--text-secondary)" }}>
            No conversations yet. Start one above.
          </p>
        )}
        {chats.map((chat) => (
          <div
            key={chat.chatId}
            onClick={() => onSelectChat(chat)}
            className="group flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors"
            style={{
              backgroundColor: chat.chatId === activeChatId ? "var(--card-hover)" : "transparent",
            }}
          >
            <div className="flex min-w-0 items-center gap-2">
              <MessageSquare size={14} style={{ color: "var(--text-secondary)" }} className="shrink-0" />
              <div className="min-w-0">
                <p className="truncate">{chat.title || "New Chat"}</p>
                <p className="truncate text-xs" style={{ color: "var(--text-secondary)" }}>
                  {chat.persona}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.chatId);
              }}
              aria-label="Delete chat"
              className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
              style={{ color: "var(--danger)" }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
