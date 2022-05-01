import { createApp } from "vue";
import "styles/global.scss";
import App from "./App.vue";
import "./websocket/index";
createApp(App).mount("#app");
