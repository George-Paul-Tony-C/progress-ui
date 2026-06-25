import type {
  ChangeEvent,
} from "react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  uploadAvatar,
} from "../../services/user/userService";

interface Props {
  userId: string;
}

export default function AvatarUploadSection({
  userId,
}: Props) {

  const queryClient =
    useQueryClient();

  const uploadMutation =
    useMutation({

      mutationFn:
        uploadAvatar,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [
            "profile",
            userId,
          ],
        });

        toast.success(
          "Avatar uploaded successfully"
        );
      },

      onError: () => {

        toast.error(
          "Failed to upload avatar"
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

  return (
    <div>

      <h2>
        Avatar
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={
          handleUpload
        }
      />

    </div>
  );
}