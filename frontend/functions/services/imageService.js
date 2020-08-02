const imageStorageUrl = 'https://image.tmdb.org/t/p/';

exports.getOriginalImage = (relativePath) => {
  return `${imageStorageUrl}original${relativePath}`;
};

exports.getResizedImage = (relativePath, desiredSize) => {
  return `${imageStorageUrl}w${desiredSize}${relativePath}`;
};