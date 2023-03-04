const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33163433-7381312326b7cb4a7310bb1a7';

export const getImages = (searchQuery, pageNumber) => {
  return fetch(
    `${BASE_URL}?q=${searchQuery}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
