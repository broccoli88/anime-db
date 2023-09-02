import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimeStore = defineStore('animeStore', () => {

    const animeList = ref([])
    const genresList = ref([])
    const selectedAnime = ref()

    return { animeList, genresList, selectedAnime }
})