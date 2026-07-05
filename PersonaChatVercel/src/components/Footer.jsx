const Footer = () => {
  return (
    <footer
      className="border-t px-6 py-10 text-center text-sm"
      style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
    >
      <p>
        Built for learners who want personalized guidance from AI personas
        inspired by their favorite mentors.
      </p>
      <p className="mt-2 max-w-xl mx-auto opacity-80">
        These AI personas are inspired by publicly available educational
        content and are intended for learning purposes. They are not the
        actual individuals.
      </p>
    </footer>
  );
};

export default Footer;
