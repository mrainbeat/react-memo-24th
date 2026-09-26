import type { ButtonHTMLAttributes } from "react";

export default function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`flex h-14 w-full items-center justify-center rounded-xl bg-blue-05 px-5 text-action-md text-white-00 enabled:cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-03 disabled:text-gray-01 ${className}`}
    />
  );
}
