// Get Movies for home page
export const startMoviesGenreGet = () => ({
  type: "START_MOVIES_GENRE_GET",
});
export const pendingMoviesGenreGet = (items) => ({
  type: "PENDING_MOVIES_GENRE_GET",
  payload: items,
});
export const erorrMoviesGenreGet = (error) => ({
  type: "ERROR_MOVIES_GENRE_GET",
  payload: error,
});

// Get Categoried movies
export const startCategoriedMovies = () => ({
  type: "START_GET_CATEGORIED_MOVIES",
});
export const pendingCategoriedMovies = (value) => ({
  type: "PENDING_GET_CATEGORIED_MOVIES",
  payload: value,
});
export const erorrCategoriedMovies = () => ({
  type: "ERROR_GET_CATEGORIED_MOVIES",
});
export const clearCategoriedMovies = () => ({
  type: "CLEAR_GET_CATEGORIED_MOVIES",
});

// Filter movies
export const startMoviesFilterGet = () => ({
  type: "START_MOVIES_FILTER_GET",
});
export const pendingMoviesFilterGet = (value) => ({
  type: "PENDING_MOVIES_FILTER_GET",
  payload: value,
});
export const erorrMoviesFilterGet = (error) => ({
  type: "ERROR_MOVIES_FILTER_GET",
  payload: error,
});
