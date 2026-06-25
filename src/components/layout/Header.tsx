import {
  ArrowLeft,
  UserCircle2,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export default function Header() {

  const { user } =
    useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const isDashboard =
    location.pathname === "/";

  function handleBack() {

    if (window.history.length > 1) {

      navigate(-1);

      return;

    }

    navigate("/");

  }

  return (

    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">

      <div>

        {!isDashboard && (

          <button
            onClick={handleBack}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100"
          >

            <ArrowLeft size={18} />

            <span>
              Back
            </span>

          </button>

        )}

      </div>

      <div className="flex items-center gap-3">

        <UserCircle2
          size={40}
          className="text-slate-400"
        />

        <div className="text-right">

          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-xs text-slate-500">
            {user?.email}
          </p>

        </div>

      </div>

    </header>

  );

}