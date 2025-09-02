import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "resources/js/index.js"), // din main JS
            name: "Hynek/Form",
            fileName: (format) => `hynek-form.${format}.js`,
        },
        outDir: "resources/dist",
        emptyOutDir: true,
    },
})
