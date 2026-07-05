<script setup lang="ts">
import { ref } from "vue";

    interface Seat {
        row: number
        col: number
    }

    defineProps<{
        seat: Seat,
        seatNo: string[],
    }>()
</script>

<template>
    <div class="seat-area">
        <p class="seat-content">{{ seatNo[seat.row] }}-{{seat.col}}</p>
        <button @click="$emit('removeSeat')" class="cancel-btn">キャンセル</button>
    </div>
</template>

<style scoped>
.seat-area {
    display: flex;
    flex-direction: row !important;
    padding: 10px;
    margin: 0px 10px;
    margin-top: 10px;
    background-color: rgb(20, 99, 71);
    border-radius: 5px;
}
.seat-content {
    width: 100px;
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 1rem;
    color:rgb(255, 255, 255);
}

.cancel-btn {
    border-radius: 5px;
    background-color:rgb(237, 237, 237);
    margin-left: auto;
}

.cancel-btn:hover {
    background-color: rgb(212, 212, 212);
    transition-duration: 0.15s;
}
</style>