import type {
  InputHTMLAttributes,
} from "react";

export default function FileInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {

  return (
    <input
      type="file"
      className="block w-full rounded-lg border border-slate-300 p-2 text-sm"
      {...props}
    />
  );
}