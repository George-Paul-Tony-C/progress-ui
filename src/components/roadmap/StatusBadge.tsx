import clsx from "clsx";

import type {
  RoadmapStatus,
} from "../../types/roadmap";

interface Props {
  status: RoadmapStatus;
}

export default function StatusBadge({
  status,
}: Props) {

  return (

    <span
      className={clsx(
        "rounded-full px-3 py-1 text-xs font-semibold",

        {
          "bg-slate-200 text-slate-700":
            status === "NOT_STARTED",

          "bg-blue-100 text-blue-700":
            status === "IN_PROGRESS",

          "bg-green-100 text-green-700":
            status === "COMPLETED",

          "bg-yellow-100 text-yellow-700":
            status === "ON_HOLD",
        }
      )}
    >

      {status.replaceAll(
        "_",
        " "
      )}

    </span>

  );
}