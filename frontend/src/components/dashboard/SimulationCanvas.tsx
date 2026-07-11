import { useState } from "react";
import { motion } from "framer-motion";
import { GRID_HEIGHT, GRID_WIDTH } from "../../data/mockSimulationData";
import type { Creature, Resource, SimulationState, TerrainCell, ToolType } from "../../types/simulation";
import TerrainGrid from "./TerrainGrid";
import CreatureMarker from "./CreatureMarker";
import ResourceMarker from "./ResourceMarker";
import PathOverlay from "./PathOverlay";

const TOOL_LABELS: Record<ToolType, string> = {
  select: "Select",
  herbivore: "Herbivore",
  predator: "Predator",
  food: "Food",
  water: "Water",
  obstacle: "Obstacle",
  eraser: "Eraser",
};

export default function SimulationCanvas({
  terrain,
  creatures,
  resources,
  selectedCreatureId,
  onSelectCreature,
  selectedTool,
  simState,
  biomeLabel,
}: {
  terrain: TerrainCell[];
  creatures: Creature[];
  resources: Resource[];
  selectedCreatureId: string | null;
  onSelectCreature: (id: string) => void;
  selectedTool: ToolType;
  simState: SimulationState;
  biomeLabel: string;
}) {
  const [hover, setHover] = useState({ x: 0, y: 0 });
  const selectedCreature = creatures.find((c) => c.id === selectedCreatureId);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(
      GRID_WIDTH - 1,
      Math.max(0, Math.floor(((e.clientX - rect.left) / rect.width) * GRID_WIDTH))
    );
    const y = Math.min(
      GRID_HEIGHT - 1,
      Math.max(0, Math.floor(((e.clientY - rect.top) / rect.height) * GRID_HEIGHT))
    );
    setHover({ x, y });
  };

  return (
    <div className="glass-strong relative flex h-full flex-col overflow-hidden rounded-2xl p-3">
      <div
        onMouseMove={handleMouseMove}
        className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-xl bg-[#060D18]"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan/10 blur-[100px]" />

        <TerrainGrid cells={terrain} />

        {selectedCreature?.path && <PathOverlay path={selectedCreature.path} />}

        {resources.map((r) => (
          <ResourceMarker key={r.id} resource={r} />
        ))}
        {creatures.map((c) => (
          <CreatureMarker
            key={c.id}
            creature={c}
            selected={c.id === selectedCreatureId}
            onSelect={onSelectCreature}
          />
        ))}

        {/* Corner overlays */}
        <div className="glass pointer-events-none absolute left-3 top-3 rounded-lg px-3 py-2">
          <div className="font-mono text-[9px] uppercase tracking-wider text-muted">
            Simulation World
          </div>
          <div className="text-xs font-semibold text-ink">{biomeLabel}</div>
          <div className="font-mono text-[10px] text-muted">
            {GRID_WIDTH} × {GRID_HEIGHT} Grid
          </div>
        </div>

        <div className="glass pointer-events-none absolute right-3 top-3 rounded-lg px-3 py-2 text-right">
          <div className="flex items-center justify-end gap-1.5 font-mono text-[9px] uppercase tracking-wider text-primary">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: simState.status === "running" ? [1, 0.3, 1] : 1 }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            {simState.status === "running" ? "Live" : simState.status}
          </div>
          <div className="font-mono text-xs font-semibold text-ink">
            Tick #{simState.currentTick.toLocaleString()}
          </div>
          <div className="font-mono text-[10px] text-muted">{simState.speed}× Speed</div>
        </div>

        <div className="glass pointer-events-none absolute bottom-3 left-3 rounded-lg px-3 py-2">
          <div className="font-mono text-[9px] uppercase tracking-wider text-muted">
            Selected Tool: <span className="text-ink">{TOOL_LABELS[selectedTool]}</span>
          </div>
          <div className="font-mono text-[10px] text-muted">
            Coordinates: X {String(hover.x).padStart(2, "0")} / Y {String(hover.y).padStart(2, "0")}
          </div>
        </div>

        <div className="glass pointer-events-none absolute bottom-3 right-3 rounded-lg px-3 py-2 text-right">
          <div className="font-mono text-[10px] text-ink">{creatures.length} Agents</div>
          <div className="font-mono text-[10px] text-muted">
            {resources.filter((r) => r.kind !== "obstacle").length} Resource Nodes
          </div>
          <div className="font-mono text-[10px] text-muted">
            {resources.filter((r) => r.kind === "obstacle").length} Obstacles
          </div>
        </div>
      </div>
    </div>
  );
}
