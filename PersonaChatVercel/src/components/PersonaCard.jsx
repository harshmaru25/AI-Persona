import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PersonaCard = ({ persona, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className="group flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border transition-colors duration-300"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="h-56 w-full overflow-hidden sm:h-72">
        <img
          src={persona.image}
          alt={persona.name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold">{persona.name}</h3>
        <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          {persona.tagline}
        </p>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {persona.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {persona.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-3 py-1 text-xs"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => navigate(`/chat/${persona.id}`)}
          className="mt-6 flex items-center justify-center gap-2 rounded-full py-3 font-medium text-white transition-all duration-300 group-hover:shadow-lg"
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--accent))",
          }}
        >
          Start Chat
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
};

export default PersonaCard;
