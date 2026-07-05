import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToPersonas = () => {
    document.getElementById("personas")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Ambient background blobs */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "var(--primary)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "var(--accent)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-6 rounded-full border px-4 py-1.5 text-sm font-medium"
        style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
      >
        Choose your AI mentor
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
      >
        Chat With The Mentors
        {" "}
        <span
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--accent))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Who Taught A Million Coders
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="relative mt-6 max-w-xl text-base sm:text-lg"
        style={{ color: "var(--text-secondary)" }}
      >
        Hitesh Choudhary and Piyush Garg, reimagined as AI mentors who answer in their own style, the moment you have a question. No sign ups, no waiting, just open a chat and start learning.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        onClick={scrollToPersonas}
        className="relative mt-10 flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-white shadow-lg transition-transform hover:scale-105"
        style={{
          background: "linear-gradient(135deg, var(--primary), var(--accent))",
        }}
      >
        Explore AI Mentors
        <ArrowRight size={18} />
      </motion.button>
    </section>
  );
};

export default Hero;
