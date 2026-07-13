import { useState } from "react";
import { motion } from "framer-motion";

import type {
  BiomeType,
  Creature,
  Resource,
  SimulationState,
  TerrainCell,
  ToolType,
} from "../../types/simulation";

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
  biome,
  visualSeed,
}: {
  terrain: TerrainCell[];
  creatures: Creature[];
  resources: Resource[];
  selectedCreatureId: string | null;
  onSelectCreature: (id: string) => void;
  selectedTool: ToolType;
  simState: SimulationState;
  biomeLabel: string;
  biome: BiomeType;
  visualSeed: number;
}) {
  const [hover, setHover] = useState({
    x: 0,
    y: 0,
  });

  const gridWidth =
    terrain.length > 0
      ? Math.max(...terrain.map((cell) => cell.x)) + 1
      : 1;

  const gridHeight =
    terrain.length > 0
      ? Math.max(...terrain.map((cell) => cell.y)) + 1
      : 1;

  const selectedCreature = creatures.find(
    (creature) => creature.id === selectedCreatureId,
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ): void => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x = Math.min(
      gridWidth - 1,
      Math.max(
        0,
        Math.floor(
          ((event.clientX - rect.left) / rect.width) *
            gridWidth,
        ),
      ),
    );

    const y = Math.min(
      gridHeight - 1,
      Math.max(
        0,
        Math.floor(
          ((event.clientY - rect.top) / rect.height) *
            gridHeight,
        ),
      ),
    );

    setHover({ x, y });
  };

  return (
    <div className="glass-strong relative flex h-full flex-col overflow-hidden rounded-2xl p-3">
      <div
        onMouseMove={handleMouseMove}
        className="relative h-full min-h-[420px] w-full flex-1 overflow-hidden rounded-xl bg-[#060D18]"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 z-[1] h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-20 -right-20 z-[1] h-64 w-64 rounded-full bg-cyan/10 blur-[100px]" />

        <TerrainGrid
          cells={terrain}
          biome={biome}
          visualSeed={visualSeed}
        />

        <div className="absolute inset-0 z-10">
          {selectedCreature?.path &&
            selectedCreature.path.length > 0 && (
              <PathOverlay path={selectedCreature.path} />
            )}

          {resources.map((resource) => (
            <ResourceMarker
              key={resource.id}
              resource={resource}
              gridWidth={gridWidth}
              gridHeight={gridHeight}
            />
          ))}

          {creatures.map((creature) => (
            <CreatureMarker
              key={creature.id}
              creature={creature}
              selected={
                creature.id === selectedCreatureId
              }
              onSelect={onSelectCreature}
              gridWidth={gridWidth}
              gridHeight={gridHeight}
            />
          ))}
        </div>

        <div className="glass pointer-events-none absolute left-3 top-3 z-50 rounded-lg px-3 py-2">
          <div className="font-mono text-[9px] uppercase tracking-wider text-muted">
            Simulation World
          </div>

          <div className="text-xs font-semibold text-ink">
            {biomeLabel}
          </div>

          <div className="font-mono text-[10px] text-muted">
            {gridWidth} × {gridHeight} Grid
          </div>
        </div>

        <div className="glass pointer-events-none absolute right-3 top-3 z-50 rounded-lg px-3 py-2 text-right">
          <div className="flex items-center justify-end gap-1.5 font-mono text-[9px] uppercase tracking-wider text-primary">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{
                opacity:
                  simState.status === "running"
                    ? [1, 0.3, 1]
                    : 1,
              }}
              transition={{
                duration: 1.2,
                repeat:
                  simState.status === "running"
                    ? Infinity
                    : 0,
              }}
            />

            {simState.status === "running"
              ? "Live"
              : simState.status}
          </div>

          <div className="font-mono text-xs font-semibold text-ink">
            Tick #{simState.currentTick.toLocaleString()}
          </div>

          <div className="font-mono text-[10px] text-muted">
            {simState.speed}× Speed
          </div>
        </div>

        <div className="glass pointer-events-none absolute bottom-3 left-3 z-50 rounded-lg px-3 py-2">
          <div className="font-mono text-[9px] uppercase tracking-wider text-muted">
            Selected Tool:{" "}
            <span className="text-ink">
              {TOOL_LABELS[selectedTool]}
            </span>
          </div>

          <div className="font-mono text-[10px] text-muted">
            Coordinates: X{" "}
            {String(hover.x).padStart(2, "0")} / Y{" "}
            {String(hover.y).padStart(2, "0")}
          </div>
        </div>

        <div className="glass pointer-events-none absolute bottom-3 right-3 z-50 rounded-lg px-3 py-2 text-right">
          <div className="font-mono text-[10px] text-ink">
            {creatures.length} Agents
          </div>

          <div className="font-mono text-[10px] text-muted">
            {
              resources.filter(
                (resource) =>
                  resource.kind !== "obstacle",
              ).length
            }{" "}
            Resource Nodes
          </div>

          <div className="font-mono text-[10px] text-muted">
            {
              resources.filter(
                (resource) =>
                  resource.kind === "obstacle",
              ).length
            }{" "}
            Obstacles
          </div>
        </div>
      </div>
    </div>
  );
}