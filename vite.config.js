import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), "index.html"),
        codename: resolve(process.cwd(), "codename.html"),
        chat: resolve(process.cwd(), "chat.html"),
      },
    },
  },
});