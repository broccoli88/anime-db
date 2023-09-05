<script setup>
import AppImage from './AppImage.vue'
import { useAnimeStore } from '../stores/useAnimeStore'
import { computed, toRefs } from 'vue'

const props = defineProps({
    animeData: Object
})

const animeStore = useAnimeStore()
const { animeData } = toRefs(props)
const animeId = animeData.value._id

const currentSaveAnimeIcon = computed(() =>
    animeData.value.isSaved ? 'solar:minus-square-broken' : 'solar:add-square-broken'
)

const showAnimeDetails = (e) => {
    animeStore.showAnimeDetails(animeId, '.anime-card__btns', e.target)
}

const toggleSaveAnime = () => {
    animeStore.toggleSaveAnime(animeData.value, animeId)
}
</script>

<template>
    <section class="anime-card" @click="showAnimeDetails">
        <AppImage :src="animeData.image" class="card-img" />

        <section class="anime-card__description">
            <p>{{ animeData.title }}</p>
            <div class="anime-card__btns">
                <AppIcon
                    :icon="currentSaveAnimeIcon"
                    class="anime-card__icon"
                    @click="toggleSaveAnime"
                />
            </div>
        </section>
    </section>
</template>

<style lang="scss" scoped>
.anime-card {
    display: grid;
    gap: $g-lg;
    grid-template-rows: minmax(min(20rem, 100%), 35rem) 1fr;

    padding: $p-sm $p-sm calc($p-lg * 2);
    border: $b-2-prim;
    border-radius: $br-08;
    box-shadow: 6px 6px 10px 1px hsl(0, 0%, 0%, 1);

    cursor: pointer;
    transition: $tr-03;

    &:hover {
        transform: scale(1.02);
        box-shadow: 12px 12px 20px 1px hsl(0, 0%, 0%, 1);
    }
}

.card-img {
    border-radius: $br-08;
    overflow: hidden;
}

.anime-card__description {
    display: grid;
    grid-template-columns: 1fr 3.2rem;
    justify-content: space-between;
    align-items: center;
}

.anime-card__btns {
    width: 2.5rem;
    height: 2.5rem;
}

.anime-card__icon {
    width: 100%;
    height: 100%;
    transition: $tr-03;

    &:hover {
        color: $color-primary-light;
    }
}
</style>
