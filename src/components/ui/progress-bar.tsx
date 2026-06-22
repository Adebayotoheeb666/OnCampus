import { cn, formatNaira, fundingPercent } from "@/lib/utils";

export function ProgressBar({
  funded,
  target,
  className,
}: {
  funded: number;
  target: number;
  className?: string;
}) {
  const percent = fundingPercent(funded, target);

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex justify-between text-xs text-stone-600">
        <span>{percent}% funded</span>
        <span>
          {formatNaira(funded)} / {formatNaira(target)}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
