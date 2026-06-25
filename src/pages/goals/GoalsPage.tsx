import { useNavigate } from "react-router-dom";

import {
  Plus,
  ArrowRight,
  Target,
} from "lucide-react";

import { useGoals } from "../../hooks/useGoals";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";
import SectionTitle from "../../components/ui/SectionTitle";

export default function GoalsPage() {

  const navigate =
    useNavigate();

  const {
    data,
    isLoading,
  } = useGoals();

  function badgeVariant(
    status: string
  ) {

    switch (status) {

      case "COMPLETED":
        return "success";

      case "IN_PROGRESS":
        return "info";

      case "ON_HOLD":
        return "warning";

      default:
        return "danger";
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <SectionTitle
          title="Goals"
          subtitle="Track your long-term learning goals."
        />

        <Button
          onClick={() =>
            navigate(
              "/goals/create"
            )
          }
        >
          <Plus size={18} />
          Create Goal
        </Button>

      </div>

      {!data?.content.length && (

        <EmptyState
          title="No Goals Yet"
          description="Create your first goal to start tracking your progress."
        />

      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {data?.content.map(
          (goal) => (

            <Card
              key={goal.id}
              className="space-y-4"
            >

              <div className="flex items-start justify-between">

                <Target
                  className="text-blue-600"
                  size={22}
                />

                <Badge
                  variant={
                    badgeVariant(
                      goal.status
                    ) as any
                  }
                >
                  {goal.status.replaceAll(
                    "_",
                    " "
                  )}
                </Badge>

              </div>

              <div>

                <h3 className="text-lg font-semibold">
                  {goal.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                  {goal.description ||
                    "No description provided."}
                </p>

              </div>

              <div>

                <div className="mb-2 flex justify-between text-sm">

                  <span>
                    Progress
                  </span>

                  <span>
                    {goal.progressPercentage}%
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-200">

                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{
                      width: `${goal.progressPercentage}%`,
                    }}
                  />

                </div>

              </div>

              <div className="flex items-center justify-between text-sm text-slate-500">

                <span>

                  🎯 Target

                </span>

                <span>

                  {goal.targetDate || "-"}

                </span>

              </div>

              <Button
                className="w-full"
                onClick={() =>
                  navigate(
                    `/goals/${goal.id}`
                  )
                }
              >

                View Goal

                <ArrowRight
                  size={18}
                />

              </Button>

            </Card>

          )
        )}

      </div>

    </div>
  );
}