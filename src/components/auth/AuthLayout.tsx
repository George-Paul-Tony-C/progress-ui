import type {
  ReactNode,
} from "react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: Props) {

  return (
    <div className="flex min-h-screen bg-slate-100">

      <div className="hidden w-1/2 flex-col justify-center bg-slate-900 px-16 text-white lg:flex">

        <h1 className="text-5xl font-bold">
          Progress
        </h1>

        <p className="mt-4 text-lg text-slate-300">
          Track • Learn • Grow
        </p>

        <div className="mt-12 space-y-6">

          <div>
            <h3 className="font-semibold">
              📖 Daily Journals
            </h3>

            <p className="text-slate-400">
              Capture your learning every day.
            </p>

          </div>

          <div>
            <h3 className="font-semibold">
              🎯 Goals
            </h3>

            <p className="text-slate-400">
              Stay focused on long-term achievements.
            </p>

          </div>

          <div>
            <h3 className="font-semibold">
              🗺 Learning Roadmaps
            </h3>

            <p className="text-slate-400">
              Break every goal into milestones.
            </p>

          </div>

        </div>

      </div>

      <div className="flex flex-1 items-center justify-center p-8">

        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

          <h2 className="text-3xl font-bold">
            {title}
          </h2>

          <p className="mt-2 text-slate-500">
            {subtitle}
          </p>

          <div className="mt-8">

            {children}

          </div>

        </div>

      </div>

    </div>
  );
}