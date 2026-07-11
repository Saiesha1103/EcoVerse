import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EventCategory, EventLogEntry } from "../../types/simulation";

const FILTERS: { id: EventCategory | "all"; label: string; color: string }[] = [
  { id: "all", label: "All", color: "#94A3B8" },
  { id: "movement", label: "Movement", color: "#06B6D4" },
  { id: "resources", label: "Resources", color: "#84CC16" },
  { id: "pathfinding", label: "Pathfinding", color: "#22C55E" },
  { id: "alerts", label: "Alerts", color: "#F59E0B" },
];

const CATEGORY_COLOR: Record<EventCategory, string> = {
  movement: "#06B6D4",
  resources: "#84CC16",
  pathfinding: "#22C55E",
  alerts: "#F59E0B",
};

export default function EventLog({ entries }: { entries: EventLogEntry[] }) {
  const [filter, setFilter] = useState<EventCategory | "all">("all");
  const filtered = filter === "all" ? entries : entries.filter((e) => e.category === filter);

  return (
    <div className="glass-strong flex h-full flex-col rounded-2xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Event Log
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
              filter === f.id ? "bg-white/10 text-ink" : "text-muted hover:text-ink"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: f.color }} />
            {f.label}
          </button>
        ))}
      </div>

      <div className="max-h-56 flex-1 space-y-1.5 overflow-y-auto pr-1 font-mono text-[11px]">
        <AnimatePresence initial={false}>
          {filtered.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-2 rounded-md px-1.5 py-1 hover:bg-white/[0.03]"
            >
              <span
                className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: CATEGORY_COLOR[entry.category] }}
              />
              <span className="shrink-0 text-muted/70">[{entry.timestamp}]</span>
              <span className="text-muted">{entry.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="py-6 text-center text-muted/60">No events in this category yet.</div>
        )}
      </div>
    </div>
  );
}
