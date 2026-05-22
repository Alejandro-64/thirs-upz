import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const Box = ({ className, children }: ComponentProps<"div">) => {
  return (
    <div className={twMerge("flex flex-col justify-end gap-1", className)}>
      {children}
    </div>
  );
};

export default Box;
