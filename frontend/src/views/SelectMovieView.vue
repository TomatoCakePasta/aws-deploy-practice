<script setup lang="ts">
    import MovieCardComponent from "@/components/MovieCardComponent.vue";
    import { onMounted, ref } from "vue";
    import axios from "axios";
    import type { Movie } from "@/stores/reservation";

    const movies = ref<Movie[]>([]);

    onMounted(async () => {
        try {
            const res = await axios.get("http://localhost:3000/movie-list");
            movies.value = res.data;
            console.log(res.data);
        }
        catch(err) {
            console.error("GET Failed: ", err);
        }
    });
</script>

<template>
    <!-- MovieCardComponentを作ってv-forで回す -->
    <MovieCardComponent 
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
    />
    <p v-if="movies">Loading ...</p>
</template>