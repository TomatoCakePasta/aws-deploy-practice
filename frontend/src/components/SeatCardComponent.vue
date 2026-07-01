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
    <div class="cart-area">
        <p class="cart-content">{{ seatNo[seat.row] }}-{{seat.col}}</p>
        <button @click="$emit('removeSeat')">キャンセル</button>
    </div>
</template>

<style scoped>
.cart-area {
    display: flex;
    flex-direction: row !important;
    padding: 10px;
    background-color: #ea4141;
}
.cart-content {
    width: 100px;
    font-size: 1.2rem;
    margin-right: 1rem;
    color:black;
}
</style>