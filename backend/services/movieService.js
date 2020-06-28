const moviesApiUrl = 'https://api.themoviedb.org/3/';
const apiKeyParam = 'api_key=74bdb07887921e662b11335e580869ba';

export const getRandomMovie = (movies) => {
    return movies.results[Math.floor(Math.random() * movies.results.length)];
};

export const getPopularMovies = async (pageNumber = 1) => {
    const apiResponse = await fetch(`${moviesApiUrl}movie/popular?${apiKeyParam}&page=${pageNumber}`);
    return await apiResponse.json();
}

export const getRecommendations = async (id) => {
    const apiResponse = await fetch(`${moviesApiUrl}movie/${id}/recommendations?${apiKeyParam}`);
    return await apiResponse.json();
}

export const getSimilars = async (id) => {
    const apiResponse = await fetch(`${moviesApiUrl}movie/${id}/similar?${apiKeyParam}`);
    return await apiResponse.json();
}
