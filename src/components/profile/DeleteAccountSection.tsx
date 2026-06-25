import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { useAuth } from "../../hooks/useAuth";

import {
  deleteAccount,
} from "../../services/user/userService";

export default function DeleteAccountSection() {

  const navigate =
    useNavigate();

  const { logout } =
    useAuth();

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

  return (
    <div>

      <h2>
        Delete Account
      </h2>

      <button
        onClick={() => {

          const confirmed =
            window.confirm(
              "Are you sure you want to delete your account?"
            );

          if (confirmed) {

            mutation.mutate();
          }
        }}
      >
        Delete Account
      </button>

    </div>
  );
}