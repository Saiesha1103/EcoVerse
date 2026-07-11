import { motion } from "framer-motion";
import {
  FiMap,
  FiShare2,
  FiCpu,
  FiPlayCircle,
  FiTrendingUp,
} from "react-icons/fi";
import terrain from "../assets/terrain.png";
import { FadeInSection, SectionHeading } from "./ui";

const STEPS = [
  {
    icon: FiMap,
    title: "Generate Environment",
    description: "Procedurally build terrain, biomes, and resource fields.",
  },
  {
    icon: FiShare2,
    title: "Convert to Graph",
    description: "The world is compiled into a weighted, traversable graph.",
  },
  {
    icon: FiCpu,
    title: "Spawn Intelligent Creatures",
    description: "Autonomous agents enter with goals, senses, and memory.",
  },
  {
    icon: FiPlayCircle,
    title: "Run Algorithms",
    description: "BFS, DFS, Dijkstra and custom logic drive every decision.",
  },
  {
    icon: FiTrendingUp,
    title: "Analyze Results",
    description: "Population, resource, and pathing telemetry, live.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 -z-10">
        <img
          src={terrain}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <FadeInSection>
          <SectionHeading
            eyebrow="Simulation pipeline"
            title="How EcoVerse works"
            description="A single continuous pipeline turns a generated world into a live, analyzable graph simulation."
            align="center"
          />
        </FadeInSection>

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {STEPS.map((step, i) => (
              <FadeInSection key={step.title} delay={i * 0.12}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative mb-5 flex h-[72px] w-[72px] items-center justify-center">
                    <motion.span
                      className="absolute inset-0 rounded-full border border-primary/30"
                      animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut",
                      }}
                    />
                    <div className="glass-strong relative flex h-14 w-14 items-center justify-center rounded-full text-primary">
                      <step.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[190px] text-xs leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
