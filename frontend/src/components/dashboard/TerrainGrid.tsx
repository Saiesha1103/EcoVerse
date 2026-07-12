import { motion } from "framer-motion";
import type {
  TerrainCell,
  TerrainKind,
} from "../../types/simulation";


const TERRAIN_COLORS: Record<TerrainKind, string> = {
  grass: "rgba(34,197,94,0.10)",
  forest: "rgba(20,184,166,0.16)",
  water: "rgba(6,182,212,0.22)",
  sand: "rgba(245,158,11,0.10)",
  rock: "rgba(148,163,184,0.10)",
  snow: "rgba(248,250,252,0.14)",
};


export default function TerrainGrid({
  cells,
}: {
  cells: TerrainCell[];
}) {
  const gridWidth =
    cells.length > 0
      ? Math.max(...cells.map((cell) => cell.x)) + 1
      : 1;

  const gridHeight =
    cells.length > 0
      ? Math.max(...cells.map((cell) => cell.y)) + 1
      : 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 z-0 grid"
      style={{
        gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${gridHeight}, minmax(0, 1fr))`,
      }}
    >
      {cells.map((cell) => (
        <div
          key={`${cell.x}-${cell.y}`}
          className="border border-white/[0.02]"
          style={{
            backgroundColor: TERRAIN_COLORS[cell.kind],
            gridColumnStart: cell.x + 1,
            gridRowStart: cell.y + 1,
          }}
        />
      ))}
    </motion.div>
  );
}