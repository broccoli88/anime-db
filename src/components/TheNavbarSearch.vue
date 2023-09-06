<script setup>
import { useAnimeStore } from '../stores/useAnimeStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const animeStore = useAnimeStore(),
    { searchedPhrase, isSearchedByTitle } = storeToRefs(animeStore)

const isInputFocused = ref(false)

const showOutline = () => (isInputFocused.value = true)
const hideOutline = () => (isInputFocused.value = false)

const submitSearch = async () => {
    await animeStore.fetchAnimeByTitle()
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
            <AppIcon icon="heroicons:magnifying-glass" class="nav__search-icon" />
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
            <AppIcon icon="solar:close-square-broken" class="nav__search-clear-btn" />
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
    display: flex;
    align-items: center;
    padding-inline: 1em;

    .nav__search-icon {
        width: 2rem;
        height: 2rem;
        color: $fc-txt;
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
    color: $color-white;

    transform: translateY(-50%);
    transition: $tr-03;

    &:hover,
    &:focus {
        color: $color-primary-light;
    }
}
</style>
