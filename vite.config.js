import { defineConfig } from "vite";
import { resolve } from "path";

console.log(__dirname);

export default defineConfig({
   build: {
      rollupOptions: {
         input: {
            signup: resolve(__dirname, "signup.html"),
            signupw: resolve(__dirname, "signupw.html"),
            main: resolve(__dirname, "index.html"),
            contact: resolve(__dirname, "contact.html"),
            about: resolve(__dirname, "about.html"),
            search: resolve(__dirname, "searchpage.html"),
            ambulance: resolve(__dirname, "ambulance.html"),
            brick: resolve(__dirname, "bricklayer.html"),
            carpenter: resolve(__dirname, "carpenter.html"),
            coconut: resolve(__dirname, "coconutplucker.html"),
            driver: resolve(__dirname, "driver.html"),
            electrician: resolve(__dirname, "electrician.html"),
            hospital: resolve(__dirname, "hospital.html"),
            gardener: resolve(__dirname, "gardener.html"),
            maid: resolve(__dirname, "maid.html"),
            masonry: resolve(__dirname, "masonry.html"),
            mechanic: resolve(__dirname, "mechanic.html"),
            painter: resolve(__dirname, "painter.html"),
            plumber: resolve(__dirname, "plumber.html"),
            rubber: resolve(__dirname, "rubber.html"),
            wood: resolve(__dirname, "wood.html"),
            worker: resolve(__dirname, "worker.html"),
            details: resolve(__dirname, "details.html"),
            update: resolve(__dirname, "update.html"),
            upload: resolve(__dirname, "upload.html"),
         },
      },
   },
});