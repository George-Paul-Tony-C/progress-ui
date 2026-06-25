import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { useAuth } from "../../hooks/useAuth";

import {
  getUser,
  updateProfile,
} from "../../services/user/userService";

import Loader from "../../components/ui/Loader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";

export default function EditProfilePage() {

  const navigate =
    useNavigate();

  const queryClient =
    useQueryClient();

  const { user } =
    useAuth();

  const {
    data: profile,
    isLoading,
  } = useQuery({

    queryKey: [
      "profile",
      user?.id,
    ],

    queryFn: () =>
      getUser(user!.id),

    enabled: !!user?.id,
  });

  const [name, setName] =
    useState("");

  const [bio, setBio] =
    useState("");

  useEffect(() => {

    if (!profile) return;

    setName(profile.name);

    setBio(
      profile.bio ?? ""
    );

  }, [profile]);

  const mutation =
    useMutation({

      mutationFn:
        updateProfile,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [
            "profile",
            user?.id,
          ],
        });

        toast.success(
          "Profile updated successfully"
        );

        navigate(
          "/profile"
        );
      },

      onError: () => {

        toast.error(
          "Failed to update profile"
        );
      },
    });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">

      <SectionTitle
        title="Edit Profile"
        subtitle="Update your personal information."
      />

      <Card>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Name
            </label>

            <Input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Bio
            </label>

            <Textarea
              rows={5}
              value={bio}
              onChange={(e) =>
                setBio(
                  e.target.value
                )
              }
            />

          </div>

          <div className="flex justify-end gap-3">

            <Button
              className="bg-slate-500 hover:bg-slate-600"
              onClick={() =>
                navigate(
                  "/profile"
                )
              }
            >
              Cancel
            </Button>

            <Button
              disabled={
                mutation.isPending
              }
              onClick={() =>
                mutation.mutate({
                  name,
                  bio,
                })
              }
            >
              {mutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>

          </div>

        </div>

      </Card>

    </div>
  );
}