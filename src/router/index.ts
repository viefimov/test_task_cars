import { createRouter, createWebHistory } from "vue-router";
import CarsPage from "../pages/CarsPage.vue";


const routes = [
  { path: "/", name: "list", component: CarsPage },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
