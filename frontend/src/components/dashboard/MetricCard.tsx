import { IconType } from "react-icons";
import { useCountUp } from "../../hooks/useCountUp";

export default function MetricCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  tone = "text-primary",
}: {
  icon: IconType;
  label: string;
  value: number;
  suffix?: string;
  tone?: string;
}) {
  const { ref, value: animated } = useCountUp(value, 1.2);

  return (
    <div className="glass rounded-xl p-3.5">
      <div className={`mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 ${tone}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="font-mono text-lg font-semibold text-ink">
        <span ref={ref}>
          {animated.toLocaleString()}
          {suffix}
        </span>
      </div>
      <div className="text-[10px] text-muted">{label}</div>
    </div>
  );
}
