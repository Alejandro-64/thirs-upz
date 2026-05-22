import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type HeadingType = "h1" | "h2" | "h3" | "h4";

interface HeadingProps extends ComponentProps<HeadingType> {
  tag: HeadingType;
}

const Heading = ({ tag: Tag, className, children }: HeadingProps) => {
  return <Tag className={twMerge("text-xs", className)}>{children}</Tag>;
};

export default Heading;
