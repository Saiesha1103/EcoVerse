import { motion } from "framer-motion";
import {
  FiMousePointer,
  FiCircle,
  FiTarget,
  FiDroplet,
  FiSquare,
  FiX,
} from "react-icons/fi";
import { GiPineTree } from "react-icons/gi";
import type { ToolType } from "../../types/simulation";

const TOOLS: { id: ToolType; label: string; icon: typeof FiCircle }[] = [
  { id: "select", label: "Select", icon: FiMousePointer },
  { id: "herbivore", label: "Herbivore", icon: FiCircle },
  { id: "predator", label: "Predator", icon: FiTarget },
  { id: "food", label: "Food", icon: GiPineTree },
  { id: "water", label: "Water", icon: FiDroplet },
  { id: "obstacle", label: "Obstacle", icon: FiSquare },
  { id: "eraser", label: "Eraser", icon: FiX },
];

export default function ToolSelector({
  active,
  onSelect,
}: {
  active: ToolType;
  onSelect: (tool: ToolType) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {TOOLS.map((tool) => {
        const isActive = active === tool.id;
        return (
          <motion.button
            key={tool.id}
            onClick={() => onSelect(tool.id)}
            whileTap={{ scale: 0.92 }}
            className={`flex flex-col items-center gap-1.5 rounded-lg border px-1.5 py-2.5 transition-colors duration-200 ${
              isActive
                ? "border-primary/40 bg-primary/10 text-primary shadow-glow-sm"
                : "border-white/[0.06] text-muted hover:border-white/15 hover:text-ink"
            }`}
            aria-pressed={isActive}
          >
            <tool.icon className="h-4 w-4" />
            <span className="text-[9px] font-medium leading-none">{tool.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
