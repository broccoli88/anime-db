<script setup>
import AppImage from './AppImage.vue'
import { useFetchByTitle } from '../api/useFetchByTitle'
import { storeToRefs } from 'pinia'
import { useAnimeStore } from '../stores/useAnimeStore'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const animeStore = useAnimeStore(),
    { searchedPhrase, isInputFocused } = storeToRefs(animeStore),
    router = useRouter()

const searchResults = ref([])
let debounceTimer = null

const debounce = (func, delay) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(func, delay)
}

const getSearchResults = async () => {
    if (!searchedPhrase.value) return
    const { data, meta } = await useFetchByTitle(searchedPhrase.value, 1, 6)
    searchResults.value = []
    searchResults.value = data
}

watch(
    () => searchedPhrase.value,
    () => {
        if (!searchedPhrase.value) {
            searchResults.value = []
        }
        debounce(async () => await getSearchResults(), 500)
    }
)

watch(isInputFocused, () => {
    if (isInputFocused.value && searchedPhrase.value)
        debounce(async () => await getSearchResults(), 100)
})

const showDetails = (animeId) => {
    router.push({ name: 'details', params: { id: animeId } })
}
</script>

<template>
    <section class="search-results">
        <div
            class="serach-result__list-container"
            :class="{ 'show-results': searchResults.length > 0 }"
        >
            <ul class="serach-result__list">
                <li
                    v-for="result in searchResults"
                    :key="result._id"
                    class="search-results__item"
                    @click="showDetails(result._id)"
                >
                    <AppImage :src="result.image" class="search-results__image" />
                    <p>{{ result.title }}</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.search-results {
    position: absolute;
    top: 105%;
    left: 0;
    width: 100%;
    height: max-content;
    z-index: 98;
    background-color: $color-bg;
}

.serach-result__list-container {
    display: grid;
    grid-template-rows: 0fr;
    transition: $tr-03;
}

.show-results {
    grid-template-rows: 1fr;
}
.serach-result__list {
    display: grid;

    gap: $g-sm;
    overflow: hidden;

    &:first-child {
        padding-top: 2rem;
    }

    &:last-child {
        padding-bottom: 2rem;
    }
}

.search-results__item {
    display: grid;
    grid-template-columns: 5rem 1fr;
    align-items: center;
    height: max-content;
    padding: calc($p-sm);
    gap: calc($g-sm / 2);
    cursor: pointer;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 80%;
        height: 2px;
        z-index: 9;

        background-color: $color-primary;
        filter: opacity(0.3);

        transform: translateX(-50%);
    }

    &:last-of-type::before {
        content: none;
    }
}

.search-results__image {
    width: 100%;
}
</style>
