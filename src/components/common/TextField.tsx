import type { InputHTMLAttributes } from "react";

export default function TextField({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      aria-label={props.placeholder}
      {...props}
      className={`h-14 w-full rounded-xl bg-white-00 px-5 py-4 text-field-md text-gray-04 outline-none placeholder:text-gray-02 ${className}`}
    />
  );
}
