import { useState } from "react";
import { Send } from "lucide-react";

const ChatInput = ({ onSend, disabled }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t p-4"
      style={{ borderColor: "var(--border)" }}
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message your mentor..."
        rows={1}
        disabled={disabled}
        className="max-h-40 flex-1 resize-none rounded-xl border px-4 py-3 text-sm outline-none sm:text-base"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-opacity disabled:opacity-40"
        style={{
          background: "linear-gradient(135deg, var(--primary), var(--accent))",
        }}
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default ChatInput;
