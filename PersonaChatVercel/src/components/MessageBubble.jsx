import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, RotateCcw } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// Splits AI reply content into alternating HTML and fenced-code segments
// so code blocks can be syntax highlighted separately from prose/HTML.
const parseContent = (content) => {
  const parts = [];
  const codeFenceRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeFenceRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "html", value: content.slice(lastIndex, match.index) });
    }
    parts.push({ type: "code", lang: match[1] || "javascript", value: match[2] });
    lastIndex = codeFenceRegex.lastIndex;
  }
  if (lastIndex < content.length) {
    parts.push({ type: "html", value: content.slice(lastIndex) });
  }
  return parts;
};

const MessageBubble = ({ message, isLast, onRegenerate, isStreaming }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (isUser) {
    return (
      <div className="flex justify-end px-4 py-2">
        <div
          className="max-w-[75%] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm sm:text-base"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  const parts = parseContent(message.content);

  return (
    <div className="flex justify-start px-4 py-2">
      <div className="max-w-[80%]">
        <div
          className="rounded-2xl rounded-bl-sm border px-4 py-3 text-sm leading-relaxed sm:text-base"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
        >
          {parts.map((part, i) =>
            part.type === "code" ? (
              <div key={i} className="my-2 overflow-hidden rounded-lg text-xs sm:text-sm">
                <SyntaxHighlighter
                  language={part.lang}
                  style={theme === "dark" ? oneDark : oneLight}
                  customStyle={{ margin: 0, borderRadius: "0.5rem" }}
                >
                  {part.value}
                </SyntaxHighlighter>
              </div>
            ) : (
              <span
                key={i}
                dangerouslySetInnerHTML={{ __html: part.value }}
              />
            )
          )}
          {isStreaming && (
            <span
              className="ml-1 inline-block h-4 w-1.5 animate-pulse align-middle"
              style={{ backgroundColor: "var(--text-secondary)" }}
            />
          )}
        </div>

        {!isStreaming && message.content && (
          <div className="mt-1.5 flex gap-3 px-1">
            <button
              onClick={handleCopy}
              aria-label="Copy response"
              className="flex items-center gap-1 text-xs transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
            {isLast && (
              <button
                onClick={onRegenerate}
                aria-label="Regenerate response"
                className="flex items-center gap-1 text-xs transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <RotateCcw size={14} />
                Regenerate
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
