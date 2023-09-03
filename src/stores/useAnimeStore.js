import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAnimeStore = defineStore('animeStore', () => {

    const animeList = ref([]),
        genresList = ref([]),
        listByTitle = ref([]),
        selectedAnime = ref(null),
        searchedPhrase = ref(null),
        isDesktopView = ref(false),
        isSearchedByTitle = ref(false)

    const currentList = computed(() => !isSearchedByTitle.value ? animeList.value : listByTitle.value)

    const clearSearchInput = () => {
        searchedPhrase.value = null
        isSearchedByTitle.value = false
        listByTitle.value = []
    }



    return {
        animeList,
        genresList,
        selectedAnime,
        searchedPhrase,
        isDesktopView,
        listByTitle,
        isSearchedByTitle,
        currentList,
        clearSearchInput
    }
})