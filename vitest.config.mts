import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    // http.ts lanza un error al importarse si falta esta variable
    env: { NEXT_PUBLIC_URL_API: "https://api.test/products" },
  },
});
