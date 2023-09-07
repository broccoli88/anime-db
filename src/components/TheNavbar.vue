<script setup>
import TheNavbarSearch from './TheNavbarSearch.vue'
import { useAnimeStore } from '../stores/useAnimeStore'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

const animeStore = useAnimeStore(),
    { isDesktopView, genresList, currentPage } = storeToRefs(animeStore),
    router = useRouter()

const isMenuOpen = ref(false)
const isGenreMenuOpen = ref(false)

watch(isDesktopView, () => {
    if (isDesktopView.value) isMenuOpen.value = false
    if (!isDesktopView.value) isGenreMenuOpen.value = false
})

watch(isMenuOpen, () => {
    const bodyStyle = document.body.style

    isMenuOpen.value ? (bodyStyle.overflow = 'hidden') : (bodyStyle.overflow = 'initial')
})

const toggleNavbar = () => (isMenuOpen.value = !isMenuOpen.value)

const toggleGenreNav = () => {
    if (isDesktopView.value) isGenreMenuOpen.value = !isGenreMenuOpen.value
}

const displayAnimeGenreList = (genre) => {
    currentPage.value = 1
    isMenuOpen.value = false
    isGenreMenuOpen.value = false
    router.push({ name: 'genre', params: { genre: genre, page: currentPage.value } })
}
</script>

<template>
    <header class="nav-container">
        <div class="nav">
            <router-link :to="{ name: 'home' }" class="brand"> AnimeDB </router-link>

            <section class="nav__menu-btn" @click="toggleNavbar">
                <AppIcon icon="solar:close-square-broken" v-if="isMenuOpen" />
                <AppIcon icon="solar:menu-dots-square-broken" v-else />
            </section>

            <nav class="nav__navigation" :class="{ 'navbar-visible': isMenuOpen }">
                <ul class="nav__list">
                    <li>
                        <router-link :to="{ name: 'home' }" class="nav__link"> Home </router-link>
                    </li>
                    <li>
                        <router-link class="nav__link" :to="{ name: 'user-list' }"
                            >Saved Anime
                        </router-link>
                    </li>
                    <li>
                        <section
                            :to="{ name: 'genre' }"
                            class="nav__genres"
                            @click="toggleGenreNav"
                        >
                            <p class="nav__genres-heading">Genres</p>
                            <AppIcon
                                icon="solar:square-arrow-down-broken"
                                class="genres__icon"
                                :class="{ active: isGenreMenuOpen }"
                            />
                        </section>
                        <nav class="genres__nav" :class="{ 'genres-visible': isGenreMenuOpen }">
                            <ul class="genres__nav-list">
                                <li
                                    class="genres__item"
                                    v-for="genre in genresList"
                                    :key="genre._id"
                                    @click="displayAnimeGenreList(genre._id)"
                                >
                                    <button class="genres__link">{{ genre._id }}</button>
                                </li>
                            </ul>
                        </nav>
                    </li>
                </ul>

                <TheNavbarSearch class="nav__search" />
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.nav-container {
    position: relative;
    box-shadow: 0 0 15px 1px hsl(0, 0%, 0%, 0.3);
}

.nav {
    @include container;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: $p-md;

    @include breakpoint {
        display: grid;
        grid-template-columns: min-content 1fr;
    }
}

.brand {
    font-size: $fs-h2-mobile;
    font-weight: $fw-500;
    color: $color-white;
    line-height: 1;
}

.nav__menu-btn {
    width: 2.6rem;
    display: flex;
    align-items: center;
    cursor: pointer;

    @include breakpoint {
        display: none;
    }

    & > * {
        width: 100%;
        height: 100%;
        transition: $tr-03;

        &:hover {
            color: $color-primary-light;
        }
    }
}

.nav__navigation {
    display: grid;
    align-items: center;
    gap: 0.7rem;
    padding-inline: 3rem;
    padding-block: 2rem 4rem;

    position: absolute;
    top: 100%;
    right: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;

    background-color: $color-bg;
    box-shadow: 0 15px 15px 1px hsl(0, 0%, 0%, 0.3);

    transform: translateX(100vw);
    transition: $tr-05;

    @include breakpoint {
        justify-self: end;
        box-shadow: none;
        padding: 0;
        position: static;
        top: 0;
        width: 100%;
        height: max-content;
        transform: none;

        gap: 2rem;
        grid-template-columns: 1fr minmax(20rem, 30rem);
    }

    .nav__list {
        display: grid;
        gap: 1rem;
        margin-bottom: 1rem;

        @include breakpoint {
            width: max-content;
            margin-bottom: 0;
            display: flex;
            gap: 4rem;
            justify-self: center;
            align-items: center;
        }
    }

    .nav__genres {
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;

        .genres__icon {
            transition: $tr-03;
        }
    }

    .nav__link,
    .nav__genres-heading {
        font-size: $fs-txt-desktop;
        transition: $tr-03;
    }

    .genres__link {
        border: none;
        background: none;
        color: $fc-txt;
        cursor: pointer;
    }

    .nav__link:hover,
    .nav__link:focus,
    .genres__link:hover,
    .genres__link:focus {
        color: $color-txt-hover;
    }

    .nav__genres:hover,
    .nav__genres:focus {
        .nav__genres-heading,
        .genres__icon {
            color: $color-txt-hover;
        }
    }
    .genres__nav {
        margin-top: 3rem;

        @include breakpoint {
            margin-top: 0;
            display: grid;
            grid-template-rows: 0fr;

            position: absolute;
            width: 100%;
            left: 0;
            top: 100%;
            z-index: 99;

            background-color: $color-bg;
            box-shadow: 0 7.5px 7.5px 1px hsl(0, 0%, 0%, 0.3);

            transition: $tr-03;
        }

        .genres__nav-list {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            overflow: hidden;

            @include breakpoint {
                @include container;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                justify-content: space-between;
                row-gap: 1rem;
                font-size: $fs-txt-mobile;
            }
        }
    }
    .genres-visible {
        grid-template-rows: 1fr;
        padding-block: 3rem;
    }
}

.navbar-visible {
    transform: translateX(0);
}

.active {
    transform: rotate(-180deg);
}
</style>
