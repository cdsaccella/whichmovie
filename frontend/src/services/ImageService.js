const PIXEL_FACTOR = 4;
const COLOR_FACTOR = 24;

export const getPixelatedImage = (imageUrl) => {
    return `${process.env.REACT_APP_FUNCTION_URL}/pixelator?color=${COLOR_FACTOR}&pixel=${PIXEL_FACTOR}&url=${imageUrl}`;
}