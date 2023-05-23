import { defineConfig } from "vite";
import { resolve } from "path";

console.log(__dirname);

export default defineConfig({
   build: {
      rollupOptions: {
         input: {
            main: resolve(__dirname, "index.html"),
            about: resolve(__dirname, "about.html"),
            signup: resolve(__dirname, "signup.html"),
            signupw: resolve(__dirname, "signupw.html"),
            search: resolve(__dirname, "searchpage.html"),
            ambulance: resolve(__dirname, "ambulance.html"),
            test: resolve(__dirname, "test.html"),
            test: resolve(__dirname, "test.html"),
            test: resolve(__dirname, "test.html"),
            test: resolve(__dirname, "test.html"),
         },
      },
   },
});