import { getSimilars } from "./movieService.js";
import { getPopularMovies } from "./movieService.js";
import { getResizedImage } from "./imageService.js";

const IMAGE_SIZE = 500;
const OPTIONS_SIZE = 8;

export const getNewRiddle = async () => {
    const popularMovies = (await getPopularMovies()).results;
    const randomMovie = getRandom(popularMovies);
    const idRandomMovie = randomMovie.id;
    const relatedMovies = (await getSimilars(idRandomMovie)).results;
    let relatedMoviesOptions = [];
    relatedMovies.forEach(movie => relatedMoviesOptions.push(movie.original_title));
    relatedMoviesOptions = shuffleSlice(relatedMoviesOptions, OPTIONS_SIZE - 1);
    relatedMoviesOptions.push(randomMovie.title);;
    return {
        image: getResizedImage(randomMovie.backdrop_path, IMAGE_SIZE),
        options: shuffle(relatedMoviesOptions),
    }
}

export const getFirst = (array) => {
    return array[0];
};

export const getRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

export const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

export const shuffleSlice = (array, size) => {
    return array.sort(() => Math.random() - 0.5).slice(0, size);
}
