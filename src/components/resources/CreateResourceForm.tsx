import { useState } from "react";

import { toast } from "sonner";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createResource,
} from "../../services/resource/resourceService";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";

interface Props {
  journalId: string;
}

export default function CreateResourceForm({
  journalId,
}: Props) {

  const queryClient =
    useQueryClient();

  const [title, setTitle] =
    useState("");

  const [url, setUrl] =
    useState("");

  const [resourceType, setResourceType] =
    useState("YOUTUBE");

  const mutation =
    useMutation({

      mutationFn: () =>
        createResource(
          journalId,
          {
            title,
            url,
            resourceType:
              resourceType as any,
          }
        ),

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [
            "resources",
            journalId,
          ],
        });

        setTitle("");
        setUrl("");

        toast.success(
          "Resource added successfully"
        );
      },

      onError: () => {

        toast.error(
          "Failed to add resource"
        );
      },
    });

  return (
    <Card>

      <h3 className="mb-4 text-lg font-semibold">
        Add Resource
      </h3>

      <div className="space-y-3">

        <Select
          value={resourceType}
          onChange={(e) =>
            setResourceType(
              e.target.value
            )
          }
        >

          <option value="YOUTUBE">
            YouTube
          </option>

          <option value="ARTICLE">
            Article
          </option>

          <option value="COURSE">
            Course
          </option>

          <option value="DOCUMENTATION">
            Documentation
          </option>

          <option value="GITHUB">
            GitHub
          </option>

          <option value="OTHER">
            Other
          </option>

        </Select>

        <Input
          placeholder="Resource title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <Input
          placeholder="https://..."
          value={url}
          onChange={(e) =>
            setUrl(
              e.target.value
            )
          }
        />

        <Button
          onClick={() =>
            mutation.mutate()
          }
          disabled={
            mutation.isPending
          }
        >
          {mutation.isPending
            ? "Adding..."
            : "Add Resource"}
        </Button>

      </div>

    </Card>
  );
}