import { motion } from "framer-motion";

export default function PopulationDistribution({
  herbivorePct,
  predatorPct,
}: {
  herbivorePct: number;
  predatorPct: number;
}) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const herbivoreLength = (herbivorePct / 100) * circumference;

  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Population Distribution
      </div>
      <div className="flex items-center gap-6">
        <div className="relative h-32 w-32 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#F59E0B"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: circumference - circumference }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              opacity={0.9}
            />
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#22C55E"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: circumference - herbivoreLength }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-xl font-semibold text-ink">{herbivorePct}%</span>
            <span className="text-[9px] uppercase tracking-wider text-muted">Herbivores</span>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="text-muted">Herbivores</span>
            <span className="ml-auto font-mono text-ink">{herbivorePct}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
            <span className="text-muted">Predators</span>
            <span className="ml-auto font-mono text-ink">{predatorPct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
