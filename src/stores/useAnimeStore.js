import { defineStore } from 'pinia'
import { useFetch } from '../api/useFetch'
import { useFetchByGenre } from '../api/useFetchByGenre'
import { useRouter, useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'

export const useAnimeStore = defineStore('animeStore', () => {
    const router = useRouter(),
        route = useRoute()

    const animeList = ref([]),
        genresList = ref([]),
        animeByGenreList = ref([]),
        listByTitle = ref([]),
        savedAnimeList = ref([]),
        selectedAnime = ref(null),
        searchedPhrase = ref(null),
        isDesktopView = ref(false),
        isSearchedByTitle = ref(false)

    const currentList = computed(() => !isSearchedByTitle.value ? animeList.value : listByTitle.value)



    const clearSearchInput = () => {
        searchedPhrase.value = null
        isSearchedByTitle.value = false
        listByTitle.value = []
        currentPage.value = 1
    }


    const showAnimeDetails = (animeId, classToAvoid, target) => {
        const clickedEl = target

        if (!clickedEl.closest(classToAvoid)) {
            router.push({ name: 'details', params: { id: animeId } })
        }
    }

    const removeSavedAnime = (animeId) => {
        savedAnimeList.value = savedAnimeList.value.filter((anime) => anime._id !== animeId)
    }

    const toggleSaveAnime = (animeData, animeId) => {
        animeData.isSaved = !animeData.isSaved

        if (animeData.isSaved) savedAnimeList.value.push(animeData)
        else removeSavedAnime(animeId)
    }


    // PAGINATION


    const currentPage = ref(1)
    const currentGenre = ref(null)

    const displayedPageNumbers = computed(() => {
        const selectedPage = currentPage.value
        const rangeStart = Math.max(1, selectedPage - 2)
        const rangeEnd = selectedPage + 2
        return Array.from({ length: rangeEnd - rangeStart + 1 }, (_, index) => rangeStart + index)
    })

    const goToPage = (page) => (currentPage.value = page)


    watch(currentPage, async () => {
        if (route.name === 'home') animeList.value = await useFetch(currentPage.value)
        if (route.name === 'genre') animeByGenreList.value = await useFetchByGenre(currentGenre.value, currentPage.value)
    })

    return {
        animeList,
        genresList,
        savedAnimeList,
        animeByGenreList,
        currentList,
        selectedAnime,
        searchedPhrase,
        isDesktopView,
        listByTitle,
        isSearchedByTitle,
        displayedPageNumbers,
        currentPage,
        currentGenre,
        clearSearchInput,
        showAnimeDetails,
        toggleSaveAnime,
        goToPage

    }
})