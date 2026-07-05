import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import PersonaCard from "../components/PersonaCard";
import Footer from "../components/Footer";
import { PERSONAS } from "../data/personas";

const Landing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <Hero />
        <AboutSection />

        <section id="personas" className="flex flex-col items-center px-6 pb-24">
          <span
            className="mb-4 rounded-full border px-4 py-1.5 text-sm font-medium"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
          >
            Choose Your AI Mentor
          </span>

          <div className="flex flex-wrap justify-center gap-8">
            {PERSONAS.map((persona, i) => (
              <PersonaCard key={persona.id} persona={persona} index={i} />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Landing;
