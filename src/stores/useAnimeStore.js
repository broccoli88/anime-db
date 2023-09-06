import { defineStore } from 'pinia'
import { useFetch } from '../api/useFetch'
import { useFetchByGenre } from '../api/useFetchByGenre'
import { useFetchByTitle } from '../api/useFetchByTitle'
import { useRouter } from 'vue-router'
import { ref } from 'vue'


export const useAnimeStore = defineStore('animeStore', () => {
    const router = useRouter()

    const animeList = ref([]),
        genresList = ref([]),
        animeByGenreList = ref([]),
        savedAnimeList = ref([]),
        animeListByTitle = ref([]),
        metaData = ref(null),
        selectedAnime = ref(null),
        searchedPhrase = ref(null),
        isDesktopView = ref(false),
        isSearchedByTitle = ref(false),
        currentPage = ref(1)


    const clearSearchInput = () => {
        searchedPhrase.value = null
        isSearchedByTitle.value = false
        animeListByTitle.value = []
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

    const fetchFullAnimeList = async () => {
        animeList.value = []

        const { data, meta } = await useFetch(currentPage.value)

        animeList.value = data
        metaData.value = meta
    }

    const fetchAnimeByGenre = async (genre = 'Fantasy', page) => {
        animeList.value = []

        const { data, meta } = await useFetchByGenre(genre, page)

        animeList.value = data
        metaData.value = meta
    }

    const fetchAnimeByTitle = async (page = 1, size = 12) => {
        animeList.value = []

        const { data, meta } = await useFetchByTitle(searchedPhrase.value, page, size)

        animeList.value = data
        metaData.value = meta
    }




    return {
        animeList,
        metaData,
        genresList,
        savedAnimeList,
        animeByGenreList,
        selectedAnime,
        searchedPhrase,
        isDesktopView,
        animeListByTitle,
        isSearchedByTitle,
        currentPage,
        fetchFullAnimeList,
        fetchAnimeByGenre,
        fetchAnimeByTitle,
        clearSearchInput,
        showAnimeDetails,
        toggleSaveAnime,


    }
})