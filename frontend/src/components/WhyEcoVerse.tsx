import { FiShare2, FiGlobe, FiAward } from "react-icons/fi";
import { FadeInSection, SectionHeading } from "./ui";

const REASONS = [
  {
    icon: FiShare2,
    title: "Why graph algorithms",
    description:
      "Ecosystems are networks before they are anything else. Modeling terrain, resources, and creature movement as a graph makes pathfinding, resource flow, and population dynamics computable, comparable, and visible in real time.",
  },
  {
    icon: FiGlobe,
    title: "Why environmental simulation",
    description:
      "Static datasets can't show emergence. Running a live simulation surfaces feedback loops — scarcity, migration, collapse, recovery — the same way a real ecosystem would reveal them, but observable at any speed.",
  },
  {
    icon: FiAward,
    title: "Why this project is unique",
    description:
      "EcoVerse treats simulation as an instrument, not an animation. Every visual choice — from the dashboard to the graph overlay — mirrors how a researcher would actually inspect a running system.",
  },
];

export default function WhyEcoVerse() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <FadeInSection>
          <SectionHeading
            eyebrow="Design rationale"
            title="Why EcoVerse?"
            align="center"
          />
        </FadeInSection>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {REASONS.map((reason, i) => (
            <FadeInSection key={reason.title} delay={i * 0.1}>
              <div className="h-full border-t border-white/10 pt-7">
                <reason.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-5 text-lg font-semibold text-ink">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {reason.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
