import { HITESH_CHOUDHARY, PIYUSH_GARG } from "./systemPrompt.js";

export const personaPrompts = {
  "Hitesh Choudhary": HITESH_CHOUDHARY,
  "Piyush Garg": PIYUSH_GARG,
};

// Converts stored {role, content} messages into @google/genai's
// {role, parts:[{text}]} format. "model" stays "model", everything else is "user".
export const toGeminiHistory = (messages) =>
  messages.map((m) => ({
    role: m.role === "model" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

export const makeTitle = (text) => {
  const trimmed = text.trim().replace(/\s+/g, " ");
  return trimmed.length > 40 ? trimmed.slice(0, 40) + "..." : trimmed;
};
