import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import Button from "../ui/Button";

import RoadmapProgress from "./RoadmapProgress";
import StatusBadge from "./StatusBadge";

import type {
  Roadmap,
} from "../../types/roadmap";

interface Props {
  roadmap: Roadmap;
}

export default function RoadmapCard({
  roadmap,
}: Props) {

  const navigate =
    useNavigate();

  const progress =
    roadmap.totalMilestones === 0
      ? 0
      : Math.round(
          (roadmap.completedMilestones /
            roadmap.totalMilestones) *
            100
        );

  return (

    <Card className="space-y-5 transition hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-bold">
            {roadmap.title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">

            {roadmap.description ||
              "No description"}

          </p>

        </div>

        <StatusBadge
          status={
            roadmap.status
          }
        />

      </div>

      <RoadmapProgress
        value={progress}
      />

      <div className="flex items-center justify-between text-sm text-slate-500">

        <div className="flex items-center gap-2">

          <CheckCircle2
            size={18}
          />

          <span>

            {
              roadmap.completedMilestones
            }

            /

            {
              roadmap.totalMilestones
            }

            {" "}
            Milestones

          </span>

        </div>

        {roadmap.targetDate && (

          <div className="flex items-center gap-2">

            <CalendarDays
              size={18}
            />

            <span>
              {
                roadmap.targetDate
              }
            </span>

          </div>

        )}

      </div>

      <Button
        fullWidth
        onClick={() =>
          navigate(
            `/roadmaps/${roadmap.id}`
          )
        }
      >

        View Roadmap

        <ArrowRight
          size={18}
        />

      </Button>

    </Card>

  );
}