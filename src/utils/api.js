const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "d121126ce9ced2c578691292dfb95c8b";

export const DISCOVER_MOVIES_ENDPOINT = "/discover/movie";
export const POPULAR_ACTORS_ENDPOINT = "/person/popular";
export const SEARCH_MOVIES_ENDPOINT = "/search/movie";

export const get = async (url, params) => {
  const queryParams = {
    api_key: API_KEY,
    ...params,
  };
  const response = await fetch(
    API_BASE_URL + url + "?" + new URLSearchParams(queryParams)
  );
  const data = await response.json();

  return data;
};
