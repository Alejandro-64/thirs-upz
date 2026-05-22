import NextLink from "next/link";
import { ComponentProps } from "react";

const Link = ({ children, ...props }: ComponentProps<typeof NextLink>) => {
  return (
    <NextLink
      {...props}
      className="font-space-grotesk text-xs hover:underline hover:underline-offset-4"
    >
      {children}
    </NextLink>
  );
};

export default Link;
