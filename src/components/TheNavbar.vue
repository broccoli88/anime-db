<script setup>
import TheNavbarSearch from './TheNavbarSearch.vue'
import AppImage from '../components/AppImage.vue'
import { useAnimeStore } from '../stores/useAnimeStore'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

const animeStore = useAnimeStore()
const { isDesktopView } = storeToRefs(animeStore)

const menuOpenSrc = '/images/menu-open.svg'
const menuCloseSrc = '/images/menu-close.svg'
const isMenuOpen = ref(false)
const isGenreMenuOpen = ref(false)

watch(isDesktopView, () => {
    if (isDesktopView.value) isMenuOpen.value = false
    if (!isDesktopView.value) isGenreMenuOpen.value = false
})

const genres = ref([
    'Award Winning',
    'Action',
    'Suspense',
    'Horror',
    'Ecchi',
    'Avant Garde',
    'Sports',
    'Supernatural',
    'Fantasy',
    'Gourmet',
    'Boys Love',
    'Drama',
    'Comedy',
    'Mystery',
    'Girls Love',
    'Slice of Life',
    'Adventure',
    'Romance',
    'Sci-Fi',
    'Erotica',
    'Hentai'
])

const toggleNavbar = () => (isMenuOpen.value = !isMenuOpen.value)

const toggleGenreNav = () => {
    if (isDesktopView.value) isGenreMenuOpen.value = !isGenreMenuOpen.value
}
</script>

<template>
    <header class="nav-container">
        <div class="nav">
            <router-link :to="{ name: 'home' }" class="brand"> AnimeDB </router-link>

            <section class="nav__menu-btn" @click="toggleNavbar">
                <AppImage :src="menuCloseSrc" v-if="isMenuOpen" />
                <AppImage :src="menuOpenSrc" v-else />
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
                        <div class="nav__genres" @click="toggleGenreNav">
                            <p class="nav__genres-heading">Genres</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    class="genres__icon-path"
                                    fill="white"
                                    d="m12 17l-5-5h3V8h4v4h3l-5 5m0-15a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8Z"
                                />
                            </svg>
                        </div>
                        <nav class="genres__nav" :class="{ 'genres-visible': isGenreMenuOpen }">
                            <ul class="genres__nav-list">
                                <li class="genres__item" v-for="genre in genres" :key="genre">
                                    <router-link to="#" class="genres__link">{{
                                        genre
                                    }}</router-link>
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
    width: 70vw;
    height: max-content;
    z-index: 999;

    background-color: $color-bg;
    box-shadow: 0 15px 15px 1px hsl(0, 0%, 0%, 0.3);

    transform: translateX(75vw);
    transition: $tr-05;

    @include breakpoint {
        justify-self: end;
        box-shadow: none;
        padding: 0;
        position: static;
        top: 0;
        transform: none;

        gap: 2rem;
        grid-template-columns: 1fr minmax(20rem, 30rem);
    }

    .nav__list {
        display: grid;
        gap: 0.7rem;
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

        .genres__icon-path {
            transition: $tr-03;
        }
    }

    .nav__link,
    .nav__genres-heading {
        color: $fc-txt;
        font-size: $fs-txt-desktop;
        transition: $tr-03;
    }

    .genres__link {
        color: $fc-txt;
    }

    .nav__link:hover,
    .nav__link:focus,
    .genres__link:hover,
    .genres__link:focus {
        color: $color-txt-hover;
    }

    .nav__genres:hover,
    .nav__genres:focus {
        .nav__genres-heading {
            color: $color-txt-hover;
        }

        .genres__icon-path {
            fill: $color-txt-hover;
        }
    }
    .genres__nav {
        margin-top: 1rem;
        @include breakpoint {
            margin-top: 0;
            display: grid;
            grid-template-rows: 0fr;

            position: absolute;
            width: 100%;
            left: 0;
            top: 100%;
            z-index: 999;

            background-color: $color-bg;
            box-shadow: 0 7.5px 7.5px 1px hsl(0, 0%, 0%, 0.3);

            transition: $tr-03;
        }

        .genres__nav-list {
            display: grid;
            gap: 0.3rem;
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
</style>
