import axios from 'axios';
export const perPage = 15;

export async function showImage(searchName, page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const END_POINT = '?';
    const url = BASE_URL+END_POINT;
  const options = {
    params: {
    key:'42187332-ff85343869753156c1a8d7a61',
    q: `${searchName}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
      page: page,
      per_page: perPage,
    },
  };
  const res = await axios.get(url, options);
return res.data;
}


