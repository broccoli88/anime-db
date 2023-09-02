<script setup>
import TheNavbarSearch from './TheNavbarSearch.vue'
import AppImage from '../components/AppImage.vue'
import { ref } from 'vue'

const menuOpenSrc = '/images/menu-open.svg'
const menuCloseSrc = '/images/menu-close.svg'
const isMenuOpen = ref(false)

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
                        <p class="nav__genres">Genres</p>
                        <nav class="genres__nav">
                            <li class="genres__item" v-for="genre in genres" :key="genre">
                                <router-link to="#" class="genres__link">{{ genre }}</router-link>
                            </li>
                        </nav>
                    </li>
                </ul>

                <TheNavbarSearch />
            </nav>
            <!-- <TheNavbarSearch /> -->
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
    padding-block: 1.5rem;
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
    transition: 0.5s all ease-out;

    .nav__list {
        display: grid;
        gap: 0.7rem;
        margin-bottom: 1rem;
    }

    .nav__link,
    .nav__genres {
        color: $fc-txt;
        font-size: $fs-txt-desktop;
    }
    .nav__genres {
        margin-bottom: 0.5rem;
    }

    .genres__link {
        color: $fc-txt;
    }

    .nav__link:hover,
    .nav__link:focus,
    .nav__genres:hover,
    .nav__genres:focus,
    .genres__link:hover,
    .genres__link:focus {
        color: $color-txt-hover;
        transition: 0.3s color ease-out;
    }

    .genres__nav {
        display: grid;
        gap: 0.3rem;
    }
}

.navbar-visible {
    transform: translateX(0);
}
</style>
