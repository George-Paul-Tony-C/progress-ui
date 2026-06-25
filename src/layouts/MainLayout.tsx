import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header>
        Progress App
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}