import { createApp } from "vue";
import { createPinia } from "pinia";
import "styles/global.scss";
import App from "./App.vue";
import "./websocket/index";
createApp(App).use(createPinia()).mount("#app");
