import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  Calendar,
  Pencil,
  Trash2,
  Target,
} from "lucide-react";

import { toast } from "sonner";

import {
  deleteGoal,
  getGoal,
} from "../../services/goal/goalService";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Loader from "../../components/ui/Loader";
import SectionTitle from "../../components/ui/SectionTitle";

export default function GoalDetailsPage() {

  const { goalId } =
    useParams();

  const navigate =
    useNavigate();

  const {
    data: goal,
    isLoading,
  } = useQuery({

    queryKey: [
      "goal",
      goalId,
    ],

    queryFn: () =>
      getGoal(goalId!),
  });

  const deleteMutation =
    useMutation({

      mutationFn: () =>
        deleteGoal(goalId!),

      onSuccess: () => {

        toast.success(
          "Goal deleted successfully"
        );

        navigate(
          "/goals"
        );
      },

      onError: () => {

        toast.error(
          "Failed to delete goal"
        );
      },
    });

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

  if (!goal) {
    return (
      <p>
        Goal not found
      </p>
    );
  }

  return (
    <div className="space-y-6">

      <SectionTitle
        title={goal.title}
        subtitle="Goal Overview"
      />

      <Card>

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3">

            <Target
              size={28}
              className="text-blue-600"
            />

            <div>

              <h2 className="text-xl font-semibold">
                {goal.title}
              </h2>

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

          </div>

          <div className="flex gap-2">

            <Button
              onClick={() =>
                navigate(
                  `/goals/${goalId}/edit`
                )
              }
            >
              <Pencil size={18} />
              Edit
            </Button>

            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {

                if (
                  window.confirm(
                    "Delete this goal?"
                  )
                ) {

                  deleteMutation.mutate();
                }

              }}
            >
              <Trash2 size={18} />
              Delete
            </Button>

          </div>

        </div>

      </Card>

      <Card>

        <h3 className="mb-4 text-lg font-semibold">
          Progress
        </h3>

        <div className="mb-2 flex justify-between">

          <span>

            Completion

          </span>

          <span>

            {goal.progressPercentage}%

          </span>

        </div>

        <div className="h-3 rounded-full bg-slate-200">

          <div
            className="h-3 rounded-full bg-blue-600"
            style={{
              width: `${goal.progressPercentage}%`,
            }}
          />

        </div>

      </Card>

      <Card>

        <h3 className="mb-4 text-lg font-semibold">
          Description
        </h3>

        <p className="whitespace-pre-line text-slate-600">

          {goal.description ||
            "No description available."}

        </p>

      </Card>

      <Card>

        <div className="flex items-center gap-3">

          <Calendar
            size={20}
          />

          <div>

            <p className="text-sm text-slate-500">

              Target Date

            </p>

            <p className="font-medium">

              {goal.targetDate || "-"}

            </p>

          </div>

        </div>

      </Card>

      <Card>

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-semibold">

              Roadmaps

            </h3>

            <p className="text-sm text-slate-500">

              Break this goal into learning roadmaps.

            </p>

          </div>

          <Button
            onClick={() =>
              navigate(
                `/roadmaps?goalId=${goal.id}`
              )
            }
          >
            View Roadmaps
          </Button>

        </div>

      </Card>

    </div>
  );
}