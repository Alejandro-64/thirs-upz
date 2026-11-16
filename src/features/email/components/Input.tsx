import { ComponentProps } from "react";

const Input = ({ ...props }: ComponentProps<"input">) => {
  return (
    <input
      {...props}
      className="appearance-none w-full md:w-80 text-sm"
    />
  );
};

export default Input;
