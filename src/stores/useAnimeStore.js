import { defineStore } from 'pinia'
import { useFetch } from '../api/useFetch'
import { useFetchByGenre } from '../api/useFetchByGenre'
import { useFetchByTitle } from '../api/useFetchByTitle'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'


export const useAnimeStore = defineStore('animeStore', () => {
    const router = useRouter()

    const animeList = ref(null),
        genresList = ref([]),
        animeByGenreList = ref([]),
        savedAnimeList = ref([]),
        metaData = ref(null),
        selectedAnime = ref(null),
        searchedPhrase = ref(null),
        isDesktopView = ref(false),
        currentPage = ref(1),
        isSpinnerVisible = ref(false)


    const checkIfAnimeListRender = computed(() => animeList.value && animeList.value.length > 0)

    const clearSearchInput = () => {
        searchedPhrase.value = null
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
        animeList.value = null

        const { data, meta } = await useFetch(currentPage.value)

        animeList.value = data
        metaData.value = meta
    }

    const fetchAnimeByGenre = async (genre = 'Fantasy', page) => {
        animeList.value = null

        const { data, meta } = await useFetchByGenre(genre, page)

        animeList.value = data
        metaData.value = meta
    }

    const fetchAnimeByTitle = async (query, page) => {
        animeList.value = null

        const { data, meta } = await useFetchByTitle(query, page)

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
        currentPage,
        isSpinnerVisible,
        checkIfAnimeListRender,
        fetchFullAnimeList,
        fetchAnimeByGenre,
        fetchAnimeByTitle,
        clearSearchInput,
        showAnimeDetails,
        toggleSaveAnime,


    }
})