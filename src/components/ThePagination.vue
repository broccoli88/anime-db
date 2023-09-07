<script setup>
import { useAnimeStore } from '../stores/useAnimeStore'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import router from '../router'

const animeStore = useAnimeStore(),
    { currentPage, metaData } = storeToRefs(animeStore),
    route = useRoute()

const totalPages = metaData.value.totalPage

const displayedPageNumbers = computed(() => {
    const selectedPage = currentPage.value

    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, index) => index + 1)
    } else {
        const rangeStart = Math.max(1, selectedPage - 2)
        const rangeEnd = Math.min(totalPages, selectedPage + 2)
        return Array.from({ length: rangeEnd - rangeStart + 1 }, (_, index) => rangeStart + index)
    }
})

const routeToPage = () => {
    if (route.name === 'home') router.push({ name: 'home', params: { page: currentPage.value } })
    if (route.name === 'genre') {
        router.push({
            name: 'genre',
            params: { genre: route.params.genre, page: currentPage.value }
        })
    }
    if (route.name === 'search')
        router.push({
            name: 'search',
            params: { query: route.params.query, page: currentPage.value }
        })
}

const goToPage = (page) => {
    currentPage.value = page
    routeToPage()
}

const incrementCurrentPage = () => {
    if (currentPage.value < totalPages) {
        currentPage.value++
        routeToPage()
    }
}
const decrementCurrentPage = () => {
    if (currentPage.value !== 1) {
        currentPage.value--
        routeToPage()
    }
}

const goToFirstPage = () => {
    if (currentPage.value !== 1) currentPage.value = 1
    routeToPage()
}

const goToLastPage = () => {
    currentPage.value = totalPages
    routeToPage()
}
</script>

<template>
    <section class="pagination">
        <button @click="goToFirstPage" v-if="currentPage > 1" class="pagination__arrows">
            <AppIcon icon="tdesign:chevron-left-double-s" class="pagination__arrows-icon" />
        </button>
        <button
            @click="decrementCurrentPage"
            v-if="currentPage > 1"
            class="pagination__arrows-small"
        >
            <AppIcon icon="tdesign:chevron-left-s" class="pagination__arrows-icon" />
        </button>
        <div class="pagination__page-numbers">
            <button
                class="pagination__page-number"
                v-for="pageNumber in displayedPageNumbers"
                :key="pageNumber"
                @click="goToPage(pageNumber)"
                :class="{ active: pageNumber === currentPage }"
            >
                {{ pageNumber }}
            </button>
        </div>
        <button
            class="pagination__arrows-small"
            @click="incrementCurrentPage"
            v-if="currentPage < totalPages"
        >
            <AppIcon icon="tdesign:chevron-right-s" class="pagination__arrows-icon" />
        </button>
        <button class="pagination__arrows" @click="goToLastPage" v-if="currentPage < totalPages">
            <AppIcon icon="tdesign:chevron-right-double-s" class="pagination__arrows-icon" />
        </button>
    </section>
</template>

<style lang="scss" scoped>
.pagination {
    align-self: end;
    border: 1px solid $color-white;
    margin-inline: auto;
    margin-block: calc($m-lg * 3) calc($m-lg * 2);
    border-radius: $br-08;
    height: min-content;
    overflow: hidden;
}

.pagination,
.pagination__page-numbers {
    width: min-content;
    display: flex;
    align-items: center;
}

.pagination:first-of-type .pagination__arrows-small {
    border-left: 1px solid $color-white;
}

.pagination:last-of-type .pagination__arrows-small {
    border-right: 1px solid $color-white;
}

.pagination__arrows-small,
.pagination__arrows {
    display: flex;
    padding: 0.5em 0.35em;
}

.pagination__arrows-small,
.pagination__arrows,
.pagination__page-number {
    border: none;
    background: none;

    font-family: $ff-changa;
    cursor: pointer;
    color: $color-white;
}

.pagination__page-number {
    border-left: 1px solid $color-white;
    border-right: 1px solid $color-white;
    border-collapse: collapse;
    padding: 0.5em 1em;
}

.pagination__arrows-icon {
    width: 2.5rem;
    height: 2.5rem;
}

.pagination__arrows-icon,
.pagination__page-number {
    transition: $tr-03;
}

.pagination__arrows-icon:hover,
.pagination__arrows-icon:focus,
.pagination__page-number:hover,
.pagination__page-number:focus {
    color: $color-primary-light;
}

.active {
    color: $color-primary-light;
}
</style>
