"use client";

import { Button } from "@/components";
import { FormEvent, useState } from "react";
import { Box, Input, Label } from "./components";

const Email = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setIsSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-8"
    >
      <Label htmlFor="email">Subscribe to our emails</Label>

      <Box>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Your Email"
          onChange={() => setIsSubmitted(false)}
        />
        <Button type="submit">Sign Up</Button>
      </Box>

      {isSubmitted && (
        <p role="status" className="text-xs">
          Thanks! This is a demo, so nothing was saved.
        </p>
      )}
    </form>
  );
};

export default Email;
