import { motion } from "framer-motion";
import { FiPlay, FiPause, FiSkipForward, FiRotateCcw } from "react-icons/fi";
import type { SimulationSpeed, SimulationState } from "../../types/simulation";

const SPEEDS: SimulationSpeed[] = [0.5, 1, 2, 4];

function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function SimulationControls({
  simState,
  onToggleRun,
  onStep,
  onReset,
  onSpeedChange,
}: {
  simState: SimulationState;
  onToggleRun: () => void;
  onStep: () => void;
  onReset: () => void;
  onSpeedChange: (speed: SimulationSpeed) => void;
}) {
  const isRunning = simState.status === "running";

  return (
    <div className="glass-strong flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-3.5">
      <div className="flex items-center gap-2">
        <motion.button
          onClick={onToggleRun}
          whileTap={{ scale: 0.94 }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-[#03130A] shadow-glow-sm"
          aria-label={isRunning ? "Pause simulation" : "Start simulation"}
        >
          {isRunning ? <FiPause className="h-4 w-4" /> : <FiPlay className="ml-0.5 h-4 w-4" />}
        </motion.button>

        <motion.button
          onClick={onStep}
          whileTap={{ scale: 0.94 }}
          className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:border-primary/30"
          aria-label="Step one tick"
        >
          <FiSkipForward className="h-3.5 w-3.5" />
        </motion.button>

        <motion.button
          onClick={onReset}
          whileTap={{ scale: 0.94 }}
          className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:border-primary/30"
          aria-label="Reset simulation"
        >
          <FiRotateCcw className="h-3.5 w-3.5" />
        </motion.button>

        <span
          className={`ml-2 rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${
            simState.status === "running"
              ? "bg-primary/15 text-primary"
              : simState.status === "paused"
                ? "bg-[#F59E0B]/15 text-[#F59E0B]"
                : "bg-white/10 text-muted"
          }`}
        >
          {simState.status}
        </span>
      </div>

      <div className="flex items-center gap-1 rounded-full bg-white/5 p-1">
        {SPEEDS.map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
              simState.speed === s
                ? "bg-primary/15 text-primary shadow-glow-sm"
                : "text-muted hover:text-ink"
            }`}
          >
            {s}×
          </button>
        ))}
      </div>

      <div className="flex items-center gap-5 font-mono text-[11px] text-muted">
        <div>
          Tick <span className="text-ink">#{simState.currentTick.toLocaleString()}</span>
        </div>
        <div>
          Elapsed <span className="text-ink">{formatElapsed(simState.elapsedSeconds)}</span>
        </div>
      </div>
    </div>
  );
}
