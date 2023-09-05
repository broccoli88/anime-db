<script setup>
import { toRefs } from 'vue'
import AppImage from '../components/AppImage.vue'
import { useAnimeStore } from '../stores/useAnimeStore'

const animeStore = useAnimeStore()

const props = defineProps({
    savedAnime: Object
})

const { savedAnime } = toRefs(props)
const animeId = savedAnime.value._id

const toggleSaveAnime = () => {
    animeStore.toggleSaveAnime(savedAnime.value, animeId)
}

const showAnimeDetails = (e) => {
    animeStore.showAnimeDetails(animeId, '.save-anime__icon', e.target)
}
</script>

<template>
    <section class="saved-anime-card" @click="showAnimeDetails">
        <AppImage :src="savedAnime.image" class="saved-anime__image" />
        <section class="saved-anime__description">
            <h1>{{ savedAnime.title }}</h1>
            <div>
                <p>Type: {{ savedAnime.type }}</p>
                <p>Status: {{ savedAnime.status }}</p>
                <p>Episodes: {{ savedAnime.episodes }}</p>
                <span class="saved-anime__genres">
                    <p>Genres:</p>
                    <p v-for="genre in savedAnime.genres" :key="genre">{{ genre }}</p>
                </span>
            </div>
        </section>
        <AppIcon
            icon="solar:minus-square-broken"
            class="save-anime__icon"
            @click="toggleSaveAnime"
        />
    </section>
</template>

<style lang="scss" scoped>
.saved-anime-card {
    display: flex;
    gap: $g-lg;

    padding: $p-sm $p-lg;
    border: 1px solid $color-white;
    border-radius: $br-08;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 6px 6px 10px 1px hsl(0, 0%, 0%, 1);
    transition: $tr-03;

    &:hover {
        transform: scale(1.02);
        box-shadow: 12px 12px 20px 1px hsl(0, 0%, 0%, 1);
    }
}

.saved-anime__image {
    width: 10rem;
    height: 15rem;
}

.saved-anime__description {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h1 {
        font-size: $fs-h3-mobile;
    }
}

.saved-anime__genres {
    display: flex;
    gap: calc($g-sm);
}

.save-anime__icon {
    margin-left: auto;
    width: 2.5rem;
    height: 2.5rem;
    transition: $tr-03;

    &:hover {
        color: $color-primary-light;
    }
}
</style>
