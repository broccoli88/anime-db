<script setup>
import AppToOverViewBtn from '../components/AppToOverViewBtn.vue'
import UserListAnimeCard from '../components/UserListAnimeCard.vue'
import { useAnimeStore } from '../stores/useAnimeStore'
import { storeToRefs } from 'pinia'

const animeStore = useAnimeStore(),
    { savedAnimeList } = storeToRefs(animeStore)
</script>

<template>
    <section class="user-list">
        <AppToOverViewBtn />

        <section class="saved-anime-list">
            <UserListAnimeCard
                v-for="savedAnime in savedAnimeList"
                :key="savedAnime._id"
                :savedAnime="savedAnime"
            />
        </section>
    </section>
</template>

<style lang="scss" scoped>
.user-list {
    margin-block: $m-block;
    display: grid;
    gap: $g-lg;
}
.saved-anime-list {
    display: grid;
    gap: $g-md;
}
</style>
