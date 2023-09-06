<script setup>
import AppHeading from '../components/AppHeading.vue'
import AppCard from '../components/AppCard.vue'
import { useAnimeStore } from '../stores/useAnimeStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const animeStore = useAnimeStore(),
    { animeList, searchedPhrase, isSearchedByTitle } = storeToRefs(animeStore)

const currentHeading = computed(() =>
    isSearchedByTitle.value ? searchedPhrase.value : 'Anime list'
)
</script>

<template>
    <div>
        <AppHeading> {{ currentHeading }} </AppHeading>
        <section class="anime-list" v-if="animeList.length > 0">
            <AppCard v-for="anime in animeList" :key="anime._id" :anime-data="anime" />
        </section>
    </div>
</template>

<style lang="scss" scoped>
.anime-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(25rem, 100%), 32.5rem));
    justify-content: space-between;
    gap: $g-lg;
}
</style>
