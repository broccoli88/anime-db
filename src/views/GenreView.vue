<script setup>
import AppToOverViewBtn from '../components/AppToOverViewBtn.vue'
import AppCard from '../components/AppCard.vue'
import { storeToRefs } from 'pinia'
import { useAnimeStore } from '../stores/useAnimeStore'
const animeStore = useAnimeStore(),
    { animeByGenreList } = storeToRefs(animeStore)

console.log(animeByGenreList.value)
</script>

<template>
    <div class="anime-genre">
        <AppToOverViewBtn />
        <section class="anime-genre-list">
            <AppCard
                v-for="animeByGenre in animeByGenreList"
                :key="animeByGenre._id"
                :animeData="animeByGenre"
            />
        </section>
    </div>
</template>

<style lang="scss" scoped>
.anime-genre {
    display: grid;
    gap: $g-lg;
    margin-block: $m-block;
}

.anime-genre-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
    justify-content: space-between;
    gap: $g-lg;
}
</style>
