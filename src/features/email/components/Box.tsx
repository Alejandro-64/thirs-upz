import { ComponentProps } from "react";

const Box = ({ children }: ComponentProps<"div">) => {
  return (
    <div className="flex items-center gap-4 pb-1 border-b border-accent">
      {children}
    </div>
  );
};

export default Box;
