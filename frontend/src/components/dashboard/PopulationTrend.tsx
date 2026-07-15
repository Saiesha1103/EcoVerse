import { useState } from "react";
import { motion } from "framer-motion";
import type { PopulationTrendPoint } from "../../types/simulation";

const SERIES = [
  { key: "total" as const, color: "#06B6D4", label: "Total" },
  { key: "herbivores" as const, color: "#22C55E", label: "Herbivores" },
  { key: "predators" as const, color: "#F59E0B", label: "Predators" },
];

const WIDTH = 300;
const HEIGHT = 120;
const PAD = 8;

function buildPath(points: PopulationTrendPoint[], key: keyof PopulationTrendPoint, max: number) {
  if (points.length === 0) return "";

if (points.length === 1) {
  const y =
    HEIGHT -
    PAD -
    (Number(points[0][key]) / max) * (HEIGHT - PAD * 2);

  return `M${WIDTH / 2},${y.toFixed(1)} L${WIDTH / 2},${y.toFixed(1)}`;
}
  return points
    .map((p, i) => {
      const x = PAD + (i / (points.length - 1)) * (WIDTH - PAD * 2);
      const y = HEIGHT - PAD - (Number(p[key]) / max) * (HEIGHT - PAD * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function PopulationTrend({ data }: { data: PopulationTrendPoint[] }) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  if (data.length === 0) {
  return (
    <div className="glass rounded-2xl p-5 text-sm text-muted">
      Population history will appear after the first tick.
    </div>
  );
}
  const max = Math.max(...data.map((d) => d.total)) * 1.2;
  const active = hoverIdx !== null ? data[hoverIdx] : data[data.length - 1];

  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Population Trend
        </span>
        <span className="font-mono text-[10px] text-muted">last {data.length} ticks</span>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mt-3 w-full overflow-visible"
          onMouseLeave={() => setHoverIdx(null)}
        >
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={PAD}
              x2={WIDTH - PAD}
              y1={PAD + f * (HEIGHT - PAD * 2)}
              y2={PAD + f * (HEIGHT - PAD * 2)}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          ))}

          {SERIES.map((s) => (
            <motion.path
              key={s.key}
              d={buildPath(data, s.key, max)}
              fill="none"
              stroke={s.color}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          ))}

          {data.map((_, i) => {
            const x = PAD + (i / (data.length - 1)) * (WIDTH - PAD * 2);
            return (
              <rect
                key={i}
                x={x - (WIDTH / data.length) / 2}
                y={0}
                width={WIDTH / data.length}
                height={HEIGHT}
                fill="transparent"
                onMouseEnter={() => setHoverIdx(i)}
              />
            );
          })}

          {hoverIdx !== null && (
            <line
              x1={PAD + (hoverIdx / (data.length - 1)) * (WIDTH - PAD * 2)}
              x2={PAD + (hoverIdx / (data.length - 1)) * (WIDTH - PAD * 2)}
              y1={PAD}
              y2={HEIGHT - PAD}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          )}
        </svg>

        <div className="glass pointer-events-none absolute right-0 top-0 rounded-lg px-2.5 py-1.5 font-mono text-[10px]">
          <div className="text-muted">Tick #{active.tick}</div>
          <div className="text-ink">{active.total} total</div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-[10px] text-muted">
            <span className="h-1.5 w-3 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}
