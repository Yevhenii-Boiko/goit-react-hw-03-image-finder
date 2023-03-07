function fetchImages(searchValue, pageNumber) {
  const perPage = 12;
  const key = '33163433-7381312326b7cb4a7310bb1a7';
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchValue}&page=${pageNumber}&per_page=${perPage}&key=${key}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(response.statusText));
  });
}

const imagesApi = { fetchImages };
export default imagesApi;
