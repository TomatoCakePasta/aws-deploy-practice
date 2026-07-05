<script setup lang="ts">
    import { userReservationState } from "@/stores/reservation";
    import { useRouter } from "vue-router";
    import { ref } from "vue";
import TicketTypeView from "./TicketTypeView.vue";

    const reservationStore = userReservationState();
    const router = useRouter();
    const total = ref(0);
    const movie = reservationStore.getSelectedMovie();
    const ticktTypes = reservationStore.getTicketTypes();

    interface Seat {
        row: number
        col: number
    }

    const reservedSeats = ref<Seat[]>(reservationStore.getSelectedSeats());
    const seatNo: string[] = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]

    function onChange(event: Event, type: "adult" | "child") {
        const value = Number((event.target as HTMLSelectElement).value);
        reservationStore.setTicketTypes(type, value);
        total.value = reservationStore.getTotalAmount();
    }

    function onGoToConfirmPage() {
        if (!reservationStore.isTicketCountValid()) {
            alert(`合計枚数が${reservationStore.totalSelectedSeats}枚になるように選択してください`);
            return;
        }

        router.push("/confirm");
    }


</script>
<template>
<div class="type-area">
    <h1 class="title">確認画面</h1>
    <div class="movie-content">
        <img :src="movie.imageUrl">
        <div class="movie-text">
            <p class="type-text">{{ movie.title }}</p>
            <p class="sub-info">{{ movie.schedule }}-{{ movie.endTime }}</p>
        </div>
    </div>
    <h1 class="sub-info center">予約座席</h1>
    <div class="seat-area">
        <p class="sub-info" v-for="item in reservedSeats">{{ seatNo[item.row] }}-{{ item.col }}</p>
    </div>
    <div class="type-content">
        <p class="type-text">大人 {{ ticktTypes.adult }}枚</p>
    </div>
    <div class="type-content">
        <p class="type-text">子供 {{ ticktTypes.child}} 枚</p>
        <p class="ammount-text">¥{{  reservationStore.getTotalAmount() }}</p>
    </div>
    <div class="submit-area">
        <button @click="onGoToConfirmPage()" class="confirm-btn">発券</button>
    </div>
</div>
<!-- エラーメッセージ: 合計枚数がNになるように選択してください -->
</template>

<style scoped>
.title {
    text-align: center;
    font-size:xx-large;
    font-weight: bold;
    margin: 10px 10px;
    color:rgb(31, 31, 31);
}

img {
    width: 100px;
    margin: 10px;
}

.movie-content {
    display: flex;
}

.sub-info {
    font-size: 25px;
    font-weight: bold;
    margin: 10px;
    color: rgb(31, 31,31);
}

.center {
    text-align: center;
}
.seat-area {
    margin: 20px;
    height: 200px;
    overflow: scroll;
    overflow-x: hidden;
}

.type-area {
    background-color: rgb(240, 240, 240);
    width: 500px;
    border-radius: 10px;
    padding: 20px 0px;
}

.type-content {
    display: flex;
    margin: 20px;
}

.type-text {
    font-size:xx-large;
    font-weight: bold;
    margin: 10px 10px;
    color:rgb(31, 31, 31);
}

.ammount-text {
    font-size: xx-large;
    font-weight: bold;
    width: 180px;
    margin: 10px 10px;
    margin-left: auto;
    border-bottom: 1px solid #404040;
    color: rgb(31, 31, 31);
}

.select-btn {
    width: 100px;
    font-size: xx-large;
    background-color: #f2f2f2;
    color:#575757;
}

.submit-area {
    display: flex;
    justify-content: center;
}

.confirm-btn {
    background-color: rgb(48, 135, 212);
    margin: 10px;
    width: 80%;
    height: 60px;
    font-weight: bold;
    border-radius: 10px;
    color:rgb(255, 255, 255);
    font-size: xx-large;
}
</style>