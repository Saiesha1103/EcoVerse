import { motion } from "framer-motion";
import { GRID_HEIGHT, GRID_WIDTH } from "../../data/mockSimulationData";
import type { BiomeType, Resource } from "../../types/simulation";
import { ResourceSprite } from "../sprites/ResourceSprite";

export default function ResourceMarker({
  resource,
  biome,
}: {
  resource: Resource;
  biome: BiomeType;
}) {
  const left = ((resource.x + 0.5) / GRID_WIDTH) * 100;
  const top = ((resource.y + 0.5) / GRID_HEIGHT) * 100;

  if (resource.kind === "obstacle") {
    return (
      <div
        className="absolute z-[5] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-muted/50"
        style={{ left: `${left}%`, top: `${top}%` }}
        aria-label={`Obstacle ${resource.id}`}
      >
        <ResourceSprite
          kind={resource.kind}
          biome={biome}
          className="h-4 w-4"
        />
      </div>
    );
  }

  const isFood = resource.kind === "food";

  return (
    <motion.div
      className="absolute z-[5] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{ left: `${left}%`, top: `${top}%` }}
      aria-label={`${resource.kind} ${resource.id}`}
    >
      <motion.span
        className={`absolute h-4 w-4 rounded-full ${isFood ? "bg-lime/25" : "bg-cyan/25"}`}
        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        className={`relative flex h-4 w-4 items-center justify-center rounded-full ${
          isFood ? "bg-lime/80 text-[#0B1220]" : "bg-cyan/80 text-[#0B1220]"
        }`}
      >
        <ResourceSprite
          kind={resource.kind}
          biome={biome}
          className="h-4 w-4"
        />
      </span>
    </motion.div>
  );
}