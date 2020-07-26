const moviesApiUrl = 'https://api.themoviedb.org/3/';
const apiKey = '74bdb07887921e662b11335e580869ba';
const baseParams = (lang) => {
  return {
    api_key: apiKey,
    language: lang,
  };
}
const DEFAULT_LANGUAGE = 'en-US';

export const getRandomMovie = (movies) => {
  return movies.results[Math.floor(Math.random() * movies.results.length)];
};

export const getPopularMovies = async (pageNumber = 1, language = DEFAULT_LANGUAGE) => {
  const stringParams = paramsToString({ ...baseParams(language), page: pageNumber });
  const apiResponse = await fetch(`${moviesApiUrl}movie/popular?${stringParams}`);
  return await apiResponse.json();
}

export const getRecommendations = async (id, language = DEFAULT_LANGUAGE) => {
  const stringParams = paramsToString(baseParams(language));
  const apiResponse = await fetch(`${moviesApiUrl}movie/${id}/recommendations?${stringParams}`);
  return await apiResponse.json();
}

export const getSimilars = async (id, language = DEFAULT_LANGUAGE) => {
  const stringParams = paramsToString(baseParams(language));
  const apiResponse = await fetch(`${moviesApiUrl}movie/${id}/similar?${stringParams}`);
  return await apiResponse.json();
}

const paramsToString = (params) => new URLSearchParams(params).toString();
