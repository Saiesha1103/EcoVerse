import { FiLayers, FiShare2, FiCpu, FiBarChart2 } from "react-icons/fi";
import { FadeInSection, GlassCard, SectionHeading } from "./ui";

const FEATURES = [
  {
    icon: FiLayers,
    title: "Dynamic Ecosystems",
    description:
      "Create and customize living environments — terrain, resources, and climate rules that shape everything downstream.",
    color: "text-primary",
    glow: "group-hover:shadow-glow",
  },
  {
    icon: FiShare2,
    title: "Graph Intelligence",
    description:
      "Visualize BFS, DFS, Dijkstra and intelligent pathfinding as agents navigate the environment you built.",
    color: "text-secondary",
    glow: "group-hover:shadow-glow-cyan",
  },
  {
    icon: FiCpu,
    title: "Autonomous Creatures",
    description:
      "Watch digital organisms make decisions based on changing environments, resources, and competing agents.",
    color: "text-accent",
    glow: "group-hover:shadow-glow",
  },
  {
    icon: FiBarChart2,
    title: "Real-Time Analytics",
    description:
      "Monitor populations, resources and simulation performance with live, continuously updating instrumentation.",
    color: "text-primary",
    glow: "group-hover:shadow-glow",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <FadeInSection>
          <SectionHeading
            eyebrow="Core capabilities"
            title="A research environment, not a game engine."
            description="Every module in EcoVerse mirrors how researchers actually study ecosystems — from environment generation to algorithmic analysis."
          />
        </FadeInSection>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <FadeInSection key={feature.title} delay={i * 0.08}>
              <GlassCard className={`group h-full ${feature.glow}`}>
                <div
                  className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ${feature.color}`}
                >
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </GlassCard>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
