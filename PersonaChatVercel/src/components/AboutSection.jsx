import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <h2 className="text-3xl font-bold sm:text-4xl">
          Two Mentors, Two Styles
        </h2>
        <p className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          One explains over chai, the other gets straight to the point. Both
          have taught thousands of students already, now it's your turn.
          Pick the one you want to talk to below, and ask away, just like you
          would in a real conversation with them.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutSection;
