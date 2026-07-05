// Since Vercel serverless functions return the full reply in one shot
// (no SSE here), this reveals the text gradually on the client so the
// chat still feels like it's "typing" instead of popping in all at once.
export const revealText = (fullText, onUpdate, onComplete) => {
  let i = 0;
  const chunkSize = Math.max(1, Math.round(fullText.length / 120)); // ~120 ticks total
  const intervalId = setInterval(() => {
    i += chunkSize;
    if (i >= fullText.length) {
      onUpdate(fullText);
      clearInterval(intervalId);
      onComplete();
    } else {
      onUpdate(fullText.slice(0, i));
    }
  }, 15);

  return () => clearInterval(intervalId); // allow cancellation if needed
};
