import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  changePassword,
} from "../../services/user/userService";

export default function ChangePasswordSection() {

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const mutation =
    useMutation({

      mutationFn:
        changePassword,

      onSuccess: () => {

        setCurrentPassword("");
        setNewPassword("");

        toast.success(
          "Password changed successfully"
        );
      },

      onError: () => {

        toast.error(
          "Failed to change password"
        );
      },
    });

  return (
    <div>

      <h2>
        Change Password
      </h2>

      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) =>
          setCurrentPassword(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) =>
          setNewPassword(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={() =>
          mutation.mutate({
            currentPassword,
            newPassword,
          })
        }
      >
        Change Password
      </button>

    </div>
  );
}