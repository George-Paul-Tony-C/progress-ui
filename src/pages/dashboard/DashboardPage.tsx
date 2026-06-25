import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { useDashboard } from "../../hooks/useDashboard";

import Card from "../../components/ui/Card";

export default function DashboardPage() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    data,
    isLoading,
  } = useDashboard();

  if (isLoading) {
    return (
      <p>
        Loading dashboard...
      </p>
    );
  }

  return (
    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Welcome Back, {user?.name}
        </h1>

        <p className="mt-1 text-slate-500">
          Track your learning progress and growth.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

        <Card>

          <p className="text-sm text-slate-500">
            Total Journals
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {data?.totalJournals ?? 0}
          </h2>

        </Card>

        <Card>

          <p className="text-sm text-slate-500">
            Resources
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {data?.totalResources ?? 0}
          </h2>

        </Card>

        <Card>

          <p className="text-sm text-slate-500">
            Attachments
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {data?.totalAttachments ?? 0}
          </h2>

        </Card>

        <Card>

          <p className="text-sm text-slate-500">
            Total Hours
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {data?.totalHoursSpent ?? 0}
          </h2>

        </Card>

        <Card>

          <p className="text-sm text-slate-500">
            Common Mood
          </p>

          <h2 className="mt-2 text-xl font-bold">
            {data?.mostCommonMood ?? "N/A"}
          </h2>

        </Card>

      </div>

      <div className="mt-8">

        <h2 className="mb-4 text-xl font-semibold">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-3">

          <button
            className="rounded-lg bg-slate-900 px-4 py-2 text-white"
            onClick={() =>
              navigate("/journals")
            }
          >
            Journals
          </button>

          <button
            className="rounded-lg bg-slate-900 px-4 py-2 text-white"
            onClick={() =>
              navigate("/goals")
            }
          >
            Goals
          </button>

          <button
            className="rounded-lg bg-slate-900 px-4 py-2 text-white"
            onClick={() =>
              navigate("/roadmaps")
            }
          >
            Roadmaps
          </button>

          <button
            className="rounded-lg bg-slate-900 px-4 py-2 text-white"
            onClick={() =>
              navigate("/profile")
            }
          >
            Profile
          </button>

        </div>

      </div>

    </div>
  );
}