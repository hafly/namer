import { createRouter, createWebHistory } from "vue-router";
import Poem from "../views/poem";

const routes = [
  {
    path: "/",
    name: "poem",
    component: Poem,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
