<script setup>
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
import ThePagination from './components/ThePagination.vue'
import AppModalSpinner from './components/AppModalSpinner.vue'
import { storeToRefs } from 'pinia'
import { useFetchGenres } from './api/useFetchGenres'
import { useAnimeStore } from './stores/useAnimeStore'
import { RouterView, useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'

const animeStore = useAnimeStore(),
    { animeList, genresList, isDesktopView, metaData } = storeToRefs(animeStore),
    route = useRoute(),
    displayPaginationEl = ref(true)

const checkIfDataFetched = computed(() =>
    animeList.value.legth !== 0 && metaData.value !== null ? 1 : 0
)

const checkWindowWidth = () =>
    window.innerWidth >= 768 ? (isDesktopView.value = true) : (isDesktopView.value = false)

window.addEventListener('resize', checkWindowWidth)
onMounted(checkWindowWidth)

onMounted(async () => {
    genresList.value = await useFetchGenres()
})

watch(
    () => route.name,
    () => {
        route.name === 'user-list'
            ? (displayPaginationEl.value = false)
            : (displayPaginationEl.value = true)
    }
)
</script>

<template>
    <div class="app-container">
        <TheNavbar v-if="genresList.length > 0" />
        <main class="main">
            <RouterView />
        </main>
        <ThePagination v-if="displayPaginationEl && checkIfDataFetched" />
        <TheFooter />
        <Teleport to="body">
            <Transition name="fade">
                <AppModalSpinner v-if="animeList.length === 0" />
            </Transition>
        </Teleport>
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

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: $tr-03;
}
</style>
