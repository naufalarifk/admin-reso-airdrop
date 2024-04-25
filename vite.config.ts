/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import obfuscator from "rollup-plugin-obfuscator";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default ({ mode }: { mode: never }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        store: path.resolve(__dirname, "./src/store"),
      },
    },
    server: {
      hmr: {
        overlay: true,
      },
      proxy: {
        "/api": {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: ["src/setupTest.ts"],
      coverage: {
        provider: "v8",
        reporter: ["html", "text"],
        exclude: ["./node_modules", "src/setupTest.ts"],
      },
    },
    // build: {
    //    rollupOptions: {
    //       output: {
    //          plugins: [
    //             obfuscator({
    //                options: {
    //                   compact: false,
    //                   controlFlowFlattening: true,
    //                   controlFlowFlatteningThreshold: 1,
    //                   numbersToExpressions: true,
    //                   simplify: true,
    //                   stringArrayShuffle: true,
    //                   splitStrings: true,
    //                   stringArrayThreshold: 1,
    //                },
    //             }),
    //          ],
    //       },
    //    },
    // },
  });
};
