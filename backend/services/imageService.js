const imageStorageUrl = 'https://image.tmdb.org/t/p/';

export const getOriginalImage = (relativePath) => {
    return `${imageStorageUrl}original${relativePath}`;
};

export const getResizedImage = (relativePath, desiredSize) => {
    return `${imageStorageUrl}w${desiredSize}${relativePath}`;
};