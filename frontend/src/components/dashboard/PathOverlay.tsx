import { motion } from "framer-motion";
import { GRID_HEIGHT, GRID_WIDTH } from "../../data/mockSimulationData";

export default function PathOverlay({ path }: { path: { x: number; y: number }[] }) {
  if (!path || path.length < 2) return null;

  const points = path
    .map((p) => `${((p.x + 0.5) / GRID_WIDTH) * 100},${((p.y + 0.5) / GRID_HEIGHT) * 100}`)
    .join(" ");

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[6] h-full w-full overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.polyline
        points={points}
        fill="none"
        stroke="rgba(34,197,94,0.9)"
        strokeWidth="0.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1.5 1.2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke="rgba(34,197,94,0.5)"
        strokeWidth="0.35"
        strokeLinecap="round"
        strokeDasharray="0.4 3.4"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
      />
      {path.map((p, i) => (
        <circle
          key={i}
          cx={((p.x + 0.5) / GRID_WIDTH) * 100}
          cy={((p.y + 0.5) / GRID_HEIGHT) * 100}
          r={i === path.length - 1 ? 0.7 : 0.35}
          fill={i === path.length - 1 ? "#84CC16" : "#22C55E"}
          opacity={i === path.length - 1 ? 1 : 0.7}
        />
      ))}
    </svg>
  );
}
