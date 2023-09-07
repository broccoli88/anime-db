import { ref } from "vue";

export const useFetch = async (page) => {

    const result = ref(null)
    const api_key = import.meta.env.VITE_API_KEY

    const url = `https://anime-db.p.rapidapi.com/anime?page=${page}&size=12&sortBy=ranking&sortOrder=asc`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': api_key,
            'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            result.value = await response.json();

            const { data, meta } = result.value

            return { data, meta }
        }
    } catch (error) {
        console.error(error);
    }
}