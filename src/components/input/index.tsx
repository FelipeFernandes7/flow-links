import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
}

export function Input({ icon, ...props }: InputProps) {
  return (
    <div className="border-0 h-9  bg-zinc-800 mb-3 px-2 flex flex-row items-center justify-between rounded-md ">
      <input
        className=" w-full h-full outline-none px-2 bg-zinc-800 text-white"
        {...props}
      />
      <div className="mr-2">{icon}</div>
    </div>
  );
}
