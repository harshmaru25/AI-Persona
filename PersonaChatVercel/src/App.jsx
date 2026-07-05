import { Routes, Route } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat/:personaId" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
