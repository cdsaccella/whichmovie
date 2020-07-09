export const NO_RIDDLE = {
  id: String.empty,
  image: String.empty,
  options: [],
};

export const getNewRiddle = async (language = 'en-US') => {
  const result = await fetch(`${process.env.REACT_APP_API_URL}/riddles/${language}`);
  const jsonResult = await result.json();
  return {
    id: jsonResult.data.riddle,
    image: '/.netlify/functions/pixelator?color=32&pixel=4&url=' + jsonResult.data.image,
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
