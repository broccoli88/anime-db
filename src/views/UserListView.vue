<script setup>
import AppToOverViewBtn from '../components/AppToOverViewBtn.vue'
import UserListAnimeCard from '../components/UserListAnimeCard.vue'
import { useAnimeStore } from '../stores/useAnimeStore'
import { storeToRefs } from 'pinia'

const animeStore = useAnimeStore(),
    { savedAnimeList } = storeToRefs(animeStore)
</script>

<template>
    <section>
        <AppToOverViewBtn />

        <section>
            <UserListAnimeCard />
        </section>
    </section>
</template>

<style lang="scss" scoped></style>
