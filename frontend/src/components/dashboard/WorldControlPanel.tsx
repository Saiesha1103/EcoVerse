import { motion } from "framer-motion";
import { FiShuffle } from "react-icons/fi";
import { GiPineTree, GiDesert, GiSnowflake2, GiWaterDrop } from "react-icons/gi";
import { PiMountainsBold } from "react-icons/pi";
import type { BiomeType, GridSize, ToolType, WorldControls } from "../../types/simulation";
import CollapsibleSection from "./CollapsibleSection";
import ToolSelector from "./ToolSelector";
import { LabeledSlider, Stepper } from "./ControlInputs";

const BIOMES: { id: BiomeType; label: string; icon: typeof GiPineTree }[] = [
  { id: "meadow", label: "Meadow", icon: PiMountainsBold },
  { id: "forest", label: "Forest", icon: GiPineTree },
  { id: "wetland", label: "Wetland", icon: GiWaterDrop },
  { id: "desert", label: "Desert", icon: GiDesert },
  { id: "arctic", label: "Arctic", icon: GiSnowflake2 },
];

const GRID_SIZES: GridSize[] = ["small", "medium", "large"];

export default function WorldControlPanel({
  controls,
  onChange,
  onRandomize,
  selectedTool,
  onToolChange,
}: {
  controls: WorldControls;
  onChange: (patch: Partial<WorldControls>) => void;
  onRandomize: () => void;
  selectedTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}) {
  return (
    <div className="glass-strong flex h-full flex-col overflow-y-auto rounded-2xl p-5">
      <CollapsibleSection title="World Configuration">
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-xs text-muted">Biome</div>
            <div className="grid grid-cols-3 gap-2">
              {BIOMES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => onChange({ biome: b.id })}
                  className={`flex flex-col items-center gap-1.5 rounded-lg border px-1 py-2.5 transition-colors ${
                    controls.biome === b.id
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-white/[0.06] text-muted hover:border-white/15 hover:text-ink"
                  }`}
                >
                  <b.icon className="h-4 w-4" />
                  <span className="text-[9px] font-medium">{b.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs text-muted">Grid Size</div>
            <div className="grid grid-cols-3 gap-2">
              {GRID_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => onChange({ gridSize: size })}
                  className={`rounded-lg border py-1.5 text-[11px] font-medium capitalize transition-colors ${
                    controls.gridSize === size
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-white/[0.06] text-muted hover:border-white/15 hover:text-ink"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <LabeledSlider
            label="Terrain density"
            value={controls.terrainDensity}
            onChange={(v) => onChange({ terrainDensity: v })}
          />
          <LabeledSlider
            label="Obstacle density"
            value={controls.obstacleDensity}
            onChange={(v) => onChange({ obstacleDensity: v })}
          />

          <motion.button
            onClick={onRandomize}
            whileTap={{ scale: 0.97 }}
            className="glass flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold text-ink transition-colors hover:border-primary/30"
          >
            <FiShuffle className="h-3.5 w-3.5" />
            Randomize World
          </motion.button>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Placement Tools">
        <ToolSelector active={selectedTool} onSelect={onToolChange} />
      </CollapsibleSection>

      <CollapsibleSection title="Agent Configuration" defaultOpen={false}>
        <div className="space-y-3.5">
          <Stepper
            label="Initial herbivores"
            value={controls.herbivoreCount}
            onChange={(v) => onChange({ herbivoreCount: v })}
            min={0}
            max={80}
          />
          <Stepper
            label="Initial predators"
            value={controls.predatorCount}
            onChange={(v) => onChange({ predatorCount: v })}
            min={0}
            max={30}
          />
          <LabeledSlider
            label="Starting energy"
            value={controls.startingEnergy}
            onChange={(v) => onChange({ startingEnergy: v })}
          />
          <LabeledSlider
            label="Hunger rate"
            value={controls.hungerRate}
            onChange={(v) => onChange({ hungerRate: v })}
          />
          <LabeledSlider
            label="Thirst rate"
            value={controls.thirstRate}
            onChange={(v) => onChange({ thirstRate: v })}
          />
          <LabeledSlider
            label="Movement cost"
            value={controls.movementCost}
            onChange={(v) => onChange({ movementCost: v })}
            max={20}
            unit=""
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Environment Conditions" defaultOpen={false}>
        <div className="space-y-3.5">
          <LabeledSlider
            label="Temperature"
            value={controls.temperature}
            onChange={(v) => onChange({ temperature: v })}
            min={-30}
            max={45}
            unit="°C"
          />
          <LabeledSlider
            label="Rainfall"
            value={controls.rainfall}
            onChange={(v) => onChange({ rainfall: v })}
          />
          <LabeledSlider
            label="Vegetation density"
            value={controls.vegetationDensity}
            onChange={(v) => onChange({ vegetationDensity: v })}
          />
          <LabeledSlider
            label="Water availability"
            value={controls.waterAvailability}
            onChange={(v) => onChange({ waterAvailability: v })}
          />
          <LabeledSlider
            label="Resource regeneration"
            value={controls.resourceRegenRate}
            onChange={(v) => onChange({ resourceRegenRate: v })}
          />
        </div>
      </CollapsibleSection>
    </div>
  );
}
