import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuth } from "../hooks/useAuth";

interface Props {
  children: ReactNode;
}

export default function PublicRoute({
  children,
}: Props) {
  const { isAuthenticated } =
    useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}