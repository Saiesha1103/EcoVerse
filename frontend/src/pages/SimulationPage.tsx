import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Background from "../components/Background";
import CursorSpotlight from "../components/CursorSpotlight";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import WorldControlPanel from "../components/dashboard/WorldControlPanel";
import SimulationCanvas from "../components/dashboard/SimulationCanvas";
import SelectedCreatureCard from "../components/dashboard/SelectedCreatureCard";
import AnalyticsPanel from "../components/dashboard/AnalyticsPanel";
import PopulationTrend from "../components/dashboard/PopulationTrend";
import AlgorithmMonitor from "../components/dashboard/AlgorithmMonitor";
import EventLog from "../components/dashboard/EventLog";
import SimulationControls from "../components/dashboard/SimulationControls";
import biomeDashboard from "../assets/biome-dashboard.png";
import { useWorld } from "../hooks/useWorld";
import { mapWorldToSimulationData } from "../utils/worldMapper";
import {
  ALGORITHM_STATE,
  EVENT_LOG,
  METRICS,
  POPULATION_TREND,
  RESOURCE_HEALTH,
  SELECTED_CREATURE_ID,
} from "../data/mockSimulationData";
import type {
  AlgorithmName,
  SimulationSpeed,
  SimulationState,
  ToolType,
  WorldControls,
} from "../types/simulation";

const BIOME_LABELS: Record<WorldControls["biome"], string> = {
  meadow: "Meadow Biome",
  forest: "Forest Biome",
  wetland: "Wetland Biome",
  desert: "Desert Biome",
  arctic: "Arctic Biome",
};

const DEFAULT_CONTROLS: WorldControls = {
  biome: "meadow",
  gridSize: "medium",
  terrainDensity: 55,
  obstacleDensity: 22,
  herbivoreCount: 34,
  predatorCount: 8,
  startingEnergy: 80,
  hungerRate: 20,
  thirstRate: 18,
  movementCost: 4,
  temperature: 21,
  rainfall: 40,
  vegetationDensity: 62,
  waterAvailability: 74,
  resourceRegenRate: 35,
};

const DEFAULT_SIM_STATE: SimulationState = {
  status: "ready",
  speed: 1,
  currentTick: 1248,
  elapsedSeconds: 0,
};

export default function SimulationPage() {
  const { world, loading, error, reloadWorld } = useWorld();

  const [controls, setControls] = useState<WorldControls>(DEFAULT_CONTROLS);
  const [selectedTool, setSelectedTool] = useState<ToolType>("select");
  const [selectedCreatureId, setSelectedCreatureId] = useState<string | null>(
    SELECTED_CREATURE_ID
  );
  const [simState, setSimState] = useState<SimulationState>(DEFAULT_SIM_STATE);
  const [algorithm, setAlgorithm] = useState<AlgorithmName>(ALGORITHM_STATE.active);
  const [terrainSeed, setTerrainSeed] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const updateControls = (patch: Partial<WorldControls>) =>
    setControls((c) => ({ ...c, ...patch }));

  const handleToggleRun = () => {
    setSimState((s) => ({
      ...s,
      status: s.status === "running" ? "paused" : "running",
    }));
  };

  const handleStep = () => {
    setSimState((s) => ({ ...s, currentTick: s.currentTick + 1 }));
  };

  const handleReset = () => {
    setSimState(DEFAULT_SIM_STATE);
  };

  const handleSpeedChange = (speed: SimulationSpeed) => {
    setSimState((s) => ({ ...s, speed }));
  };

  const handleRandomize = () => {
    setTerrainSeed((s) => s + 1);
    updateControls({
      terrainDensity: Math.floor(30 + Math.random() * 60),
      obstacleDensity: Math.floor(10 + Math.random() * 40),
    });
    reloadWorld();
  };

  // Tick timer — only runs while status is "running"
  useEffect(() => {
    if (simState.status !== "running") {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      return;
    }
    const intervalMs = 1000 / simState.speed;
    intervalRef.current = window.setInterval(() => {
      setSimState((s) => ({
        ...s,
        currentTick: s.currentTick + 1,
        elapsedSeconds: s.elapsedSeconds + 1 * simState.speed,
      }));
    }, intervalMs);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simState.status, simState.speed]);

  // Loading state
  if (loading && !world) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-transparent">
        <Background />
        <CursorSpotlight />
        <div className="glass-strong relative z-10 rounded-2xl border border-white/10 px-8 py-6 text-center">
          <div className="font-mono text-sm uppercase tracking-[0.22em] text-primary">
            Loading World
          </div>
          <div className="mt-2 text-muted">Fetching simulation data from backend...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-transparent">
        <Background />
        <CursorSpotlight />
        <div className="glass-strong relative z-10 max-w-md rounded-2xl border border-white/10 px-8 py-6 text-center">
          <div className="font-mono text-sm uppercase tracking-[0.22em] text-red-400">
            Failed to Load World
          </div>
          <div className="mt-2 text-muted">{error}</div>
          <button
            onClick={() => reloadWorld()}
            className="mt-4 rounded-lg border border-white/10 bg-primary/20 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-primary/30"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!world) {
    return null;
  }

  const simulationData = mapWorldToSimulationData(world);
  const selectedCreature = simulationData.creatures.find(
    (c) => c.id === selectedCreatureId
  );

  return (
    <div className="relative min-h-screen bg-transparent">
      <Background />
      <CursorSpotlight />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1800px] flex-col gap-3 p-3 lg:p-4">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DashboardNavbar status={simState.status} onReset={handleReset} />
        </motion.div>
        <motion.section
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.08 }}
  className="glass-strong relative overflow-hidden rounded-2xl border border-white/10"
>
  <div className="relative h-[260px] sm:h-[320px] lg:h-[420px]">
    <img
      src={biomeDashboard}
      alt="EcoVerse biome monitoring overview"
      className="h-full w-full object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-r from-[#050B14]/75 via-[#050B14]/20 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/70 via-transparent to-transparent" />

    <div className="absolute left-5 top-5 rounded-xl border border-white/10 bg-[#08111f]/75 px-4 py-3 backdrop-blur-xl">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
        Active Biome
      </div>
      <div className="mt-1 text-lg font-semibold text-ink">
        {BIOME_LABELS[controls.biome]}
      </div>
      <div className="mt-1 font-mono text-xs text-muted">
        Live environmental overview
      </div>
    </div>

    <div className="absolute right-5 top-5 rounded-xl border border-white/10 bg-[#08111f]/75 px-4 py-3 text-right backdrop-blur-xl">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
        Simulation Status
      </div>
      <div className="mt-1 text-lg font-semibold capitalize text-ink">
        {simState.status}
      </div>
      <div className="mt-1 font-mono text-xs text-muted">
        Tick #{simState.currentTick.toLocaleString()} · {simState.speed}×
      </div>
    </div>

    <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        ["Population", METRICS.totalPopulation],
        ["Herbivores", METRICS.herbivores],
        ["Predators", METRICS.predators],
        ["Water", `${METRICS.waterAvailability}%`],
      ].map(([label, value]) => (
        <div
          key={label}
          className="rounded-xl border border-white/10 bg-[#08111f]/70 px-4 py-3 backdrop-blur-xl"
        >
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
            {label}
          </div>
          <div className="mt-1 text-xl font-semibold text-ink">{value}</div>
        </div>
      ))}
    </div>
  </div>
</motion.section>

        <div className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-[280px_1fr_320px]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-2 lg:order-1 lg:h-[calc(100vh-140px)]"
          >
            <WorldControlPanel
              controls={controls}
              onChange={updateControls}
              onRandomize={handleRandomize}
              selectedTool={selectedTool}
              onToolChange={setSelectedTool}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative order-1 min-h-[420px] lg:order-2 lg:h-[calc(100vh-140px)]"
            key={terrainSeed}
          >
            <SimulationCanvas
              terrain={simulationData.terrain}
              creatures={simulationData.creatures}
              resources={simulationData.resources}
              selectedCreatureId={selectedCreatureId}
              onSelectCreature={setSelectedCreatureId}
              selectedTool={selectedTool}
              simState={simState}
              biomeLabel={BIOME_LABELS[controls.biome]}
            />
            <SelectedCreatureCard
              creature={selectedCreature}
              onClose={() => setSelectedCreatureId(null)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-3 lg:h-[calc(100vh-140px)]"
          >
            <AnalyticsPanel metrics={METRICS} resourceHealth={RESOURCE_HEALTH} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_1fr]"
        >
          <PopulationTrend data={POPULATION_TREND} />
          <AlgorithmMonitor state={{ ...ALGORITHM_STATE, active: algorithm }} onSelectAlgorithm={setAlgorithm} />
          <EventLog entries={EVENT_LOG} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SimulationControls
            simState={simState}
            onToggleRun={handleToggleRun}
            onStep={handleStep}
            onReset={handleReset}
            onSpeedChange={handleSpeedChange}
          />
        </motion.div>
      </div>
    </div>
  );
}