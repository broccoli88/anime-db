<script setup>
import AppHeading from '../components/AppHeading.vue'
import AppCard from '../components/AppCard.vue'
import { useAnimeStore } from '../stores/useAnimeStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const animeStore = useAnimeStore(),
    { currentList, searchedPhrase, isSearchedByTitle } = storeToRefs(animeStore)

const currentHeading = computed(() =>
    isSearchedByTitle.value ? searchedPhrase.value : 'Anime list'
)
</script>

<template>
    <div>
        <AppHeading> {{ currentHeading }} </AppHeading>
        <section class="anime-list" v-if="currentList.length > 0">
            <AppCard v-for="anime in currentList" :key="anime._id" :anime-data="anime" />
        </section>
        <section v-else class="no-results">
            <h2>No matching results</h2>
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

.no-results {
    text-align: center;
    margin-block: calc($m-lg * 6);
}
</style>
