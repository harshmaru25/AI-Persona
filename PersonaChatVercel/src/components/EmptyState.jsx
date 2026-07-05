import { motion } from "framer-motion";

const EmptyState = ({ persona }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-5 h-20 w-20 shrink-0 overflow-hidden rounded-full"
        style={{ border: "2px solid var(--border)" }}
      >
        <img
          src={persona?.image}
          alt={persona?.name}
          className="h-full w-full object-cover object-top"
        />
      </motion.div>






      {/* <motion.img
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        src={persona?.image}
        alt={persona?.name}
        className="mb-5 h-20 w-20 rounded-full object-cover"
        style={{ border: "2px solid var(--border)" }}
      /> */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-2xl font-semibold"
      >
        Let's talk
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-2 max-w-sm text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        Ask {persona?.name} anything — code, career advice, or just say hi.
      </motion.p>
    </div>
  );
};

export default EmptyState;
