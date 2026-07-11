import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCircle, FiTarget, FiShare2 } from "react-icons/fi";
import { BsPinAngleFill } from "react-icons/bs";
import { useState } from "react";
import type { Creature } from "../../types/simulation";

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[10px] text-muted">
        <span>{label}</span>
        <span className="font-mono text-ink">{value}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-1 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function SelectedCreatureCard({
  creature,
  onClose,
}: {
  creature: Creature | undefined;
  onClose: () => void;
}) {
  const [pinned, setPinned] = useState(false);
  const isPredator = creature?.kind === "predator";

  return (
    <AnimatePresence>
      {creature && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-border glass-strong absolute bottom-4 left-1/2 z-20 w-[92%] max-w-sm -translate-x-1/2 rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:left-4 sm:translate-x-0"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`relative flex h-9 w-9 items-center justify-center rounded-xl ${
                  isPredator ? "bg-[#F59E0B]/15 text-[#F59E0B]" : "bg-primary/15 text-primary"
                }`}
              >
                <motion.span
                  className="absolute inset-0 rounded-xl"
                  animate={{ boxShadow: ["0 0 0px rgba(34,197,94,0)", "0 0 14px rgba(34,197,94,0.35)", "0 0 0px rgba(34,197,94,0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {isPredator ? <FiTarget className="h-4 w-4" /> : <FiCircle className="h-4 w-4" />}
              </span>
              <div>
                <div className="text-sm font-semibold capitalize text-ink">
                  {creature.kind} {creature.id}
                </div>
                <div className="font-mono text-[10px] text-muted">{creature.status}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPinned((p) => !p)}
                className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
                  pinned ? "text-primary" : "text-muted hover:text-ink"
                }`}
                aria-label="Pin creature panel"
                aria-pressed={pinned}
              >
                <BsPinAngleFill className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={onClose}
                className="flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors hover:text-ink"
                aria-label="Close creature panel"
              >
                <FiX className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            <Bar label="Energy" value={creature.energy} color="#22C55E" />
            <Bar label="Hunger" value={creature.hunger} color="#F59E0B" />
            <Bar label="Thirst" value={creature.thirst} color="#06B6D4" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-3 font-mono text-[10px]">
            <div className="text-muted">
              Target <span className="block text-ink">{creature.targetId ?? "—"}</span>
            </div>
            <div className="text-muted">
              Algorithm <span className="block text-ink">{creature.algorithm}</span>
            </div>
            <div className="text-muted">
              Path length <span className="block text-ink">{creature.pathLength} cells</span>
            </div>
            <div className="text-muted">
              Nodes explored <span className="block text-ink">{creature.nodesExplored}</span>
            </div>
          </div>

          {creature.path && creature.path.length > 1 && (
            <div className="mt-3 flex items-center gap-1.5 border-t border-white/[0.06] pt-3">
              <FiShare2 className="h-3 w-3 text-primary" />
              <div className="flex items-center gap-1">
                {creature.path.slice(0, 8).map((_, i) => (
                  <span
                    key={i}
                    className="h-1 w-3 rounded-full bg-gradient-to-r from-primary/80 to-cyan/60"
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
