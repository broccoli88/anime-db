<script setup>
import { ref } from 'vue'
import AppImage from './AppImage.vue'

const searchIconSrc = '/images/search.svg'
const isInputFocused = ref(false)

const showOutline = () => (isInputFocused.value = true)
const hideOutline = () => (isInputFocused.value = false)
</script>

<template>
    <form class="nav__search-form" :class="{ 'show-outline': isInputFocused }">
        <input
            type="text"
            placeholder="Search..."
            id="search"
            @focusin="showOutline"
            @focusout="hideOutline"
            class="nav-search__input"
        />
        <button class="nav__search__btn">
            <AppImage :src="searchIconSrc" />
        </button>
    </form>
</template>

<style lang="scss" scoped>
.nav__search-form {
    display: flex;
    background-color: $color-bg-light;
    box-shadow: 0 0 10px hsl(0, 0%, 0%, 0.2);
    border-radius: 5px;
    overflow: hidden;
}

.show-outline {
    outline: 2px solid $color-outline;
}

.nav-search__input {
    flex: 1;
    padding: 0.4em 0.5em;
    border: none;

    background: none;
    outline: none;
}

.nav__search__btn {
    border: none;
    background-color: $color-primary;

    padding-inline: 0.5rem;
}
</style>
