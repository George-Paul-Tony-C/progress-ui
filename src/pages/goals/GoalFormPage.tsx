import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  createGoal,
} from "../../services/goal/goalService";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";

export default function GoalFormPage() {

  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [targetDate, setTargetDate] =
    useState("");

  const [status, setStatus] =
    useState("NOT_STARTED");

  const [progressPercentage,
    setProgressPercentage] =
      useState(0);

  const mutation =
    useMutation({

      mutationFn:
        createGoal,

      onSuccess: () => {

        toast.success(
          "Goal created successfully"
        );

        navigate(
          "/goals"
        );
      },

      onError: () => {

        toast.error(
          "Failed to create goal"
        );
      },
    });

  function handleSubmit() {

    mutation.mutate({

      title,

      description,

      targetDate,

      status: status as any,

      progressPercentage,

    });
  }

  return (
    <div className="space-y-6">

      <SectionTitle
        title="Create Goal"
        subtitle="Create a long-term learning or career goal."
      />

      <Card>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Goal Title
            </label>

            <Input
              placeholder="Learn Spring Boot"
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
              placeholder="Describe your goal..."
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
                    e.target.value
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
                  "/goals"
                )
              }
            >
              Cancel
            </Button>

            <Button
              onClick={
                handleSubmit
              }
              disabled={
                mutation.isPending
              }
            >
              {mutation.isPending
                ? "Creating..."
                : "Create Goal"}
            </Button>

          </div>

        </div>

      </Card>

    </div>
  );
}