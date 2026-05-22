import { ComponentProps } from "react";

const Input = ({ ...props }: ComponentProps<"input">) => {
  return (
    <input
      {...props}
      className="appearance-none outline-none w-full md:w-80 text-sm"
    />
  );
};

export default Input;
