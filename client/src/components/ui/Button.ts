import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  [
    "w-auto",
    "rounded-md",
    "p-2",
    "hover:cursor-pointer",
    "duration-500",
    "ease-in-out",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-cyan-400", "text-white", "hover:bg-cyan-600"],
        warning: ["bg-rose-500", "hover:bg-rose-700"],
        secondary: ["bg-emerald-400", "text-white", "hover:bg-emerald-600"],
      },
    },
  }
);

// "bg-cyan-200 rounded-md w-fit p-2  flex items-center hover:cursor-pointer hover:bg-cyan-400 hover:scale-[1.05] hover:ease-in-out duration-500"
