import type { TextareaHTMLAttributes } from "react";

export default function Textarea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className="min-h-32 w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-slate-900"
    />
  );
}