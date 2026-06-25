import {
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
} from "lucide-react";

import Button from "../ui/Button";
import Card from "../ui/Card";

import type {
  Milestone,
} from "../../types/roadmap";

interface Props {
  milestone: Milestone;
  onEdit: () => void;
  onDelete: () => void;
}

export default function MilestoneCard({
  milestone,
  onEdit,
  onDelete,
}: Props) {

  return (

    <Card className="flex items-center justify-between">

      <div className="flex items-start gap-4">

        {milestone.completed ? (

          <CheckCircle2
            size={28}
            className="mt-1 text-green-600"
          />

        ) : (

          <Circle
            size={28}
            className="mt-1 text-slate-400"
          />

        )}

        <div>

          <h3 className="text-lg font-semibold">

            {milestone.title}

          </h3>

          <p className="mt-1 text-sm text-slate-500">

            {milestone.description ||
              "No description"}

          </p>

          <span
            className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              milestone.completed
                ? "bg-green-100 text-green-700"
                : "bg-slate-200 text-slate-700"
            }`}
          >

            {milestone.completed
              ? "Completed"
              : "Pending"}

          </span>

        </div>

      </div>

      <div className="flex gap-2">

        <Button
          variant="secondary"
          onClick={onEdit}
        >

          <Pencil size={18} />

        </Button>

        <Button
          variant="danger"
          onClick={onDelete}
        >

          <Trash2 size={18} />

        </Button>

      </div>

    </Card>

  );
}