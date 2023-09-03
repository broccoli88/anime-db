import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimeStore = defineStore('animeStore', () => {

    const animeList = ref([]),
        genresList = ref([]),
        selectedAnime = ref(),
        isDesktopView = ref(false)




    return { animeList, genresList, selectedAnime, isDesktopView }
})