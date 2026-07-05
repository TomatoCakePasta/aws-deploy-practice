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
        return ticketTypes.value["adult"] + ticketTypes.value["child"];
    });

    const totalSelectedSeats = computed(() => {
        return selectedSeats.value.length;
    });

    // Actions
    function setMovieId(id: string) {
        movieId.value = id;
    }

    const getMovieId = computed(() => {
        return movieId.value;
    });

    function getTotalAmount(): number {
        return ticketTypes.value["adult"] * 1500 + ticketTypes.value["child"] * 1000;
    }

    function setSelectedSeats(seats: Seat[]) {
        selectedSeats.value = seats;
    }

    function setTicketTypes(type: "adult" | "child", count: number) {
        ticketTypes.value[type] = count;
    }

    function resetReservation() {
        movieId.value = "";
        selectedSeats.value = [];
        ticketTypes.value = {
            adult: 0,
            child: 0,
        };
    }

    function isTicketCountValid(): boolean {
        return totalTickets.value == totalSelectedSeats.value;
    }

    return {
        movieId,
        selectedSeats,
        ticketTypes,
        totalTickets,
        getMovieId,
        totalSelectedSeats,
        setMovieId,
        setSelectedSeats,
        setTicketTypes,
        resetReservation,
        isTicketCountValid,
        getTotalAmount,
    };
});
