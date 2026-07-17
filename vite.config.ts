import { defineConfig } from "vite";
import vercel from "solid-start-vercel";

import { solidStart } from "@solidjs/start/config";

export default defineConfig({
  plugins: [
    solidStart({ adapter: vercel({ edge: true }), ssr: false }),
  ]
});
