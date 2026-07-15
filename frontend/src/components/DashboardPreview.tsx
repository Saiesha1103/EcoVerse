import { motion } from "framer-motion";
import {
  FiDroplet,
  FiPackage,
  FiUsers,
  FiClock,
  FiSliders,
  FiPause,
  FiSkipForward,
} from "react-icons/fi";
import { FadeInSection, SectionHeading } from "./ui";

const STATS = [
  { label: "Population", value: "42", icon: FiUsers, tone: "text-primary" },
  { label: "Food", value: "68%", icon: FiPackage, tone: "text-accent" },
  { label: "Water", value: "74%", icon: FiDroplet, tone: "text-secondary" },
  { label: "Current Tick", value: "#128", icon: FiClock, tone: "text-primary" },
];

const BARS = [38, 52, 44, 61, 55, 70, 64, 78, 72, 85, 80, 92];

function MiniChart() {
  return (
    <div className="flex h-28 items-end gap-1.5">
      {BARS.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.04, ease: "easeOut" }}
          className="flex-1 rounded-t bg-gradient-to-t from-primary/70 to-secondary/70"
        />
      ))}
    </div>
  );
}

function SimulationGrid() {
  const cells = Array.from({ length: 96 });
  return (
    <div className="grid grid-cols-12 gap-1">
      {cells.map((_, i) => {
        const seed = (i * 37) % 100;
        const alive = seed > 62;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0.15 }}
            whileInView={{ opacity: alive ? [0.3, 0.9, 0.3] : 0.12 }}
            viewport={{ once: true }}
            transition={{
              duration: 3,
              repeat: alive ? Infinity : 0,
              delay: (i % 12) * 0.08,
              ease: "easeInOut",
            }}
            className={`aspect-square rounded-[2px] ${
              alive ? "bg-primary" : "bg-white/10"
            }`}
          />
        );
      })}
    </div>
  );
}

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <FadeInSection>
          <SectionHeading
            eyebrow="Inside the platform"
            title="A control room for your ecosystem"
            description="Every run exposes the same instrumentation researchers rely on — grid state, resource curves, and a live control panel."
          />
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="glass-strong mt-14 overflow-hidden rounded-3xl">
            {/* window chrome */}
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#EAB308]/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]/60" />
              </div>
              <div className="font-mono-data text-xs text-muted">
                simulation-04 / meadow-biome
              </div>
              <div className="flex items-center gap-3 text-muted">
                <FiPause className="h-4 w-4" />
                <FiSkipForward className="h-4 w-4" />
                <FiSliders className="h-4 w-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-px bg-white/5 lg:grid-cols-3">
              {/* Simulation grid */}
              <div className="bg-surface/60 p-6 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Simulation Grid
                    <span className="text-[10px] font-mono text-muted">
                      DEMO PREVIEW
                    </span>
                  </span>
                  <span className="font-mono-data text-xs text-primary">
                    live
                  </span>
                </div>
                <SimulationGrid />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-px bg-white/5 lg:grid-rows-2">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col justify-center gap-2 bg-surface/60 p-5"
                  >
                    <stat.icon className={`h-4 w-4 ${stat.tone}`} />
                    <div className="font-mono-data text-xl font-semibold text-ink">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-px bg-white/5 lg:grid-cols-3">
              <div className="bg-surface/60 p-6 lg:col-span-2">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
                  Population Over Time
                </div>
                <MiniChart />
              </div>
              <div className="bg-surface/60 p-6">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
                  Control Panel
                </div>
                <div className="space-y-3">
                  {["Simulation speed", "Mutation rate", "Resource decay"].map(
                    (label, i) => (
                      <div key={label}>
                        <div className="mb-1.5 flex justify-between text-xs text-muted">
                          <span>{label}</span>
                          <span className="font-mono-data text-ink">
                            {[65, 32, 48][i]}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${[65, 32, 48][i]}%` }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
