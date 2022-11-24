export const SEARCH_MOVIES_MESSAGE_TYPE = {
  search: "search",
  success: "success",
  failure: "failure",
};

const SEARCH_MOVIES_MESSAGE = {
  search: "Looking for",
  success: "Results for",
  failure: "No results found for",
};

export const getSearchMoviesMessage = (type, query) => {
  switch (type) {
    case SEARCH_MOVIES_MESSAGE_TYPE.search:
      return `${SEARCH_MOVIES_MESSAGE[type]} ${query}...`;

    case SEARCH_MOVIES_MESSAGE_TYPE.success:
    case SEARCH_MOVIES_MESSAGE_TYPE.failure:
      return `${SEARCH_MOVIES_MESSAGE[type]} ${query}`;

    default:
      return "";
  }
};
