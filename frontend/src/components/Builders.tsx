import { FiCode, FiDatabase } from "react-icons/fi";
import { FadeInSection, GlassCard, SectionHeading } from "./ui";

const BUILDERS = [
  {
    name: "Utkarsh Sinha",
    icon: FiCode,
  },
  {
    name: "Saiesha Krishnan",
    icon: FiDatabase,
  },
];

export default function Builders() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <FadeInSection>
          <SectionHeading
            eyebrow="The team"
            title="Meet the builders"
            align="center"
          />
        </FadeInSection>

        <div className="mx-auto mt-14 grid max-w-xl grid-cols-1 gap-5 sm:grid-cols-2">
          {BUILDERS.map((builder, i) => (
            <FadeInSection key={builder.name} delay={i * 0.1}>
              <GlassCard className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                  <builder.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-ink">{builder.name}</div>
                  <div className="mt-1 text-xs text-muted">
                  </div>
                </div>
              </GlassCard>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
