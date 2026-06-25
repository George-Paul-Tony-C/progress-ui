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

  loading?: boolean;

  submitText: string;

  onSubmit: (data: {
    title: string;
    description: string;
  }) => void;

}

export default function MilestoneForm({

  initialTitle = "",

  initialDescription = "",

  loading = false,

  submitText,

  onSubmit,

}: Props) {

  const [title, setTitle] =
    useState(initialTitle);

  const [description,
    setDescription] =
      useState(initialDescription);

  useEffect(() => {

    setTitle(
      initialTitle
    );

    setDescription(
      initialDescription
    );

  }, [
    initialTitle,
    initialDescription,
  ]);

  return (

    <Card>

      <div className="space-y-5">

        <div>

          <label className="mb-1 block text-sm font-medium">
            Title
          </label>

          <Input
            placeholder="Milestone title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

        </div>

        <div>

          <label className="mb-1 block text-sm font-medium">
            Description
          </label>

          <Textarea
            rows={5}
            placeholder="Milestone description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

        </div>

        <Button

          fullWidth

          loading={loading}

          onClick={() =>
            onSubmit({

              title,

              description,

            })
          }

        >

          {submitText}

        </Button>

      </div>

    </Card>

  );

}