<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { userReservationState } from '@/stores/reservation'

    const reservationStore = userReservationState();

    interface Movie {
        id: number
        title: string
        schedule: string
        endTime: string
        seat: number
        imageUrl: string
    }

    const props = defineProps<{
        movie: Movie
    }>()

    const router = useRouter();

    function goSelectSeatPage(id: number) {
        reservationStore.setSelecteMovie(props.movie);
        router.push(`/select-seat/${id}`);
    }
</script>


<template>
    <div class="cards">
        <div class="contents">
            <div class="left-content">
                <img :src="movie.imageUrl">
            </div>
            <div class="main-content">
                <div class="text-area">
                    <div>
                        <p class="title">
                            {{ movie.title }}
                        </p>
                        <p class="sub-info">
                            {{ movie.schedule }} ~ {{ movie.endTime }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="right-content">
                <div class="seat">
                    <p v-if="movie.seat > 80">◎</p>
                    <p v-else-if="movie.seat > 30">○</p>
                    <p v-else-if="movie.seat > 15">△</p>
                    <p v-else-if="movie.seat === 0">×</p>
                </div>
                <button class="btn" @click="goSelectSeatPage(movie.id)" :disabled="movie.seat <= 0">
                    予約
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cards {
    width: 1000px;
    background-color: rgb(48, 135, 212);
    color: white;
    border-radius: 5px;
}

img {
    width: 100px;
    height: 100px;
    margin: 10px;
}

.title {
    font-size: xx-large;
}

.sub-info {
    font-size:x-large
}

.main-content {
    margin: 10px;
}

.text-area {
    display: flex;
}

.seat {
    width: 100px;
    height: 100px;
    display: flex;
    margin-right: 20px;
    font-size: 80px;
    justify-content: center;
    align-items: center;
}

.right-content {
    display:flex;
    margin: 10px;
    margin-left: auto;
}

.contents {
    display: flex;
}

.btn {
    width: 100px;
    height: 100px;
    font-size: 25px;
    background-color: aliceblue;
    border-radius: 10px;
}

.btn:hover {
  background-color:rgb(196, 198, 200);
  transition-duration: 0.15s;
  cursor: pointer;
}
</style>