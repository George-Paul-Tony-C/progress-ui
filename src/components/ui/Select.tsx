import type { SelectHTMLAttributes } from "react";

export default function Select(
  props: SelectHTMLAttributes<HTMLSelectElement>
) {
  return (
    <select
      {...props}
      className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-slate-900"
    />
  );
}