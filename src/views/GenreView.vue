<script setup>
import AppToOverViewBtn from '../components/AppToOverViewBtn.vue'
import AppHeading from '../components/AppHeading.vue'
import AppCard from '../components/AppCard.vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAnimeStore } from '../stores/useAnimeStore'
const animeStore = useAnimeStore(),
    { animeList, checkIfAnimeListRender } = storeToRefs(animeStore),
    route = useRoute()
</script>

<template>
    <div class="anime-genre">
        <AppToOverViewBtn />

        <AppHeading>
            Genre:
            <span class="searched-genre">
                {{ route.params.genre }}
            </span>
        </AppHeading>

        <section class="anime-genre-list" v-if="checkIfAnimeListRender">
            <AppCard
                v-for="animeByGenre in animeList"
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

.searched-genre {
    color: $color-primary;
}
</style>
