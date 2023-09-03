<script setup>
import { ref, toRefs } from 'vue'
import AppImage from './AppImage.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    animeData: Object
})

const { animeData } = toRefs(props)

const router = useRouter()
const cardButtonsRef = ref()

const addIconSrc = '/images/add.svg',
    subtractIconSrc = '/images/subtract.svg'

const showAnimeDetails = (e) => {
    const clickedEl = e.target

    if (!clickedEl.closest('.anime-card__btns')) {
        router.push({ name: 'details', params: { id: animeData.value._id } })
    }
}
</script>

<template>
    <section class="anime-card" @click="showAnimeDetails">
        <AppImage :src="animeData.image" class="card-img" />
        <section class="anime-card__description">
            <p>{{ animeData.title }}</p>
            <div class="anime-card__btns" ref="cardButtonsRef">
                <AppImage :src="addIconSrc" v-if="true" />
                <AppImage :src="subtractIconSrc" v-else />
            </div>
        </section>
    </section>
</template>

<style lang="scss" scoped>
.anime-card {
    display: grid;
    gap: $g-lg;
    // max-width: 35rem;

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
    max-height: 35rem;
    border-radius: $br-08;
    overflow: hidden;
}

.anime-card__description {
    display: grid;
    grid-template-columns: 1fr 3.2rem;
    justify-content: space-between;
}

.anime-card__btns {
    width: 3rem;
    height: 3rem;
}
</style>
