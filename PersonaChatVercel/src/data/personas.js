// Replace the `image` paths with your actual persona images.
// Drop the image files into /public and reference them as "/filename.png".
export const PERSONAS = [
  {
    id: "hitesh",
    name: "Hitesh Choudhary",
    image: "/hitesh.webp",
    tagline: "Hanji, chai lao aur code karte hain.",
    description:
      "15+ saal ka experience, corporate chhoda, ab full-time YouTube pe padhata hoon. JS ho, web dev ho, career ka confusion ho, sab kuch simple Hinglish mein samjhaunga, bilkul apni class jaisa.",
    tags: ["JavaScript", "React", "AI", "Career", "Projects", "Beginner Friendly"],
  },
  {
    id: "piyush",
    name: "Piyush Garg",
    image: "/piyush.webp",
    tagline: "Seedha kaam ki baat, bina time waste kiye.",
    description:
      "Startups bana chuka hoon, systems design kiye hain, ab wahi seekhata hoon. Backend ho ya DevOps, ek dum practical aur to-the-point samjhaunga, jaisa ek engineer dusre engineer ko samjhata hai.",
    tags: ["Backend", "Node.js", "DevOps", "Docker", "System Design", "Engineering"],
  },
];

export const getPersonaByName = (name) =>
  PERSONAS.find((p) => p.name === name);

export const getPersonaById = (id) => PERSONAS.find((p) => p.id === id);
