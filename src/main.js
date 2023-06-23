import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import * as sharedModule_str from "./public/publicFun";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Loading from "./components/Loading.vue";

const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("loading-view", Loading);

// 打 api 的設定
app.config.globalProperties.sharedModule_str = sharedModule_str;
app.config.globalProperties.axios = axios;


axios.defaults.timeout = 50000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"; // 定義內容類型為application....
axios.defaults.baseURL = "/api"; // 打api的基本URL，打任何網址都會加上這個

app.use(createPinia());
app.use(router);

app.mount("#app");
