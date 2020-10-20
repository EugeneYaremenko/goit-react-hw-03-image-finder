import axios from 'axios';

const fetchImagesWithQuery = (searchQuery, page = 1) => {
  return axios
    .get(
      `https://pixabay.com/api/?key=17157037-52a084c0f09be4b43a01edb5f&q=${searchQuery}&image_type=photo&page=${page}&per_page=12`,
    )
    .then(response => response.data.hits);
};

export default {
  fetchImagesWithQuery,
};
