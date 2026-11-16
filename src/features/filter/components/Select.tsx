"use client";

import { ComponentProps, FocusEvent, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const Select = ({
  children,
  className,
  onFocus,
  onBlur,
  ...props
}: ComponentProps<"select">) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <div className="relative flex">
      <select
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={twMerge(
          "appearance-none outline-none w-28 px-2 text-xs",
          className,
        )}
      >
        {children}
      </select>

      <div
        className={`absolute top-1/2 right-1 -translate-y-1/2 pointer-events-none transition-transform ${isFocused ? "rotate-180" : "rotate-0"}`}
        aria-hidden="true"
      >
        <MdKeyboardArrowDown />
      </div>
    </div>
  );
};

export default Select;
