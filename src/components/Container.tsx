import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const Container = ({ className, children }: ComponentProps<"div">) => {
  return (
    <div className={twMerge("container mx-auto px-4 lg:px-0", className)}>
      {children}
    </div>
  );
};

export default Container;
