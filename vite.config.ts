import rakkas from "rakkasjs/vite-plugin";
import { defineConfig } from "vite";
import windicss from "vite-plugin-windicss";

// `patches/rakkasjs@0.6.1.patch` is made to pass this `external` to the final esbuild in @hattip/bundler-vercel
const external = ["@hiogawa/sudachi.js"];

export default defineConfig({
  ssr: {
    external,
  },
  build: {
    rollupOptions: {
      external,
    },
  },
  plugins: [
    windicss(),
    rakkas({
      adapter: process.env.CONFIG_RAKKAS_ADAPTER as any,
    }),
  ],
});
