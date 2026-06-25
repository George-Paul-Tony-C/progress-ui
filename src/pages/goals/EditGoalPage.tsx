import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  getGoal,
  updateGoal,
} from "../../services/goal/goalService";

import type {
  GoalStatus,
} from "../../types/goal";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import SectionTitle from "../../components/ui/SectionTitle";

export default function EditGoalPage() {

  const navigate =
    useNavigate();

  const { goalId } =
    useParams();

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

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [targetDate, setTargetDate] =
    useState("");

  const [status, setStatus] =
    useState<GoalStatus>(
      "NOT_STARTED"
    );

  const [
    progressPercentage,
    setProgressPercentage,
  ] =
    useState(0);

  useEffect(() => {

    if (!goal) {
      return;
    }

    setTitle(
      goal.title
    );

    setDescription(
      goal.description ?? ""
    );

    setTargetDate(
      goal.targetDate ?? ""
    );

    setStatus(
      goal.status
    );

    setProgressPercentage(
      goal.progressPercentage
    );

  }, [goal]);

  const mutation =
    useMutation({

      mutationFn: () =>
        updateGoal(
          goalId!,
          {
            title,
            description,
            targetDate,
            status,
            progressPercentage,
          }
        ),

      onSuccess: () => {

        toast.success(
          "Goal updated successfully"
        );

        navigate(
          `/goals/${goalId}`
        );
      },

      onError: () => {

        toast.error(
          "Failed to update goal"
        );
      },
    });

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
        title="Edit Goal"
        subtitle="Update your goal progress."
      />

      <Card>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Goal Title
            </label>

            <Input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <Textarea
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium">
                Target Date
              </label>

              <Input
                type="date"
                value={targetDate}
                onChange={(e) =>
                  setTargetDate(
                    e.target.value
                  )
                }
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <Select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as GoalStatus
                  )
                }
              >

                <option value="NOT_STARTED">
                  Not Started
                </option>

                <option value="IN_PROGRESS">
                  In Progress
                </option>

                <option value="ON_HOLD">
                  On Hold
                </option>

                <option value="COMPLETED">
                  Completed
                </option>

              </Select>

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Progress ({progressPercentage}%)
            </label>

            <Input
              type="range"
              min={0}
              max={100}
              value={progressPercentage}
              onChange={(e) =>
                setProgressPercentage(
                  Number(
                    e.target.value
                  )
                )
              }
            />

          </div>

          <div className="flex justify-end gap-3">

            <Button
              className="bg-slate-500 hover:bg-slate-600"
              onClick={() =>
                navigate(
                  `/goals/${goalId}`
                )
              }
            >
              Cancel
            </Button>

            <Button
              onClick={() =>
                mutation.mutate()
              }
              disabled={
                mutation.isPending
              }
            >
              {mutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>

          </div>

        </div>

      </Card>

    </div>
  );
}