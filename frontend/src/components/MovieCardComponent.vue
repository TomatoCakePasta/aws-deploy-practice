<script setup lang="ts">
    interface Movie {
        id: number
        title: string
        schedule: string
        time: string
        seat: string
        imageUrl: string
    }

    defineProps<{
        movie: Movie
    }>()
</script>


<template>
    <div class="cards">
        {{ movie.title }}
    </div>
</template>