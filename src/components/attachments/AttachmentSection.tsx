import type { ChangeEvent } from "react";

import {
  Trash2,
  Eye,
  Download,
  Paperclip,
} from "lucide-react";

import { toast } from "sonner";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  uploadAttachment,
  deleteAttachment,
} from "../../services/attachment/attachmentService";

import {
  useAttachments,
} from "../../hooks/useAttachments";

import Card from "../ui/Card";
import Loader from "../ui/Loader";
import FileInput from "../ui/FileInput";
import Button from "../ui/Button";

interface Props {
  journalId: string;
}

export default function AttachmentSection({
  journalId,
}: Props) {

  const queryClient =
    useQueryClient();

  const {
    data,
    isLoading,
  } = useAttachments(
    journalId
  );

  const uploadMutation =
    useMutation({

      mutationFn:
        (file: File) =>
          uploadAttachment(
            journalId,
            file
          ),

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [
            "attachments",
            journalId,
          ],
        });

        toast.success(
          "File uploaded"
        );
      },
    });

  const deleteMutation =
    useMutation({

      mutationFn:
        deleteAttachment,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [
            "attachments",
            journalId,
          ],
        });

        toast.success(
          "File deleted"
        );
      },
    });

  function handleUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    uploadMutation.mutate(
      file
    );
  }

  function canPreview(
    contentType: string
  ) {

    return (
      contentType.startsWith(
        "image/"
      ) ||
      contentType ===
        "application/pdf"
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Card>

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Attachments
        </h2>

        <FileInput
          onChange={handleUpload}
        />

      </div>

      <div className="space-y-3">

        {data?.length === 0 && (
          <p className="text-slate-500">
            No attachments uploaded
          </p>
        )}

        {data?.map(
          (attachment) => (

            <div
              key={attachment.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >

              <div className="flex items-center gap-3">

                <Paperclip
                  size={18}
                />

                <div>

                  <p className="font-medium">
                    {
                      attachment.fileName
                    }
                  </p>

                  <p className="text-xs text-slate-500">
                    {
                      attachment.contentType
                    }
                  </p>

                </div>

              </div>

              <div className="flex gap-2">

                {canPreview(
                  attachment.contentType
                ) ? (

                  <a
                    href={
                      attachment.fileUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="rounded p-2 hover:bg-slate-100"
                    title="Preview"
                  >

                    <Eye
                      size={18}
                    />

                  </a>

                ) : (

                  <a
                    href={
                      attachment.fileUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="rounded p-2 hover:bg-slate-100"
                    title="Download"
                  >

                    <Download
                      size={18}
                    />

                  </a>

                )}

                <Button
                  onClick={() =>
                    deleteMutation.mutate(
                      attachment.id
                    )
                  }
                >

                  <Trash2
                    size={18}
                  />

                </Button>

              </div>

            </div>

          )
        )}

      </div>

    </Card>
  );
}