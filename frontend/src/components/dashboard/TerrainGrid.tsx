import { motion } from "framer-motion";
import type {
  TerrainCell,
  BiomeType,
} from "../../types/simulation";
import { BIOME_THEMES } from "../../data/biomeThemes";
import { pickCellVariant } from "../../utils/biomeRandomizer";


function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


export default function TerrainGrid({
  cells,
  biome,
  visualSeed,
}: {
  cells: TerrainCell[];
  biome: BiomeType;
  visualSeed: number;
}) {
  const theme = BIOME_THEMES[biome];

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
      {cells.map((cell) => {
        const terrainStyle = theme.terrainStyles[cell.kind];
        const variant = pickCellVariant(cell.x, cell.y, visualSeed, 3);
        const backgroundColor = hexToRgba(terrainStyle.baseColor, 0.16);
        const backgroundImage =
          variant === 1
            ? `linear-gradient(135deg, ${hexToRgba(terrainStyle.accentColor, 0.16)}, transparent 60%)`
            : variant === 2
            ? `linear-gradient(45deg, ${hexToRgba(terrainStyle.accentColor, 0.16)}, transparent 60%)`
            : undefined;

        return (
          <div
            key={`${cell.x}-${cell.y}`}
            className="border border-white/[0.02]"
            style={{
              backgroundColor,
              backgroundImage,
              gridColumnStart: cell.x + 1,
              gridRowStart: cell.y + 1,
            }}
          />
        );
      })}
    </motion.div>
  );
}