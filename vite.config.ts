import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { join } from "path";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  // console.log(env)
  return {
    plugins: [vue()],
    base: "./",
    build: {
      outDir: "./docs",
    },
    server: {
      hmr: true,
      host: "0.0.0.0"
    },
    resolve: {
      alias: {
        "@": resolve("src"),
        components: resolve("src/components"),
        utils: resolve("src/utils"),
        styles: resolve("src/styles"),
        hooks: resolve("src/hooks"),
        configs: resolve("src/configs"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/styles/var.scss" as *;
            @use "@/styles/mixins.scss" as *;
            @use "@/styles/base.scss" as *;
            @use "@/styles/theme.scss" as *;
          `,
        },
      },
    },
  }
});

function resolve(dir) {
  return join(__dirname, dir);
}


