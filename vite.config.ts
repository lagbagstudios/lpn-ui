import { defineConfig } from "vite";

import { solidStart } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "vercel"
  },
  plugins: [
    solidStart({ ssr: false }),
  ]
});
