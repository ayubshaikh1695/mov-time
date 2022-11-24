import { IMAGE_BASE_URL, MOVIE_GENRE } from "./constants";

export const getImageUrl = (path, size) => {
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const trimString = (str, length) => {
  if (str.length < length) {
    return str;
  } else {
    return str.substring(0, length) + "...";
  }
};

export const debounce = (func, delay) => {
  let timer;

  return (...args) => {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

export const movieGenre = (ids) => {
  let genre = "";

  ids.forEach((id, index) => {
    if (index === ids.length - 1) {
      genre += MOVIE_GENRE?.[id] || "";
    } else {
      genre += `${MOVIE_GENRE?.[id] || ""}, `;
    }
  });

  return genre;
};
