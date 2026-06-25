import {type ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "../contexts/AuthContext";

import { Toaster } from "sonner";

const queryClient =
  new QueryClient();

interface Props {
  children: ReactNode;
}

export default function AppProviders({
  children,
}: Props) {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      <AuthProvider>
        <Toaster richColors />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}