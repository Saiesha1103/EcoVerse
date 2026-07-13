import { motion } from "framer-motion";
import { GRID_HEIGHT, GRID_WIDTH } from "../../data/mockSimulationData";
import type { BiomeType, Creature } from "../../types/simulation";
import { CreatureSprite } from "../sprites/CreatureSprite";

export default function CreatureMarker({
  creature,
  selected,
  onSelect,
  biome,
  visualSeed,
}: {
  creature: Creature;
  selected: boolean;
  onSelect: (id: string) => void;
  biome: BiomeType;
  visualSeed: number;
}) {
  const left = ((creature.x + 0.5) / GRID_WIDTH) * 100;
  const top = ((creature.y + 0.5) / GRID_HEIGHT) * 100;
  const isPredator = creature.kind === "predator";

  return (
    <motion.button
      onClick={() => onSelect(creature.id)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.3 }}
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{ left: `${left}%`, top: `${top}%` }}
      aria-label={`${creature.kind} ${creature.id}`}
    >
      {selected && (
        <motion.span
          className={`absolute h-5 w-5 rounded-full ${
            isPredator ? "bg-[#F59E0B]/30" : "bg-primary/30"
          }`}
          animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <CreatureSprite
        id={creature.id}
        kind={creature.kind}
        biome={biome}
        visualSeed={visualSeed}
        className={`relative h-4 w-4 rounded-full ring-2 ring-background ${
          selected ? "shadow-[0_0_10px_rgba(34,197,94,0.9)]" : ""
        }`}
      />
    </motion.button>
  );
}