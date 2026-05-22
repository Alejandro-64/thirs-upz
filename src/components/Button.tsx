import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  className,
  children,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className={twMerge(
        "relative flex items-center justify-center gap-1 font-space-grotesk text-xs cursor-pointer",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
