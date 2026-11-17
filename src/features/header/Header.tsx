"use client";

import { Button, Container, Link, Logo } from "@/components";
import { BsList } from "react-icons/bs";
import { Box, Overlay } from "./components";
import { useEffect, useRef, useState } from "react";
import { NAVIGATION_MENU } from "@/constants/navigation";
import { TOTAL_QUANTITY, useCartStore } from "@/store/cart-store";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const quantityToCart = useCartStore(TOTAL_QUANTITY);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const closeMenuAndFocusButton = () => {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenuAndFocusButton();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      // keeps Tab inside the open menu, which covers the whole page
      const focusable =
        panelRef.current.querySelectorAll<HTMLElement>("a, button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className="relative">
      <Container className="py-4 grid grid-cols-3">
        <Box className="justify-start">
          <Button
            ref={menuButtonRef}
            onClick={openMenu}
            aria-label="Menu"
            aria-expanded={isOpen}
            aria-controls="site-menu"
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
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={isOpen ? "visible opacity-100" : "invisible opacity-0"}
      >
        <div
          className="absolute inset-0 bg-accent/40"
          onClick={closeMenu}
        ></div>

        <div
          ref={panelRef}
          className="bg-accent relative z-10 w-full md:w-80 h-full pt-16 pb-4 px-4 grid grid-rows-[auto_1fr_auto] gap-8"
        >
          <span className="text-base text-center md:text-start cursor-default">
            Thirs Upz
          </span>

          <nav
            aria-label="Main"
            className="flex flex-row md:flex-col justify-center md:justify-start gap-4"
          >
            {NAVIGATION_MENU.map((item) => (
              <Link key={item.id} href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Box className="justify-center md:justify-start">
            <Button ref={closeButtonRef} onClick={closeMenuAndFocusButton}>
              Close
            </Button>
          </Box>
        </div>
      </Overlay>
    </header>
  );
};

export default Header;
