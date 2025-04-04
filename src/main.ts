import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useTheme } from "./utils/useTheme";
import i18n from "./utils/i18n";
import "./main.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(useTheme);
app.use(i18n);

app.mount("#app");
