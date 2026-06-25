import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { User } from "../types/user";
import { getCurrentUser } from "../services/user/userService";

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: Props) {

  const [token, setToken] =
    useState<string | null>(
      localStorage.getItem(
        "accessToken"
      )
    );

  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {

    async function loadUser() {

      if (!token) {
        setUser(null);
        return;
      }

      try {

        const currentUser =
          await getCurrentUser();

        setUser(currentUser);

      } catch {

        logout();
      }
    }

    loadUser();

  }, [token]);

  const login = (
    token: string
  ) => {

    localStorage.setItem(
      "accessToken",
      token
    );

    setToken(token);
  };

  const logout = () => {

    localStorage.removeItem(
      "accessToken"
    );

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}