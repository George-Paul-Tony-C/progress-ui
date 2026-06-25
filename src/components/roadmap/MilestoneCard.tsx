import {
  ArrowDown,
  ArrowUp,
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

  disableMoveUp?: boolean;

  disableMoveDown?: boolean;

  onToggleCompleted: () => void;

  onMoveUp: () => void;

  onMoveDown: () => void;

  onEdit: () => void;

  onDelete: () => void;

}

export default function MilestoneCard({

  milestone,

  disableMoveUp = false,

  disableMoveDown = false,

  onToggleCompleted,

  onMoveUp,

  onMoveDown,

  onEdit,

  onDelete,

}: Props) {

  return (

    <Card className="flex items-center justify-between">

      <div className="flex flex-1 items-start gap-4">

        <button

          onClick={onToggleCompleted}

          className="mt-1"

        >

          {milestone.completed ? (

            <CheckCircle2
              size={28}
              className="text-green-600"
            />

          ) : (

            <Circle
              size={28}
              className="text-slate-400"
            />

          )}

        </button>

        <div className="flex-1">

          <h3
            className={`text-lg font-semibold ${
              milestone.completed
                ? "line-through text-slate-400"
                : ""
            }`}
          >

            {milestone.title}

          </h3>

          <p className="mt-2 text-sm text-slate-500">

            {milestone.description ||
              "No description"}

          </p>

        </div>

      </div>

      <div className="flex items-center gap-2">

        <Button

          variant="secondary"

          disabled={disableMoveUp}

          onClick={onMoveUp}

        >

          <ArrowUp size={16} />

        </Button>

        <Button

          variant="secondary"

          disabled={disableMoveDown}

          onClick={onMoveDown}

        >

          <ArrowDown size={16} />

        </Button>

        <Button

          variant="secondary"

          onClick={onEdit}

        >

          <Pencil size={16} />

        </Button>

        <Button

          variant="danger"

          onClick={onDelete}

        >

          <Trash2 size={16} />

        </Button>

      </div>

    </Card>

  );

}