import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '../views/MenuView.vue'
import SelectMovieView from '@/views/SelectMovieView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MenuView,
    },
    {
      path: "/select-movie",
      name: "select-movie",
      component: SelectMovieView,
    }
  ],
})

export default router
