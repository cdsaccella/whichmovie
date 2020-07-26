import { getSimilars } from "./movieService.js";
import { getPopularMovies } from "./movieService.js";
import { getResizedImage } from "./imageService.js";
import { getEncryptedText, assertEncryptedText } from "./cryptoService.js";

const IMAGE_SIZE = 500;

const DEFAULT_MODE = 'normal';
const MODES = {
  easy: {
    pageSizeLookUp: 50,
    optionsSize: 4,
  },
  normal: {
    pageSizeLookUp: 100,
    optionsSize: 6,
  },
  hard: {
    pageSizeLookUp: 200,
    optionsSize: 8,
  }
}

export const getNewRiddle = async (language, modeKey) => {
  const mode = modeKey in MODES ? MODES[modeKey] : MODES[DEFAULT_MODE];
  const { movie, relatedMovies } = await getMovieToRiddle(language, mode);
  let relatedMoviesOptions = [];
  relatedMovies.forEach(relatedMovie => relatedMoviesOptions.push(relatedMovie.title));
  relatedMoviesOptions = shuffleSlice(relatedMoviesOptions, mode.optionsSize - 1);
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

const getMovieToRiddle = async (language, mode) => {
  const popularMovies = (await getPopularMovies(getRandomPageNumber(mode.pageSizeLookUp, language))).results;
  const randomMovie = getRandomMovieWithImage(popularMovies);
  const relatedMovies = (await getSimilars(randomMovie.id, language)).results;
  if (relatedMovies.length > mode.optionsSize)
    return {
      movie: randomMovie,
      relatedMovies: relatedMovies,
    }
  return await getMovieToRiddle(language, mode);
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
