<script setup lang="ts">
    import MovieCardComponent from "@/components/MovieCardComponent.vue";
    import SeatCardComponent from "@/components/SeatCardComponent.vue";
    import { ref } from "vue";

    const row = ref(11);
    const col = ref(18);
    const seatNo: string[] = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]

    interface Seat {
        row: number
        col: number
    }

    const reservedSeats = ref<Seat[]>([]);

    function onAddSeats(row: number, col: number): void {
        if (isSelected(row, col)) {
            reservedSeats.value = reservedSeats.value.filter((seat) => !(seat.row === row && seat.col === col));
            return;
        }
        // 1会計で10枚まで
        else if (reservedSeats.value.length < 10) {
            reservedSeats.value.push({row, col});
        }
        sortAsc();

    }

    function isSelected(row: number, col: number): boolean {
        return reservedSeats.value.some(
            seat => seat.row === row && seat.col === col
        )
    }

    function sortAsc() {
        reservedSeats.value.sort((a, b) => {
            // 行番号で比較
            if (a.row !== b.row) {
                return a.row - b.row
            }

            return a.col - b.col
        })
    }
</script>

<template>
    <div class="select-seat-content">
        <div class="main">
            <div class="header">
                スクリーン {{ $route.params.id }}
            </div>
            <div class="main-content">
                <table class="seat-table">
                    <tr v-for="i in row">
                        <td v-for="j in col" @click="onAddSeats(i, j)" :class="{ selected: isSelected(i, j) }">
                            {{ seatNo[i] }}-{{  j }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="side-content">
            <div class="cart-area">
                <!-- ボタンコンポーネントにする? -->
                 <div v-for="item in reservedSeats">
                    <SeatCardComponent 
                        :seat="item" 
                        :seatNo="seatNo"
                        @remove-seat="onAddSeats(item.row, item.col)"
                    />
                 </div>
                 <div class="footer">
                    <button :disabled="reservedSeats.length <= 0" class="buy-btn">購入</button>
                 </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.select-seat-content {
    display: flex;
}
.header {
    display: flex;
    width: 1000px;
    height: 150px;
    background-color: aliceblue;
    color: black;
    font-size: 80px;
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
}

.seat-table {
    width: 1000px;
    border-spacing: 10px;
}

td {
    width: 10px;
    height: 50px;
    background-color: rgb(195, 197, 198);
    border-radius: 5px;
    color:black;
    text-align: center;
    vertical-align: middle;
}

td:hover {
  background-color:rgb(135, 136, 136);
  transition-duration: 0.15s;
  cursor: pointer;
}

td.selected {
    background-color: rgb(46, 45, 45);
    color:aliceblue;
}

.side-content {
    width: 300px;
}

.cart-area {
    background-color:rgb(231, 238, 245);
    margin: 0px 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.cart-content {
    color:black;
    font-size: 30px;
}

.footer {
    color: black;
    margin-top: auto;
    display: flex;
}

.buy-btn {
    align-items: center;
    background-color: rgb(48, 135, 212);
    margin: 10px;
    width: 800px;
    height: 60px;
    font-weight: bold;
    border-radius: 10px;
    color:rgb(255, 255, 255);
    font-size: xx-large;
}

.buy-btn:hover {
    background-color: rgb(26, 76, 120);
    color:aliceblue;
    transition-duration: 0.15s;
}
</style>