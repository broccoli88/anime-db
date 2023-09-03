<script setup>
import AppImage from './AppImage.vue'
import { useFetchByTitle } from '../api/useFetchByTitle'
import { useAnimeStore } from '../stores/useAnimeStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const animeStore = useAnimeStore(),
    { searchedPhrase, listByTitle, isSearchedByTitle } = storeToRefs(animeStore)

const searchIconSrc = '/images/search.svg',
    clearIconSrc = '/images/menu-close.svg'
const isInputFocused = ref(false)

const showOutline = () => (isInputFocused.value = true)
const hideOutline = () => (isInputFocused.value = false)

const submitSearch = async () => {
    listByTitle.value = await useFetchByTitle(searchedPhrase.value)
    isSearchedByTitle.value = true
}
</script>

<template>
    <form
        class="nav__search-form"
        :class="{ 'show-outline': isInputFocused }"
        @submit.prevent="submitSearch"
    >
        <button class="nav__search__btn" type="submit">
            <AppImage :src="searchIconSrc" class="nav__search-icon" />
        </button>
        <input
            type="text"
            placeholder="Search..."
            id="search"
            v-model="searchedPhrase"
            @focusin="showOutline"
            @focusout="hideOutline"
            class="nav-search__input"
        />

        <button
            class="nav__search-clear-btn"
            @click="animeStore.clearSearchInput"
            v-if="searchedPhrase"
        >
            <AppImage :src="clearIconSrc" />
        </button>
    </form>
</template>

<style lang="scss" scoped>
.nav__search-form {
    max-width: 30rem;
    display: flex;
    background-color: $color-bg-light;
    box-shadow: 0 0 10px hsl(0, 0%, 0%, 0.2);
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}

.show-outline {
    outline: 2px solid $color-outline;
}

.nav-search__input {
    width: 100%;
    padding: 0.7em 1em;
    border: none;
    color: $fc-txt;
    background: none;
    outline: none;
}

.nav__search__btn {
    border: none;
    background-color: $color-primary;

    padding-inline: 1em;

    .nav__search-icon {
        width: 2rem;
    }
}

.nav__search-clear-btn {
    border: none;
    background: none;
    position: absolute;
    top: 50%;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    z-index: 9;
    cursor: pointer;

    transform: translateY(-50%);
}
</style>
