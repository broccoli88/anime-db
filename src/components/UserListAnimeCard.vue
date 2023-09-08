<script setup>
import { toRefs } from 'vue'
import AppImage from '../components/AppImage.vue'
import { useAnimeStore } from '../stores/useAnimeStore'
import { useFirestoreStore } from '../stores/useFirestoreStore'
import { storeToRefs } from 'pinia'

const animeStore = useAnimeStore(),
    { isDesktopView } = storeToRefs(animeStore),
    firestoreStore = useFirestoreStore()

const props = defineProps({
    savedAnime: Object
})

const { savedAnime } = toRefs(props)
const animeId = savedAnime.value._id
const animeTitle = savedAnime.value.title

const toggleSaveAnime = async () => {
    await firestoreStore.deleteSavedAnime(animeId)
}

const showAnimeDetails = (e) => {
    animeStore.showAnimeDetails(animeTitle, animeId, '.save-anime__icon', e.target)
}
</script>

<template>
    <section class="saved-anime-card" @click="showAnimeDetails">
        <AppImage :src="savedAnime.image" class="saved-anime__image" />
        <section class="saved-anime__description">
            <h1>{{ savedAnime.title }}</h1>
            <div class="saved-anime__text">
                <p v-if="isDesktopView">Type: {{ savedAnime.type }}</p>
                <p v-if="isDesktopView">Status: {{ savedAnime.status }}</p>
                <p v-if="isDesktopView">Episodes: {{ savedAnime.episodes }}</p>
                <span class="saved-anime__genres" v-if="isDesktopView">
                    <p>Genres:</p>
                    <p v-for="genre in savedAnime.genres" :key="genre">{{ genre }}</p>
                </span>
            </div>
            <AppIcon
                icon="solar:minus-square-broken"
                class="save-anime__icon"
                @click="toggleSaveAnime"
            />
        </section>
    </section>
</template>

<style lang="scss" scoped>
.saved-anime-card {
    display: grid;
    grid-template-columns: 10rem 1fr;
    gap: $g-lg;

    padding: $p-sm;
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

    @include breakpoint {
        grid-template-columns: 13rem 1fr;
        padding-inline: $p-lg;
    }
}

.saved-anime__image {
    width: 100%;
    height: 100%;
}

.saved-anime__description {
    display: grid;
    align-items: center;

    h1 {
        font-size: $fs-txt-desktop;
    }
    @include breakpoint {
        grid-template-areas:
            'title title btn'
            'desc desc desc';

        grid-template-columns: 1fr 1fr min-content;

        h1 {
            grid-area: title;
            font-size: $fs-h3-mobile;
        }
    }
}

.saved-anime__text {
    @include breakpoint {
        grid-area: desc;
    }
}

.saved-anime__genres {
    display: flex;
    flex-wrap: wrap;
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

    @include breakpoint {
        grid-area: btn;
    }
}
</style>
