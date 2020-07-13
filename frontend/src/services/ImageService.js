export const PIXEL_FACTOR = 3;
export const COLOR_FACTOR = 16;

export const getPixelatedImage = (imageUrl) => `${process.env.REACT_APP_FUNCTION_URL}/pixelator?color=${COLOR_FACTOR}&pixel=${PIXEL_FACTOR}&url=${imageUrl}`;
