import { useState } from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import type {
  InputHTMLAttributes,
} from "react";

import Input from "../ui/Input";

interface Props
  extends InputHTMLAttributes<HTMLInputElement> {}

export default function PasswordInput({
  ...props
}: Props) {

  const [show, setShow] =
    useState(false);

  return (
    <div className="relative">

      <Input
        {...props}
        type={
          show
            ? "text"
            : "password"
        }
        className="pr-12"
      />

      <button
        type="button"
        onClick={() =>
          setShow(!show)
        }
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
      >

        {show ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}

      </button>

    </div>
  );
}