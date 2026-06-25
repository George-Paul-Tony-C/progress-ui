import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  changePassword,
} from "../../services/user/userService";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";

export default function ChangePasswordPage() {

  const navigate =
    useNavigate();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const mutation =
    useMutation({

      mutationFn:
        changePassword,

      onSuccess: () => {

        toast.success(
          "Password changed successfully"
        );

        navigate(
          "/profile"
        );
      },

      onError: () => {

        toast.error(
          "Failed to change password"
        );
      },
    });

  function handleSubmit() {

    if (!currentPassword.trim()) {

      toast.error(
        "Current password is required"
      );

      return;
    }

    if (!newPassword.trim()) {

      toast.error(
        "New password is required"
      );

      return;
    }

    if (newPassword.length < 6) {

      toast.error(
        "Password must be at least 6 characters"
      );

      return;
    }

    if (newPassword !== confirmPassword) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }

    mutation.mutate({
      currentPassword,
      newPassword,
    });
  }

  return (
    <div>

      <SectionTitle
        title="Change Password"
        subtitle="Update your account password"
      />

      <Card>

        <div className="space-y-4">

          <div>

            <label className="mb-1 block text-sm font-medium">
              Current Password
            </label>

            <Input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">
              New Password
            </label>

            <Input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">
              Confirm Password
            </label>

            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

          </div>

          <div className="flex gap-3">

            <Button
              onClick={handleSubmit}
              disabled={mutation.isPending}
            >
              {mutation.isPending
                ? "Updating..."
                : "Update Password"}
            </Button>

            <Button
              type="button"
              className="bg-slate-500 hover:bg-slate-600"
              onClick={() =>
                navigate(
                  "/profile"
                )
              }
            >
              Cancel
            </Button>

          </div>

        </div>

      </Card>

    </div>
  );
}