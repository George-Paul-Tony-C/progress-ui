import { toast } from "sonner";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  ExternalLink,
  Trash2,
  GitBranch,
  FileText,
  BookOpen,
  Video,
  Notebook,
} from "lucide-react";

import { useResources }
from "../../hooks/useResources";

import {
  deleteResource,
} from "../../services/resource/resourceService";

import CreateResourceForm
from "./CreateResourceForm";

import Card from "../ui/Card";
import Loader from "../ui/Loader";

interface Props {
  journalId: string;
}

function getIcon(
  type: string
) {

  switch (type) {

    case "YOUTUBE":
      return <Video size={18} />;

    case "GITHUB":
      return <GitBranch size={18} />;

    case "DOCUMENTATION":
      return <BookOpen size={18} />;

    case "COURSE":
      return <BookOpen size={18}/>;

    case "ARTICLE":
      return <Notebook size={18}/>;

    case "OTHER":
      return <FileText size={18}/>;

    default:
      return <FileText size={18} />;
  }
}

export default function ResourceSection({
  journalId,
}: Props) {

  const queryClient =
    useQueryClient();

  const {
    data,
    isLoading,
  } = useResources(
    journalId
  );

  const deleteMutation =
    useMutation({

      mutationFn:
        deleteResource,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [
            "resources",
            journalId,
          ],
        });

        toast.success(
          "Resource deleted"
        );
      },
    });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Card>

      <h2 className="mb-4 text-xl font-semibold">
        Resources
      </h2>

      <CreateResourceForm
        journalId={journalId}
      />

      <div className="mt-6 space-y-3">

        {data?.length === 0 && (
          <p className="text-slate-500">
            No resources added yet
          </p>
        )}

        {data?.map(
          (resource) => (

            <div
              key={resource.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >

              <div className="flex items-center gap-3">

                {getIcon(
                  resource.resourceType
                )}

                <div>

                  <p className="font-medium">
                    {resource.title}
                  </p>

                  <p className="text-xs text-slate-500">
                    {
                      resource.resourceType
                    }
                  </p>

                </div>

              </div>

              <div className="flex gap-2">

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded p-2 hover:bg-slate-100"
                >
                  <ExternalLink
                    size={18}
                  />
                </a>

                <button
                  onClick={() =>
                    deleteMutation.mutate(
                      resource.id
                    )
                  }
                  className="rounded p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2
                    size={18}
                  />
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </Card>
  );
}