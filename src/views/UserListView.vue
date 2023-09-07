<script setup>
import AppToOverViewBtn from '../components/AppToOverViewBtn.vue'
import UserListAnimeCard from '../components/UserListAnimeCard.vue'
import { useFirestoreStore } from '../stores/useFirestoreStore'
import { storeToRefs } from 'pinia'

const firestoreStore = useFirestoreStore(),
    { savedAnimeList } = storeToRefs(firestoreStore)
</script>

<template>
    <section class="user-list">
        <AppToOverViewBtn />

        <section class="saved-anime-list" v-if="savedAnimeList && savedAnimeList.length > 0">
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
