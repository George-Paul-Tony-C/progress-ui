import clsx from "clsx";
import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {

  children: ReactNode;

  variant?:
    | "primary"
    | "secondary"
    | "danger";

  size?:
    | "sm"
    | "md"
    | "lg";

  fullWidth?: boolean;

  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  className,
  disabled,
  ...props
}: Props) {

  return (
    <button
      {...props}
      disabled={
        disabled || loading
      }
      className={clsx(

        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition",

        {
          "bg-slate-900 text-white hover:bg-slate-800":
            variant === "primary",

          "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100":
            variant === "secondary",

          "bg-red-600 text-white hover:bg-red-700":
            variant === "danger",

          "px-3 py-2 text-sm":
            size === "sm",

          "px-5 py-3":
            size === "md",

          "px-6 py-4 text-lg":
            size === "lg",

          "w-full":
            fullWidth,

          "cursor-not-allowed opacity-60":
            disabled || loading,
        },

        className
      )}
    >

      {loading
        ? "Loading..."
        : children}

    </button>
  );
}