<script setup lang="ts">
    import MovieCardComponent from "@/components/MovieCardComponent.vue";
import { ref } from "vue";

    const movies = ref([
        {id: 1, title: "劇場版 HOGEHOGE", schedule: "MM:HH", endTime: "HH:MM", seat: 100, imageUrl: "src/assets/movie.png"},
        {id: 2, title: "映画 HOGEHOGE", schedule: "MM:HH", endTime: "HH:MM", seat: 50, imageUrl: "src/assets/movie.png"},
        {id: 3, title: "HOGE AND HOGE", schedule: "MM:HH", endTime: "HH:MM", seat: 20, imageUrl: "src/assets/movie.png"},
        {id: 4, title: "HOGE!! 2", schedule: "MM:HH", endTime: "HH:MM", seat: 67, imageUrl: "src/assets/movie.png"},
        {id: 5, title: "HOGE!!! 3", schedule: "MM:HH", endTime: "HH:MM", seat: 0, imageUrl: "src/assets/movie.png"},
        {id: 6, title: "HOGE the Movie", schedule: "MM:HH", endTime: "HH:MM", seat: 50, imageUrl: "src/assets/movie.png"},
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