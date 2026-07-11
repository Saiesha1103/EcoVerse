import { motion } from "framer-motion";
import { GiPineTree } from "react-icons/gi";
import { FiDroplet, FiHome, FiFeather } from "react-icons/fi";
import type { ResourceHealthRow } from "../../types/simulation";

const ICONS = {
  food: GiPineTree,
  water: FiDroplet,
  shelter: FiHome,
  vegetation: FiFeather,
};

const STATUS_COLOR: Record<ResourceHealthRow["status"], string> = {
  Healthy: "#22C55E",
  Moderate: "#F59E0B",
  Low: "#F59E0B",
  Critical: "#EF4444",
};

export default function ResourceHealth({ rows }: { rows: ResourceHealthRow[] }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
        Resource Health
      </div>
      <div className="space-y-3.5">
        {rows.map((row) => {
          const Icon = row.kind === "water" ? FiDroplet : ICONS[row.kind];
          const color = row.kind === "water" ? "#06B6D4" : STATUS_COLOR[row.status];
          return (
            <div key={row.label}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted">
                  <Icon className="h-3.5 w-3.5" style={{ color }} />
                  {row.label}
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-ink">{row.value}%</span>
                  <span style={{ color }}>{row.status}</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${row.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
