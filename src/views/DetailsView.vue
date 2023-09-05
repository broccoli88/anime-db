<script setup>
import AppImage from '../components/AppImage.vue'
import AppToOverViewBtn from '../components/AppToOverViewBtn.vue'
import { useAnimeStore } from '../stores/useAnimeStore'
import { storeToRefs } from 'pinia'

const animeStore = useAnimeStore(),
    { selectedAnime } = storeToRefs(animeStore)
</script>

<template>
    <section class="anime-details">
        <AppToOverViewBtn />
        <section class="anime-details__characteristic">
            <AppImage :src="selectedAnime.image" class="anime-details__thumb" />
            <div class="anime-details__specification">
                <h1>{{ selectedAnime.title }}</h1>
                <p>Type: {{ selectedAnime.type }}</p>
                <div class="anime-details__genres">
                    <p>Genres:</p>
                    <p v-for="genre in selectedAnime.genres" :key="genre">{{ genre }}</p>
                </div>
                <p>Episodes: {{ selectedAnime.episodes }}</p>
                <p>Status: {{ selectedAnime.status }}</p>
            </div>
        </section>
        <section class="anime-details__description">
            <h3>Synopsis</h3>
            <p>
                {{ selectedAnime.synopsis }}
            </p>
        </section>
    </section>
</template>

<style lang="scss" scoped>
.anime-details {
    display: grid;
    gap: $g-lg;
    margin-block: $m-block;
}

.anime-details__characteristic {
    @include breakpoint {
        display: grid;
        grid-template-columns: 25rem 1fr;
        gap: $g-lg;
        align-items: start;
    }
}

.anime-details__thumb {
    width: 100%;
    max-width: 30rem;

    margin-inline: auto;
    margin-bottom: $m-lg;

    @include breakpoint {
        margin-inline: 0;
    }
}

.anime-details__genres {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.anime-details__specification,
.anime-details__description {
    display: grid;
    gap: $g-sm;
}
</style>
