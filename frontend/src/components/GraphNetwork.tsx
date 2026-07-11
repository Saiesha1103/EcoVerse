import { motion } from "framer-motion";

// Fixed node layout representing an ecosystem graph — the visual
// signature of the page, echoing the "convert environment to graph"
// core mechanic described in the brief.
const NODES = [
  { id: "n1", x: 40, y: 60, r: 5, delay: 0 },
  { id: "n2", x: 150, y: 30, r: 4, delay: 0.2 },
  { id: "n3", x: 250, y: 90, r: 6, delay: 0.4 },
  { id: "n4", x: 90, y: 160, r: 4, delay: 0.1 },
  { id: "n5", x: 210, y: 190, r: 5, delay: 0.3 },
  { id: "n6", x: 320, y: 150, r: 4, delay: 0.5 },
  { id: "n7", x: 300, y: 40, r: 3, delay: 0.6 },
];

const EDGES: [string, string][] = [
  ["n1", "n2"],
  ["n2", "n3"],
  ["n1", "n4"],
  ["n4", "n5"],
  ["n5", "n3"],
  ["n5", "n6"],
  ["n3", "n7"],
  ["n6", "n3"],
];

function findNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export default function GraphNetwork() {
  return (
    <svg
      viewBox="0 0 360 230"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="edgeGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="nodeGlow">
          <stop offset="0%" stopColor="#84CC16" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#84CC16" stopOpacity="0" />
        </radialGradient>
      </defs>

      {EDGES.map(([a, b], i) => {
        const na = findNode(a);
        const nb = findNode(b);
        return (
          <motion.line
            key={i}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke="url(#edgeGradient)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ duration: 1.4, delay: 0.3 + i * 0.08, ease: "easeOut" }}
          />
        );
      })}

      {NODES.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={16} fill="url(#nodeGlow)" opacity={0.4} />
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="#F8FAFC"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: n.delay }}
          />
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="none"
            stroke="#22C55E"
            strokeWidth="1"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{
              duration: 2.2,
              delay: n.delay,
              repeat: Infinity,
              repeatDelay: 1.4,
              ease: "easeOut",
            }}
          />
        </g>
      ))}
    </svg>
  );
}
