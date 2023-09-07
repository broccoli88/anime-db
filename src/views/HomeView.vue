<script setup>
import AppHeading from '../components/AppHeading.vue'
import AppCard from '../components/AppCard.vue'
import { useAnimeStore } from '../stores/useAnimeStore'
import { storeToRefs } from 'pinia'

const animeStore = useAnimeStore(),
    { animeList, checkIfAnimeListRender } = storeToRefs(animeStore)
</script>

<template>
    <div>
        <AppHeading> Most popular </AppHeading>
        <section class="anime-list" v-if="checkIfAnimeListRender">
            <AppCard v-for="anime in animeList" :key="anime._id" :anime-data="anime" />
        </section>
    </div>
</template>

<style lang="scss" scoped>
.anime-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
    justify-content: space-between;
    gap: $g-lg;
}
</style>
