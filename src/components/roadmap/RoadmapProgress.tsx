interface Props {
  value: number;
}

export default function RoadmapProgress({
  value,
}: Props) {

  return (
    <div>

      <div className="mb-2 flex justify-between text-sm">

        <span>
          Progress
        </span>

        <span className="font-semibold">
          {value}%
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

        <div
          className="h-full rounded-full bg-slate-900 transition-all duration-500"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
}