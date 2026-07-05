import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '../views/MenuView.vue'
import SelectMovieView from '@/views/SelectMovieView.vue'
import SelectSeatView from '@/views/SelectSeatView.vue'
import TicketTypeView from '@/views/TicketTypeView.vue'
import ReservationConfirmView from '@/views/ReservationConfirmView.vue'
import TicketPrintView from '@/views/TicketPrintView.vue'

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
    },
    {
      path: "/ticket-type",
      name: "ticket-type",
      component: TicketTypeView,
    },
    {
      path: "/reservation-confirm",
      name: "reservation-confirm",
      component: ReservationConfirmView,
    },
    {
      path: "/ticket-print",
      name: "ticket-print",
      component: TicketPrintView,
    }
  ],
})

export default router
