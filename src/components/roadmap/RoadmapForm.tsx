import {
  useState,
  useEffect,
} from "react";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

import type {
  RoadmapStatus,
} from "../../types/roadmap";

interface Props {

  initialTitle?: string;

  initialDescription?: string;

  initialTargetDate?: string;

  initialStatus?: RoadmapStatus;

  loading?: boolean;

  submitText: string;

  onSubmit: (data: {
    title: string;
    description: string;
    targetDate: string;
    status: RoadmapStatus;
  }) => void;

}

export default function RoadmapForm({

  initialTitle = "",

  initialDescription = "",

  initialTargetDate = "",

  initialStatus = "NOT_STARTED",

  loading = false,

  submitText,

  onSubmit,

}: Props) {

  const [title, setTitle] =
    useState(initialTitle);

  const [description,
    setDescription] =
      useState(initialDescription);

  const [targetDate,
    setTargetDate] =
      useState(initialTargetDate);

  const [status,
    setStatus] =
      useState<RoadmapStatus>(
        initialStatus
      );

  useEffect(() => {

    setTitle(initialTitle);

    setDescription(initialDescription);

    setTargetDate(initialTargetDate);

    setStatus(initialStatus);

  }, [
    initialTitle,
    initialDescription,
    initialTargetDate,
    initialStatus,
  ]);

  return (

    <Card>

      <div className="space-y-5">

        <Input
          placeholder="Roadmap title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <Textarea
          rows={5}
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <Input
          type="date"
          value={targetDate}
          onChange={(e) =>
            setTargetDate(
              e.target.value
            )
          }
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as RoadmapStatus
            )
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        >

          <option value="NOT_STARTED">
            NOT STARTED
          </option>

          <option value="IN_PROGRESS">
            IN PROGRESS
          </option>

          <option value="COMPLETED">
            COMPLETED
          </option>

          <option value="ON_HOLD">
            ON HOLD
          </option>

        </select>

        <Button
          fullWidth
          loading={loading}
          onClick={() =>
            onSubmit({
              title,
              description,
              targetDate,
              status,
            })
          }
        >

          {submitText}

        </Button>

      </div>

    </Card>

  );

}