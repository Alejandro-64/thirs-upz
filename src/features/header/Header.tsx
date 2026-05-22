"use client";

import { Button, Container, Link, Logo } from "@/components";
import { BsList } from "react-icons/bs";
import { Box, Overlay } from "./components";
import { useState } from "react";
import { NAVIGATION_MENU } from "@/constants/navigation";
import { TOTAL_QUANTITY, useCartStore } from "@/store/cart-store";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quantityToCart = useCartStore(TOTAL_QUANTITY);

  const handleIsOpen = () => setIsOpen((prev) => !prev);

  return (
    <header className="relative">
      <Container className="py-4 grid grid-cols-3">
        <Box className="justify-start">
          <Button
            onClick={handleIsOpen}
            aria-label="Open menu"
            className="group"
          >
            <BsList />
            <span className="transition-opacity opacity-0 group-hover:opacity-100">
              Menu
            </span>
          </Button>
        </Box>

        <Box className="justify-center">
          <Logo />
        </Box>

        <Box className="justify-end">
          <Link href={"/checkout"}>Cart {quantityToCart}</Link>
        </Box>
      </Container>

      <Overlay
        className={isOpen ? "visible opacity-100" : "invisible opacity-0"}
      >
        <div
          className="absolute inset-0 bg-accent/40"
          onClick={handleIsOpen}
        ></div>

        <div className="bg-accent relative z-10 w-full md:w-80 h-full pt-16 pb-4 px-4 grid grid-rows-[auto_1fr_auto] gap-8">
          <span className="text-base text-center md:text-start cursor-default">
            Thirs Upz
          </span>

          <nav className="flex flex-row md:flex-col justify-center md:justify-start gap-4">
            {NAVIGATION_MENU.map((item) => (
              <Link key={item.id} href={item.href} onClick={handleIsOpen}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Box className="justify-center md:justify-start">
            <Button onClick={handleIsOpen}>Close</Button>
          </Box>
        </div>
      </Overlay>
    </header>
  );
};

export default Header;
