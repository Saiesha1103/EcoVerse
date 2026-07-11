import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiSave,
  FiRotateCcw,
  FiSettings,
  FiHexagon,
  FiEdit2,
  FiCheck,
} from "react-icons/fi";
import type { SimulationStatus } from "../../types/simulation";

const STATUS_STYLES: Record<SimulationStatus, string> = {
  ready: "bg-white/10 text-muted",
  running: "bg-primary/15 text-primary",
  paused: "bg-[#F59E0B]/15 text-[#F59E0B]",
};

export default function DashboardNavbar({
  status,
  onReset,
}: {
  status: SimulationStatus;
  onReset: () => void;
}) {
  const [name, setName] = useState("Meadow Biome 01");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  const commit = () => {
    setName(draft.trim() || name);
    setEditing(false);
  };

  return (
    <header className="glass-strong flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 text-muted transition-colors hover:text-ink">
          <FiArrowLeft className="h-4 w-4" />
          <span className="hidden text-xs font-medium sm:inline">Back to Home</span>
        </Link>

        <div className="h-5 w-px bg-white/10" />

        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-cyan text-background">
            <FiHexagon className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-ink">
            EcoVerse
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
        {editing ? (
          <div className="flex items-center gap-1.5">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && commit()}
              className="w-40 rounded-md border border-primary/30 bg-transparent px-2 py-1 text-xs text-ink outline-none"
            />
            <button
              onClick={commit}
              className="flex h-6 w-6 items-center justify-center rounded-md text-primary"
              aria-label="Save simulation name"
            >
              <FiCheck className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setDraft(name);
              setEditing(true);
            }}
            className="group flex items-center gap-1.5 text-xs font-medium text-ink"
          >
            {name}
            <FiEdit2 className="h-3 w-3 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        )}

        <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${STATUS_STYLES[status]}`}>
          {status}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="glass hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-primary/30 sm:flex"
        >
          <FiSave className="h-3.5 w-3.5" />
          Save
        </motion.button>
        <motion.button
          onClick={onReset}
          whileTap={{ scale: 0.95 }}
          className="glass flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-ink"
          aria-label="Reset simulation"
        >
          <FiRotateCcw className="h-3.5 w-3.5" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="glass flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-ink"
          aria-label="Settings"
        >
          <FiSettings className="h-3.5 w-3.5" />
        </motion.button>
        <span className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-cyan/30 font-mono text-[11px] font-semibold text-ink">
          EV
        </span>
      </div>
    </header>
  );
}
