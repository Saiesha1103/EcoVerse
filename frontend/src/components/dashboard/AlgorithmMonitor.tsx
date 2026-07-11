import { motion } from "framer-motion";
import { FiCpu } from "react-icons/fi";
import type { AlgorithmName, AlgorithmState } from "../../types/simulation";

const ALGORITHMS: AlgorithmName[] = ["BFS", "DFS", "Dijkstra"];

const NODES = [
  { x: 10, y: 20 }, { x: 30, y: 12 }, { x: 50, y: 24 }, { x: 70, y: 10 },
  { x: 20, y: 45 }, { x: 45, y: 50 }, { x: 65, y: 42 }, { x: 85, y: 30 },
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [6, 7], [2, 5], [3, 6],
];

export default function AlgorithmMonitor({
  state,
  onSelectAlgorithm,
}: {
  state: AlgorithmState;
  onSelectAlgorithm: (algo: AlgorithmName) => void;
}) {
  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiCpu className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Algorithm Monitor
          </span>
        </div>
        <div className="flex gap-1.5">
          {ALGORITHMS.map((algo) => (
            <button
              key={algo}
              onClick={() => onSelectAlgorithm(algo)}
              className={`rounded-md px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                state.active === algo
                  ? "bg-primary/15 text-primary"
                  : "text-muted hover:text-ink"
              }`}
            >
              {algo}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">
            Active algorithm
          </div>
          <div className="font-display text-xl font-semibold text-gradient-primary">
            {state.active}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-[11px]">
            <div>
              <div className="text-muted">Agent</div>
              <div className="text-ink">{state.agentId}</div>
            </div>
            <div>
              <div className="text-muted">Target</div>
              <div className="text-ink">{state.targetId}</div>
            </div>
            <div>
              <div className="text-muted">Nodes explored</div>
              <div className="text-ink">{state.nodesExplored}</div>
            </div>
            <div>
              <div className="text-muted">Path length</div>
              <div className="text-ink">{state.pathLength} cells</div>
            </div>
            <div>
              <div className="text-muted">Execution time</div>
              <div className="text-ink">{state.executionTimeMs} ms</div>
            </div>
            <div>
              <div className="text-muted">Complexity</div>
              <div className="text-ink">{state.complexity}</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-1 flex justify-between text-[10px] text-muted">
              <span>Search progress</span>
              <span className="font-mono text-ink">{Math.round(state.searchProgress * 100)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${state.searchProgress * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-1.5 rounded-full bg-gradient-to-r from-primary to-cyan"
              />
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[140px] items-center justify-center rounded-xl bg-white/[0.02]">
          <svg viewBox="0 0 100 60" className="h-full w-full overflow-visible p-2">
            {EDGES.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke="rgba(34,197,94,0.35)"
                strokeWidth="0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1, delay: i * 0.08 }}
              />
            ))}
            {NODES.map((n, i) => (
              <motion.circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={2}
                fill={i === NODES.length - 1 ? "#84CC16" : "#22C55E"}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
