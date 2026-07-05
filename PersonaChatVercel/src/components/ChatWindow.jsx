import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import EmptyState from "./EmptyState";

const ChatWindow = ({ persona, messages, isStreaming, onRegenerate }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const lastModelIndex = [...messages].map((m) => m.role).lastIndexOf("model");

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div
        className="flex items-center gap-3 border-b px-5 py-3.5"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
          <img
            src={persona?.image}
            alt={persona?.name}
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div>
          <p className="text-sm font-medium">{persona?.name}</p>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            {isStreaming ? "typing..." : "online"}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-3">
        {messages.length === 0 ? (
          <EmptyState persona={persona} />
        ) : (
          <>
            {messages.map((msg, i) => (
              <MessageBubble
                key={i}
                message={msg}
                isLast={msg.role === "model" && i === lastModelIndex}
                isStreaming={isStreaming && i === messages.length - 1 && msg.role === "model"}
                onRegenerate={onRegenerate}
              />
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
