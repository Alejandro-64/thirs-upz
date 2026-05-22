import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const Paragraph = ({ className, children }: ComponentProps<"p">) => {
  return (
    <p className={twMerge("text-xs text-pretty", className)}>{children}</p>
  );
};

export default Paragraph;
