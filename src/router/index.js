import { createRouter, createWebHistory } from "vue-router";
// import Home from '../pages/Home.vue'
// import GameDetail from '../pages/GameDetail.vue'
import HomeView from "@/views/HomeView.vue";
import FavoritesView from "@/views/FavoritesView.vue";
import DetailView from "@/views/DetailView.vue";
import Populares from "@/views/Populares.vue";
import Categorias from "@/views/Categorias.vue";
import Ajustes from "@/views/Ajustes.vue";

const routes = [
  { path: "/", component: HomeView },
  {
    path: "/game/:id",
    name: "GameDetails",
    component: DetailView,
    props: true,
  },
  {
    path: "/favoritos",
    component: FavoritesView,
  },
  {
    path: "/populares",
    component: Populares,
  },
  {
    path: "/categorias",
    component: Categorias,
  },
  {
    path: "/ajustes",
    component: Ajustes,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
