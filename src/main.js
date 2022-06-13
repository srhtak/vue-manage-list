import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../src/assets/main.css";
import { projectAuth } from "./firebase/config";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.use(autoAnimatePlugin);
    app.mount("#app");
  }
});
