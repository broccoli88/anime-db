export const useFetch = async (page = 1, size = 10) => {

    const api_key = import.meta.env.VITE_API_KEY

    const url = `https://anime-db.p.rapidapi.com/anime?page=${page}&size=${size}&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc`;

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
            const result = await response.json();
            return result
        }
    } catch (error) {
        console.error(error);
    }
}