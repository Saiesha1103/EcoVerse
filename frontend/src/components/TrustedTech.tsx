import { motion } from "framer-motion";
import {
  SiReact,
  SiTypescript,
  SiFastapi,
  SiPython,
  SiPostgresql,
  SiFramer,
  SiTailwindcss,
} from "react-icons/si";
import { FiShare2 } from "react-icons/fi";
import { FadeInSection } from "./ui";

const TECHNOLOGIES = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "FastAPI", icon: SiFastapi, color: "#06B6D4" },
  { name: "Python", icon: SiPython, color: "#22C55E" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#84CC16" },
  { name: "Graph Algorithms", icon: FiShare2, color: "#22C55E" },
  { name: "Framer Motion", icon: SiFramer, color: "#06B6D4" },
  { name: "TailwindCSS", icon: SiTailwindcss, color: "#84CC16" },
];

export default function TrustedTech() {
  return (
    <section id="technology" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <FadeInSection className="mb-14 text-center">
          <div className="section-eyebrow mb-3 text-xs font-semibold uppercase text-muted">
            Engineered on a proven stack
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Trusted technologies
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TECHNOLOGIES.map((tech, i) => (
            <FadeInSection key={tech.name} delay={i * 0.05}>
              <motion.div
                whileHover={{
                  rotate: [-0.5, 1, -1, 0],
                  y: -4,
                  transition: { duration: 0.4 },
                }}
                className="glass flex flex-col items-center justify-center gap-3 rounded-2xl px-4 py-8 text-center transition-colors duration-300 hover:border-primary/30"
              >
                <tech.icon
                  className="h-7 w-7"
                  style={{ color: tech.color }}
                />
                <span className="text-sm font-medium text-muted">
                  {tech.name}
                </span>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
