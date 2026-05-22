import { ComponentProps } from "react";

const Label = ({ children, ...props }: ComponentProps<"label">) => {
  return (
    <label {...props} className="text-xs">
      {children}
    </label>
  );
};

export default Label;
