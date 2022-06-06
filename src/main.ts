import App from "./App.vue";
import { createApp } from "vue";
import "./websocket/index";
import "styles/global.scss";

// console.log("import.meta.env.VITE_API_DOMAIN",import.meta.env.VITE_API_DOMAIN)
createApp(App).mount("#app");
