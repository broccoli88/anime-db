<script setup>
import { useFetch } from '../api/useFetch'
import { useAnimeStore } from '../stores/useAnimeStore'
import { storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'

const animeStore = useAnimeStore(),
    { currentPage, displayedPageNumbers } = storeToRefs(animeStore)

const incrementCurrentPage = () => {
    currentPage.value++
}
const decrementCurrentPage = () => {
    if (currentPage.value < 1) return
    currentPage.value--
}

const goToPage = (page) => {
    animeStore.goToPage(page)
}
</script>

<template>
    <section class="pagination">
        <button
            class="pagination__arrows"
            @click="decrementCurrentPage"
            :disabled="currentPage === 1"
        >
            <AppIcon icon="tdesign:chevron-left-double-s" class="pagination__arrows-icon" />
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
        <button class="pagination__arrows" @click="incrementCurrentPage">
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
}

.pagination,
.pagination__page-numbers {
    width: min-content;
    display: flex;
    align-items: center;
}

.pagination__arrows {
    display: flex;
}

.pagination__arrows,
.pagination__page-number {
    border: none;
    background: none;
    padding: 0.5em 1em;
    font-family: $ff-changa;
    cursor: pointer;
    color: $color-white;
}

.pagination__page-number {
    border-left: 1px solid $color-white;
    border-right: 1px solid $color-white;
    border-collapse: collapse;
}

.pagination__arrows-icon {
    width: 1.8rem;
    height: 1.8rem;
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
