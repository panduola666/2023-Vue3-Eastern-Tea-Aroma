import { createApp } from "vue";
import { createPinia } from "pinia";

// https://www.npmjs.com/package/vue-sweetalert2
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const options = {
  confirmButtonColor: "#4c7866",
  cancelButtonColor: "#727272",
};

// 日曆套件
import VCalendar from "v-calendar";

// https://www.npmjs.com/package/vue-axios
import axios from "axios";
import VueAxios from "vue-axios";

// day.js
import VueDayjs from 'vue3-dayjs-plugin'

import App from "./App.vue";
import router from "./router";

// tailWind
import "./index.css";

const app = createApp(App);

// 外部套件引入
app.use(VueAxios, axios);
app.use(VueSweetalert2, options);
app.use(VCalendar, {});
app.use(VueDayjs)

app.use(createPinia());
app.use(router);

app.mount("#app");
