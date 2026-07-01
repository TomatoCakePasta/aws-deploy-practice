import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '../views/MenuView.vue'
import SelectMovieView from '@/views/SelectMovieView.vue'
import SelectSeatView from '@/views/SelectSeatView.vue'

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
    },
    {
      path: "/select-seat/:id",
      name: "select-seat",
      component: SelectSeatView,
    }
  ],
})

export default router
