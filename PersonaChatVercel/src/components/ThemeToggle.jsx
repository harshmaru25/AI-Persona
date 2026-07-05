import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="fixed top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
