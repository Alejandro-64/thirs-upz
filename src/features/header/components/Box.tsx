import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const Box = ({ className, children }: ComponentProps<"div">) => {
  return (
    <div className={twMerge("flex items-center", className)}>{children}</div>
  );
};

export default Box;
