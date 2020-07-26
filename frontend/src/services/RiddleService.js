import { getPixelatedImage } from './ImageService';

export const NO_RIDDLE = {
  id: String.empty,
  image: String.empty,
  options: [],
};

export const getNewRiddle = async (language = 'en-US', difficulty = 'normal') => {
  const params = {
    lang: language,
    mode: difficulty,
  }
  const result = await fetch(`${process.env.REACT_APP_API_URL}/riddles?${paramsToString(params)}`);
  const jsonResult = await result.json();
  return {
    id: jsonResult.data.riddle,
    image: getPixelatedImage(jsonResult.data.image),
    options: jsonResult.data.options,
  };
};

export const assertRiddle = async (riddle, option) => {
  const data = {
    riddle,
    option,
  };
  const result = await fetch(`${process.env.REACT_APP_API_URL}/riddles`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const jsonResult = await result.json();
  return jsonResult.data.result;
};

const paramsToString = (params) => new URLSearchParams(params).toString()
