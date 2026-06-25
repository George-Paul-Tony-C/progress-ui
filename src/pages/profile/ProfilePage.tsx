import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  LogOut,
  Pencil,
  Lock,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { getUser } from "../../services/user/userService";

import AvatarUploadSection from "../../components/profile/AvatarUploadSection";

import Loader from "../../components/ui/Loader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";

export default function ProfilePage() {

  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useAuth();

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

  function handleLogout() {

    logout();

    navigate("/login");
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!profile) {
    return (
      <p>
        Profile not found.
      </p>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <SectionTitle
          title="Profile"
          subtitle="Manage your account and security."
        />

        <Button
          className="bg-red-600 hover:bg-red-700"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </Button>

      </div>

      <Card>

        <div className="flex flex-col gap-6 md:flex-row md:items-center">

          <div className="flex flex-col items-center gap-4">

            {profile.avatarUrl ? (

              <img
                src={profile.avatarUrl}
                alt="Avatar"
                className="h-28 w-28 rounded-full object-cover"
              />

            ) : (

              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-200 text-4xl font-bold">

                {profile.name.charAt(0)}

              </div>

            )}

            <AvatarUploadSection
              userId={profile.id}
            />

          </div>

          <div className="flex-1">

            <h2 className="text-2xl font-bold">
              {profile.name}
            </h2>

            <p className="mt-1 text-slate-500">
              {profile.email}
            </p>

            <p className="mt-4 text-slate-600">
              {profile.bio || "No bio added yet."}
            </p>

          </div>

        </div>

      </Card>

      <Card>

        <h2 className="mb-5 text-xl font-semibold">
          Account
        </h2>

        <div className="flex flex-wrap gap-3">

          <Button
            onClick={() =>
              navigate("/profile/edit")
            }
          >
            <Pencil size={18} />
            Edit Profile
          </Button>

          <Button
            onClick={() =>
              navigate("/profile/password")
            }
          >
            <Lock size={18} />
            Change Password
          </Button>

        </div>

      </Card>

      <Card className="border border-red-200">

        <h2 className="mb-4 text-xl font-semibold text-red-600">
          Danger Zone
        </h2>

        <p className="mb-5 text-sm text-slate-500">
          Permanently delete your account and all associated data.
        </p>

        <Button
          className="bg-red-600 hover:bg-red-700"
          onClick={() =>
            navigate("/profile/delete-account")
          }
        >
          Delete Account
        </Button>

      </Card>

    </div>
  );
}