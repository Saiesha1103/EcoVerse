import { motion } from "framer-motion";
import { useMemo } from "react";

function Stars({ count = 60 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 1.6 + 0.6,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 3,
      })),
    [count]
  );

  return (
    <>
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute animate-twinkle rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </>
  );
}

export default function Background() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 12% 8%, rgba(34,197,94,0.34) 0%, rgba(34,197,94,0.10) 24%, transparent 45%), radial-gradient(circle at 86% 76%, rgba(6,182,212,0.20) 0%, transparent 42%), #050B14",
      }}
    >
      <motion.div
        className="absolute -left-48 -top-48 h-[800px] w-[800px] rounded-full blur-[130px]"
        style={{ backgroundColor: "rgba(34,197,94,0.24)" }}
        animate={{
          x: [0, 60, -20, 0],
          y: [0, -40, 30, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-52 -right-44 h-[750px] w-[750px] rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(6,182,212,0.18)" }}
        animate={{
          x: [0, -40, 25, 0],
          y: [0, 30, -20, 0],
          opacity: [0.5, 0.85, 0.5],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="grid-overlay absolute inset-0 opacity-[0.20]" />

      <div className="absolute inset-0 opacity-35">
        <Stars />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 10%, transparent 0%, rgba(5,11,20,0.12) 48%, rgba(5,11,20,0.72) 100%)",
        }}
      />
    </div>
  );
}