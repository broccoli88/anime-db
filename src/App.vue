<script setup>
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
import { storeToRefs } from 'pinia'
import { useFetch } from './api/useFetch'
import { useFetchGenres } from './api/useFetchGenres'
import { useFetchById } from './api/useFetchById'
import { useAnimeStore } from './stores/useAnimeStore'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

const animeStore = useAnimeStore(),
    { animeList, genresList, selectedAnime, isDesktopView } = storeToRefs(animeStore)

const checkWindowWidth = () =>
    window.innerWidth >= 768 ? (isDesktopView.value = true) : (isDesktopView.value = false)

window.addEventListener('resize', checkWindowWidth)
onMounted(checkWindowWidth)

onMounted(async () => {
    animeList.value = await useFetch()
    console.log(animeList.value)
    // genresList.value = await useFetchGenres()
    // console.log(genresList.value)
    // selectedAnime.value = await useFetchById(1)
    // console.log(selectedAnime.value)
})
</script>

<template>
    <div>
        <TheNavbar />
        <main class="main">
            <RouterView />
        </main>
        <TheFooter />
    </div>
</template>

<style lang="scss" scoped>
.main {
    @include container;
}
</style>
