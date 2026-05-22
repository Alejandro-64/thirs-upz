"use client";

import { Button } from "@/components";
import { Box, Input, Label } from "./components";

const Email = () => {
  return (
    <form className="flex flex-col items-center gap-8">
      <Label htmlFor="email">Subscribe to our emails</Label>

      <Box>
        <Input id="email" type="text" placeholder="Your Email" />
        <Button type="submit">Sign Up</Button>
      </Box>
    </form>
  );
};

export default Email;
