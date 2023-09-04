<script setup>
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
import ThePagination from './components/ThePagination.vue'
import { storeToRefs } from 'pinia'
import { useFetch } from './api/useFetch'
import { useFetchGenres } from './api/useFetchGenres'
import { useFetchById } from './api/useFetchById'
import { useAnimeStore } from './stores/useAnimeStore'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

const animeStore = useAnimeStore(),
    { animeList, genresList, isDesktopView } = storeToRefs(animeStore)

const checkWindowWidth = () =>
    window.innerWidth >= 768 ? (isDesktopView.value = true) : (isDesktopView.value = false)

window.addEventListener('resize', checkWindowWidth)
onMounted(checkWindowWidth)

onMounted(async () => {
    // genresList.value = await useFetchGenres()
    // animeList.value = await useFetch()
})
</script>

<template>
    <div class="app-container">
        <TheNavbar v-if="genresList.length > 0" />
        <main class="main">
            <RouterView />
        </main>
        <ThePagination />
        <TheFooter />
    </div>
</template>

<style lang="scss" scoped>
.app-container {
    min-height: 100vh;
    display: grid;
    grid-template-rows: max-content 1fr max-content;
}
.main {
    @include container;
}
</style>
