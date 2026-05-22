import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const Overlay = ({ className, children }: ComponentProps<"div">) => {
  return (
    <div
      className={twMerge(
        "fixed z-50 inset-0 transition-opacity duration-300",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Overlay;
