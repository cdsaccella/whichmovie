import { getSimilars } from "./movieService.js";
import { getPopularMovies } from "./movieService.js";
import { getResizedImage } from "./imageService.js";
import { getEncryptedText, assertEncryptedText } from "./cryptoService.js";

const IMAGE_SIZE = 500;
const PAGE_SIZE_LOOK_UP = 100;
const OPTIONS_SIZE = 6;

export const getNewRiddle = async (language) => {
    const { movie, relatedMovies } = await getMovieToRiddle(language);
    let relatedMoviesOptions = [];
    relatedMovies.forEach(relatedMovie => relatedMoviesOptions.push(relatedMovie.title));
    relatedMoviesOptions = shuffleSlice(relatedMoviesOptions, OPTIONS_SIZE - 1);
    relatedMoviesOptions.push(movie.title);
    return {
        riddle: getEncryptedText(movie.title),
        image: getResizedImage(movie.backdrop_path, IMAGE_SIZE),
        options: shuffle(relatedMoviesOptions),
    }
}

export const checkOption = (riddle, option) => {
    return assertEncryptedText(option, riddle);
}

const getMovieToRiddle = async (language) => {
    const popularMovies = (await getPopularMovies(getRandomPageNumber(PAGE_SIZE_LOOK_UP), language)).results;
    const randomMovie = getRandomMovieWithImage(popularMovies);
    const relatedMovies = (await getSimilars(randomMovie.id, language)).results;
    if (relatedMovies.length > OPTIONS_SIZE)
        return {
            movie: randomMovie,
            relatedMovies: relatedMovies,
        }
    return await getMovieToRiddle(language);
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

const getRandomMovieWithImage = (array, attemps = 3) => {
    let currentAttempt = 0;
    let movie = getRandom(array);
    while (currentAttempt++ < attemps && !movie.backdrop_path)
        movie = getRandom(array);
    return movie;
};

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const shuffleSlice = (array, size) => {
    return array.sort(() => Math.random() - 0.5).slice(0, size);
};
