"use client";

import { ComponentProps, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Select = ({ children, ...props }: ComponentProps<"select">) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleArrow = () => setIsOpen(!isOpen);

  return (
    <div className="relative flex">
      <select
        {...props}
        onFocus={handleArrow}
        onBlur={handleArrow}
        className="appearance-none outline-none w-28 px-2 text-xs"
      >
        {children}
      </select>

      <div
        className={`absolute top-1/2 right-1 -translate-y-1/2 pointer-events-none transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        aria-label="arrow"
      >
        <MdKeyboardArrowDown />
      </div>
    </div>
  );
};

export default Select;
