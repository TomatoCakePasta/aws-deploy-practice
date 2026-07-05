<script setup lang="ts">
    import MovieCardComponent from "@/components/MovieCardComponent.vue";
    import { ref } from "vue";

    const movies = ref([
        {id: 1, title: "劇場版 HOGEHOGE", schedule: "10:20", endTime: "11:40", seat: 100, imageUrl: "src/assets/movie.png"},
        {id: 2, title: "映画 HOGEHOGE", schedule: "09:05", endTime: "11:25", seat: 50, imageUrl: "src/assets/movie.png"},
        {id: 3, title: "HOGE AND HOGE", schedule: "13:00", endTime: "15:20", seat: 20, imageUrl: "src/assets/movie.png"},
        {id: 4, title: "HOGE!! 2", schedule: "11:30", endTime: "13:00", seat: 67, imageUrl: "src/assets/movie.png"},
        {id: 5, title: "HOGE!!! 3", schedule: "14:15", endTime: "16:50", seat: 0, imageUrl: "src/assets/movie.png"},
        {id: 6, title: "HOGE the Movie", schedule: "18:00", endTime: "20:20", seat: 50, imageUrl: "src/assets/movie.png"},
    ]);
</script>

<template>
    <!-- MovieCardComponentを作ってv-forで回す -->
    <MovieCardComponent 
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
    />
</template>