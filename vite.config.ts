import rakkas from "rakkasjs/vite-plugin";
import { defineConfig } from "vite";
import windicss from "vite-plugin-windicss";

export default defineConfig({
  ssr: {
    external: ["@hiogawa/sudachi.js"],
  },
  plugins: [
    windicss(),
    rakkas({
      adapter: process.env.CONFIG_RAKKAS_ADAPTER as any,
    }),
  ],
});
