import { motion } from "framer-motion";
import { useMemo } from "react";
import { FiActivity, FiCpu, FiGitBranch } from "react-icons/fi";
import portal from '../assets/portal.png'
import { PrimaryButton, SecondaryButton } from "./ui";
import terrainImage from '../assets/terrain.png'

const headlineWords = ["Model", "Nature."];
const headlineWords2 = ["Observe", "Intelligence."];

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 6,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/60"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.15, 0.8, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      {/* Portal background image */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-20"
      >
        <motion.img
          src={portal}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[70%_20%] opacity-[0.32] sm:object-[65%_center]"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/85 to-background" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="grid-overlay absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)]" />

      <motion.div
        className="absolute left-1/2 top-1/3 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[110px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Particles />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            <FiActivity className="h-3.5 w-3.5" />
            Live ecosystem simulation engine
          </motion.div>

          <h1 className="pb-2 text-4xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12 }}
                className="mr-4 inline-block overflow-visible pb-[0.24em] text-gradient-primary"
              >
                {word}
              </motion.span>
            ))}
            <span className="block pb-4 leading-[1.25]">
            {headlineWords2.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
                className="mr-4 inline-block text-gradient-primary"
              >
                {word}
              </motion.span>
            ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            EcoVerse is an interactive ecosystem simulation platform that
            combines graph algorithms, autonomous agents and real-time
            environmental modeling into one intelligent research
            environment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <PrimaryButton href="/simulation">Launch Simulation</PrimaryButton>
            <SecondaryButton href="#documentation">
              Explore Documentation
            </SecondaryButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-14 flex items-center gap-8 border-t border-white/5 pt-6 font-mono-data text-xs text-muted"
          >
            <div>
              <div className="text-lg font-semibold text-ink">120K+</div>
              simulated agents / run
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="text-lg font-semibold text-ink">6</div>
              graph algorithms
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="text-lg font-semibold text-ink">60fps</div>
              real-time render
            </div>
          </motion.div>
        </div>

        {/* Right: floating ecosystem UI */}
        <div className="relative hidden h-[420px] lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="glass-strong absolute inset-4 overflow-hidden rounded-3xl p-3"
          >
            <motion.img
              src={terrainImage}
              alt="EcoVerse terrain simulation"
              className="h-full w-full rounded-2xl object-cover"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div
            className="glass absolute -left-6 top-4 flex items-center gap-3 rounded-xl px-4 py-3"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FiGitBranch className="h-4 w-4 text-secondary" />
            <div>
              <div className="font-mono-data text-[11px] text-muted">
                pathfinding
              </div>
              <div className="text-sm font-semibold text-ink">
                Dijkstra active
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass absolute -right-4 top-1/2 flex items-center gap-3 rounded-xl px-4 py-3"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <FiCpu className="h-4 w-4 text-primary" />
            <div>
              <div className="font-mono-data text-[11px] text-muted">
                population
              </div>
              <div className="text-sm font-semibold text-ink">1,842</div>
            </div>
          </motion.div>

          <motion.div
            className="glass absolute -bottom-2 left-10 flex items-center gap-3 rounded-xl px-4 py-3"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <FiActivity className="h-4 w-4 text-accent" />
            <div>
              <div className="font-mono-data text-[11px] text-muted">
                tick
              </div>
              <div className="text-sm font-semibold text-ink">#48,213</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
