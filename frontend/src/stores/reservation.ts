import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface Seat {
    row: number;
    col: number;
}

export interface Movie {
    id: number;
    title: string;
    schedule: string;
    endTime: string;
    seat: number;
    imageUrl: string;
}

export const userReservationState = defineStore("reservation", () => {
    // State
    const movieId = ref("");
    const selectedSeats = ref<Seat[]>([]);
    const ticketTypes = ref({
        adult: 0,
        child: 0,
    });

    const selectedMovie = ref<Movie>({
        id: 0,
        title: "",
        schedule: "",
        endTime: "",
        seat: 0,
        imageUrl: "",
    });

    function setSelecteMovie(movie: Movie) {
        selectedMovie.value = movie;
    }

    function getSelectedMovie(): Movie {
        return selectedMovie.value;
    }

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

    function getSelectedSeats(): Seat[] {
        return selectedSeats.value;
    }

    function setSelectedSeats(seats: Seat[]) {
        selectedSeats.value = seats;
    }

    function setTicketTypes(type: "adult" | "child", count: number) {
        ticketTypes.value[type] = count;
    }

    function getTicketTypes() {
        return ticketTypes.value;
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
        setSelecteMovie,
        getSelectedMovie,
        setMovieId,
        setSelectedSeats,
        getSelectedSeats,
        setTicketTypes,
        getTicketTypes,
        resetReservation,
        isTicketCountValid,
        getTotalAmount,
    };
});
