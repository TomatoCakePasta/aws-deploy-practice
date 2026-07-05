<script setup lang="ts">
    import { userReservationState } from "@/stores/reservation";
    import { useRouter } from "vue-router";
    import { ref } from "vue";

    const reservationStore = userReservationState();
    const router = useRouter();
    const total = ref(0);

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
    <h1 class="title">チケット選択</h1>
    <div class="type-content">
        <p class="type-text">大人
        </p>
        <select name="adult" id="adult" class="select-btn" @change="onChange($event, 'adult')">
            <option :value="i - 1" v-for="i in 11" :key="i - 1">{{ i - 1 }}</option>
        </select>
    </div>
    <div class="type-content">
        <p class="type-text">子供</p>
        <select name="child" id="child" class="select-btn" @change="onChange($event, 'child')">
            <option :value="i - 1" v-for="i in 11" :key="i">{{ i - 1 }}</option>
        </select>
        <p class="ammount-text">¥{{  total }}</p>
    </div>
    <div class="submit-area">
        <button @click="onGoToConfirmPage()" class="confirm-btn">確認</button>
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