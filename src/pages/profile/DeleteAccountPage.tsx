import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { useAuth } from "../../hooks/useAuth";

import {
  deleteAccount,
} from "../../services/user/userService";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";

export default function DeleteAccountPage() {

  const navigate =
    useNavigate();

  const { logout } =
    useAuth();

  const [confirmation, setConfirmation] =
    useState("");

  const mutation =
    useMutation({

      mutationFn:
        deleteAccount,

      onSuccess: () => {

        logout();

        toast.success(
          "Account deleted successfully"
        );

        navigate(
          "/login"
        );
      },

      onError: () => {

        toast.error(
          "Failed to delete account"
        );
      },
    });

  function handleDelete() {

    if (
      confirmation !== "DELETE"
    ) {

      toast.error(
        "Type DELETE to continue"
      );

      return;
    }

    mutation.mutate();
  }

  return (
    <div>

      <SectionTitle
        title="Delete Account"
        subtitle="This action cannot be undone"
      />

      <Card className="border-red-200">

        <div className="space-y-4">

          <div>

            <h2 className="text-xl font-semibold text-red-600">
              Danger Zone
            </h2>

            <p className="mt-2 text-slate-600">
              Deleting your account will permanently remove your journals,
              goals, roadmaps and profile data.
            </p>

          </div>

          <div>

            <label className="mb-1 block text-sm font-medium">
              Type DELETE to confirm
            </label>

            <Input
              value={confirmation}
              onChange={(e) =>
                setConfirmation(
                  e.target.value
                )
              }
              placeholder="DELETE"
            />

          </div>

          <div className="flex gap-3">

            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={mutation.isPending}
            >
              {mutation.isPending
                ? "Deleting..."
                : "Delete Account"}
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