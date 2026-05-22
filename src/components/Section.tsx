import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const Section = ({ className, children }: ComponentProps<"section">) => {
  return (
    <section
      className={twMerge(
        "max-w-md mx-auto py-16 flex flex-col items-center gap-8",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Section;
