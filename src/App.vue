<script setup>
import TheNavbar from './components/TheNavbar.vue'
import { storeToRefs } from 'pinia'
import { useFetch } from './api/useFetch'
import { useFetchGenres } from './api/useFetchGenres'
import { useFetchById } from './api/useFetchById'
import { useAnimeStore } from './stores/useAnimeStore'
import { onMounted, ref } from 'vue'

const animeStore = useAnimeStore(),
    { animeList, genresList, selectedAnime } = storeToRefs(animeStore)

onMounted(async () => {
    // animeList.value = await useFetch()
    // console.log(animeList.value)
    // genresList.value = await useFetchGenres()
    // console.log(genresList.value)
    // selectedAnime.value = await useFetchById(1)
    // console.log(selectedAnime.value)
})
</script>

<template>
    <div>
        <TheNavbar />
    </div>
</template>

<style lang="scss" scoped></style>
