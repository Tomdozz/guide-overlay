import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "esm", // For ES Module usage
      sourcemap: true
    },
    {
      file: "dist/index.cjs",
      format: "cjs", // CommonJS support
      sourcemap: true
    }
  ],
  plugins: [terser()]
};
