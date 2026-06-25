import {
  useEffect,
  useState,
} from "react";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

interface Props {

  initialTitle?: string;

  initialDescription?: string;

  initialCompleted?: boolean;

  loading?: boolean;

  submitText: string;

  onSubmit: (data: {
    title: string;
    description: string;
    completed: boolean;
  }) => void;

}

export default function MilestoneForm({

  initialTitle = "",

  initialDescription = "",

  initialCompleted = false,

  loading = false,

  submitText,

  onSubmit,

}: Props) {

  const [title, setTitle] =
    useState(initialTitle);

  const [description,
    setDescription] =
      useState(initialDescription);

  const [completed,
    setCompleted] =
      useState(initialCompleted);

  useEffect(() => {

    setTitle(initialTitle);

    setDescription(initialDescription);

    setCompleted(initialCompleted);

  }, [
    initialTitle,
    initialDescription,
    initialCompleted,
  ]);

  return (

    <Card>

      <div className="space-y-5">

        <Input
          placeholder="Milestone title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
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

        <label className="flex items-center gap-3 rounded-xl border p-4">

          <input
            type="checkbox"
            checked={completed}
            onChange={(e) =>
              setCompleted(
                e.target.checked
              )
            }
          />

          <span>
            Mark as completed
          </span>

        </label>

        <Button
          fullWidth
          loading={loading}
          onClick={() =>
            onSubmit({
              title,
              description,
              completed,
            })
          }
        >

          {submitText}

        </Button>

      </div>

    </Card>

  );

}