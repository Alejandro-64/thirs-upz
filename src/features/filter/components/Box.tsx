import { ComponentProps } from "react";

const Box = ({ children }: ComponentProps<"div">) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export default Box;
