import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/global.scss";
import PhosphorVue from "phosphor-vue";
import MainView from "@/views/MainView.vue";
import DetailsView from "@/views/DetailsView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainView,
    },
    {
      path: "/details/:id",
      component: DetailsView,
      props: true,
    },
    { path: "/:notFound(.*)", redirect: "/" },
  ],
});

createApp(App).use(router).use(createPinia()).use(PhosphorVue).mount("#app");
