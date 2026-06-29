<script setup lang="ts">
    import MovieCardComponent from "@/components/MovieCardComponent.vue";
import { ref } from "vue";

    const movies = ref([
        {id: 1, title: "劇場版 HOGEHOGE", schedule: "MM:HH", time: "MM", seat: "available", imageUrl: "../assets/movie.png"},
        {id: 2, title: "映画 HOGEHOGE", schedule: "MM:HH", time: "MM", seat: "available", imageUrl: "../assets/movie.png"},
        {id: 2, title: "HOGE AND HOGE", schedule: "MM:HH", time: "MM", seat: "available", imageUrl: "../assets/movie.png"},
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