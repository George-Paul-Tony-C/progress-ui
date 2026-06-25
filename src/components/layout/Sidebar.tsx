import {
  LayoutDashboard,
  BookOpen,
  Target,
  Map,
  User,
  LogOut,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";

export default function Sidebar() {

  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const linkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
      isActive
        ? "bg-slate-900 text-white shadow"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  function handleLogout() {

    logout();

    navigate("/login");
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">

      <div className="border-b p-6">

        <h1 className="text-2xl font-bold">
          Progress
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Track • Learn • Grow
        </p>

      </div>

      <nav className="flex-1 space-y-2 p-4">

        <NavLink
          to="/"
          end
          className={linkClass}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/journals"
          className={linkClass}
        >
          <BookOpen size={18} />
          Journals
        </NavLink>

        <NavLink
          to="/goals"
          className={linkClass}
        >
          <Target size={18} />
          Goals
        </NavLink>

        <NavLink
          to="/roadmaps"
          className={linkClass}
        >
          <Map size={18} />
          Roadmaps
        </NavLink>

        <NavLink
          to="/profile"
          className={linkClass}
        >
          <User size={18} />
          Profile
        </NavLink>

      </nav>

      <div className="border-t p-5">

        <div className="mb-4">

          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-slate-500">
            {user?.email}
          </p>

        </div>

        <Button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
        >

          <LogOut size={18} />

          Logout

        </Button>

      </div>

    </aside>
  );
}