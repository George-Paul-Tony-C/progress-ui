import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  signupSchema,
  type SignupFormData,
} from "./schema/signupSchema";

import { signup } from "../../services/auth/authService";

import { useAuth } from "../../hooks/useAuth";

import AuthLayout from "../../components/auth/AuthLayout";
import PasswordInput from "../../components/auth/PasswordInput";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function SignupPage() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignupFormData>({
    resolver:
      zodResolver(
        signupSchema
      ),
  });

  async function onSubmit(
    data: SignupFormData
  ) {

    try {

      const auth =
        await signup(data);

      login(
        auth.accessToken
      );

      toast.success(
        "Welcome to Progress!"
      );

      navigate("/");

    } catch {

      toast.error(
        "Unable to create account."
      );

    }

  }

  return (

    <AuthLayout
      title="Create Account 🚀"
      subtitle="Start tracking your learning journey."
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
            Name
          </label>

          <Input
            placeholder="George Paul Tony"
            {...register(
              "name"
            )}
          />

          {errors.name && (

            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>

          )}

        </div>

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
            placeholder="Create a password"
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
          fullWidth
          loading={isSubmitting}
        >
          Create Account
        </Button>

      </form>

      <p className="mt-6 text-center text-sm text-slate-500">

        Already have an account?{" "}

        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          Login
        </Link>

      </p>

    </AuthLayout>

  );
}