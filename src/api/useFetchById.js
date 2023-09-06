export const useFetchById = async (id) => {

    const api_key = import.meta.env.VITE_API_KEY
    const url = `https://anime-db.p.rapidapi.com/anime/by-id/${id}`;

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

            console.log('anime by id: ', result)
            return result
        }
    } catch (error) {
        console.error(error);
    }
}