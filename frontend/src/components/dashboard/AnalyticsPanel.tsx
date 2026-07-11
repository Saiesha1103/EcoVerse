import { FiUsers, FiHeart, FiActivity, FiAlertTriangle, FiClock } from "react-icons/fi";
import { GiPineTree } from "react-icons/gi";
import { FiDroplet } from "react-icons/fi";
import type { ResourceHealthRow, SimulationMetrics } from "../../types/simulation";
import MetricCard from "./MetricCard";
import PopulationDistribution from "./PopulationDistribution";
import ResourceHealth from "./ResourceHealth";

export default function AnalyticsPanel({
  metrics,
  resourceHealth,
}: {
  metrics: SimulationMetrics;
  resourceHealth: ResourceHealthRow[];
}) {
  const herbivorePct = Math.round((metrics.herbivores / metrics.totalPopulation) * 100);
  const predatorPct = 100 - herbivorePct;

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto pr-0.5">
      <div className="grid grid-cols-2 gap-3">
        <MetricCard icon={FiUsers} label="Total population" value={metrics.totalPopulation} tone="text-primary" />
        <MetricCard icon={GiPineTree} label="Herbivores" value={metrics.herbivores} tone="text-primary" />
        <MetricCard icon={FiActivity} label="Predators" value={metrics.predators} tone="text-[#F59E0B]" />
        <MetricCard icon={FiDroplet} label="Water availability" value={metrics.waterAvailability} suffix="%" tone="text-cyan" />
        <MetricCard icon={FiHeart} label="Average energy" value={metrics.averageEnergy} suffix="%" tone="text-primary" />
        <MetricCard icon={FiAlertTriangle} label="Deaths" value={metrics.deaths} tone="text-[#EF4444]" />
      </div>

      <PopulationDistribution herbivorePct={herbivorePct} predatorPct={predatorPct} />
      <ResourceHealth rows={resourceHealth} />

      <div className="glass flex items-center gap-3 rounded-2xl p-4">
        <FiClock className="h-4 w-4 text-muted" />
        <div>
          <div className="font-mono text-sm font-semibold text-ink">
            #{metrics.currentTick.toLocaleString()}
          </div>
          <div className="text-[10px] text-muted">Current tick</div>
        </div>
      </div>
    </div>
  );
}
