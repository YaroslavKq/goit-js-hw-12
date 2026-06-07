import axios from 'axios';

const ENDPOINT_URL = 'https://pixabay.com/api/';
const API_ACCESS_KEY = '40538003-a69e71f72cedcb2a8af9fb674';

export async function getImagesByQuery(query, page) {
  const searchParams = {
    key: API_ACCESS_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };

  const response = await axios.get(ENDPOINT_URL, { params: searchParams });
  return response.data;
}
