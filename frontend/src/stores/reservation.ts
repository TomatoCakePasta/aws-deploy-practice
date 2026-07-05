import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface Seat {
    row: number;
    col: number;
}

export const userReservationState = defineStore("reservation", () => {
    // State
    const movieId = ref("");
    const selectedSeats = ref<Seat[]>([]);
    const ticketTypes = ref({
        adult: 0,
        child: 0,
    });

    // Getter
    const totalTickets = computed(() => {
        return ticketTypes.value.adult + ticketTypes.value.child;
    });

    // Actions
    function setMovieId(id: string) {
        movieId.value = id;
    }

    const getMovieId = computed(() => {
        return movieId.value;
    });

    function setSelectedSeats(seats: Seat[]) {
        selectedSeats.value = seats;
    }

    function setTicketTypes(adult: number, child: number) {
        ticketTypes.value.adult = adult;
        ticketTypes.value.child = child;
    }

    function resetReservation() {
        movieId.value = "";
        selectedSeats.value = [];
        ticketTypes.value = {
            adult: 0,
            child: 0,
        };
    }

    return {
        movieId,
        selectedSeats,
        ticketTypes,
        totalTickets,
        setMovieId,
        setSelectedSeats,
        setTicketTypes,
        resetReservation,
        getMovieId,
    };
});
