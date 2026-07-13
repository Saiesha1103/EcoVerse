import { motion } from "framer-motion";
import { GiPineTree } from "react-icons/gi";
import { FiDroplet, FiSquare } from "react-icons/fi";
import type { Resource } from "../../types/simulation";

export default function ResourceMarker({
  resource,
  gridWidth,
  gridHeight,
}: {
  resource: Resource;
  gridWidth: number;
  gridHeight: number;
}) {
  const left = ((resource.x + 0.5) / gridWidth) * 100;
  const top = ((resource.y + 0.5) / gridHeight) * 100;

  if (resource.kind === "obstacle") {
    return (
      <div
        className="absolute z-[5] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-slate-300/80"
        style={{ left: `${left}%`, top: `${top}%` }}
        aria-label={`Obstacle ${resource.id}`}
      >
        <FiSquare className="h-3.5 w-3.5" />
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
        className={`absolute h-5 w-5 rounded-full ${isFood ? "bg-lime/25" : "bg-cyan/25"}`}
        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        className={`relative flex h-4 w-4 items-center justify-center rounded-full ${
          isFood ? "bg-lime/80 text-[#0B1220]" : "bg-cyan/80 text-[#0B1220]"
        }`}
      >
        {isFood ? <GiPineTree className="h-2.5 w-2.5" /> : <FiDroplet className="h-2.5 w-2.5" />}
      </span>
    </motion.div>
  );
}