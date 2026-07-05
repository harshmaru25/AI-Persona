import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div
        className="flex flex-col items-center gap-5 rounded-2xl border px-12 py-10 backdrop-blur-xl"
        style={{
          backgroundColor: "color-mix(in srgb, var(--card) 60%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl text-xl font-bold text-white"
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--accent))",
          }}
        >
          P
        </div>
        <p
          className="font-medium tracking-wide"
          style={{ color: "var(--text-secondary)" }}
        >
          Loading AI Mentors...
        </p>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
