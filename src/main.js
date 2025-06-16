import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/main.css";
import { OhVueIcon, addIcons } from "oh-vue-icons"
import {
  FaWindows,
  BiNintendoSwitch ,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
  FaGlobe,
  SiPlaystationvita
} from "oh-vue-icons/icons"

addIcons(SiPlaystationvita,FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid,BiNintendoSwitch, FaGlobe)


const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
app.component("v-icon", OhVueIcon)
