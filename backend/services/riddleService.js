import { getSimilars } from "./movieService.js";
import { getPopularMovies } from "./movieService.js";
import { getResizedImage } from "./imageService.js";
import { getEncryptedText, assertEncryptedText } from "./cryptoService.js";

const IMAGE_SIZE = 500;
const PAGE_SIZE_LOOK_UP = 500;
const OPTIONS_SIZE = 8;

export const getNewRiddle = async () => {
    const { movie, relatedMovies } = await getMovieToRiddle();
    let relatedMoviesOptions = [];
    relatedMovies.forEach(relatedMovie => relatedMoviesOptions.push(relatedMovie.original_title));
    relatedMoviesOptions = shuffleSlice(relatedMoviesOptions, OPTIONS_SIZE - 1);
    relatedMoviesOptions.push(movie.title);
    return {
        riddle: getEncryptedText(movie.original_title),
        image: getResizedImage(movie.backdrop_path, IMAGE_SIZE),
        options: shuffle(relatedMoviesOptions),
    }
}

export const checkOption = (riddle, option) => {
    return assertEncryptedText(option, riddle);
}

const getMovieToRiddle = async () => {
    const popularMovies = (await getPopularMovies(getRandomPageNumber(PAGE_SIZE_LOOK_UP))).results;
    const randomMovie = getRandom(popularMovies);
    const relatedMovies = (await getSimilars(randomMovie.id)).results;
    if (relatedMovies.length > OPTIONS_SIZE)
        return {
            movie: randomMovie,
            relatedMovies: relatedMovies,
        }
    return await getMovieToRiddle();
}

const getFirst = (array) => {
    return array[0];
};

const getRandomPageNumber = (pageSize) => {
    return Math.floor(Math.random() * pageSize + 1);
}

const getRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

const shuffleSlice = (array, size) => {
    return array.sort(() => Math.random() - 0.5).slice(0, size);
}
