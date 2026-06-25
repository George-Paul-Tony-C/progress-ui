import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  loginSchema,
  type LoginFormData,
} from "./schema/loginSchema";

import { login } from "../../services/auth/authService";
import { useAuth } from "../../hooks/useAuth";

import AuthLayout from "../../components/auth/AuthLayout";
import PasswordInput from "../../components/auth/PasswordInput";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function LoginPage() {

  const navigate =
    useNavigate();

  const { login: saveToken } =
    useAuth();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(
        loginSchema
      ),
  });

  async function onSubmit(
    data: LoginFormData
  ) {

    try {

      const auth =
        await login(data);

      saveToken(
        auth.accessToken
      );

      toast.success(
        "Welcome back!"
      );

      navigate("/");

    } catch {

      toast.error(
        "Invalid email or password."
      );

    }

  }

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue your learning journey."
    >

      <form
        onSubmit={
          handleSubmit(
            onSubmit
          )
        }
        className="space-y-5"
      >

        <div>

          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <Input
            type="email"
            placeholder="you@example.com"
            {...register(
              "email"
            )}
          />

          {errors.email && (

            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>

          )}

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <PasswordInput
            placeholder="Enter your password"
            {...register(
              "password"
            )}
          />

          {errors.password && (

            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>

          )}

        </div>

        <Button
          type="submit"
          disabled={
            isSubmitting
          }
          className="w-full justify-center"
        >

          {isSubmitting
            ? "Signing In..."
            : "Login"}

        </Button>

      </form>

      <p className="mt-6 text-center text-sm text-slate-500">

        Don't have an account?{" "}

        <Link
          to="/signup"
          className="font-semibold text-blue-600 hover:underline"
        >
          Sign Up
        </Link>

      </p>

    </AuthLayout>
  );
}