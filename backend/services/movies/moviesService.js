export const getRandomMovie = (movies) => {
    return movies.results[Math.floor(Math.random() * movies.results.length)];
};