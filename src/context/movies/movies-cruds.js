import {
  erorrMoviesGenreGet,
  pendingMoviesGenreGet,
  startMoviesGenreGet,
  startMoviesFilterGet,
  pendingMoviesFilterGet,
  erorrMoviesFilterGet,
  startCategoriedMovies,
  pendingCategoriedMovies,
  erorrCategoriedMovies,
} from "./moviesActions";
import { axiosInstance } from "../../config";
import { handleTitle } from "../../helpers";

// Get SLice of all movies with type
export const getMoviesGenre = async (type, dispatch) => {
  dispatch(startMoviesGenreGet());
  try {
    const { data } = await axiosInstance.get("/movies", {
      params: { type },
    });
    dispatch(pendingMoviesGenreGet(data));
  } catch (error) {
    dispatch(erorrMoviesGenreGet(error));
  }
};

// When Filter Movies
export const getFilterdMovies = async (value, countries, dispatch) => {
  let titleQuery = value || "";
  let countriesQuery = countries || "";
  dispatch(startMoviesFilterGet());
  try {
    if (titleQuery.trim().length === 0 && countriesQuery.trim().length === 0)
      throw Error("اكتب اسم الفيلم في البحث او اختر دولة");
    if (titleQuery?.includes("(")) throw Error("امسح القوس");
    const { data } = await axiosInstance.get("/movies/search", {
      params: { q: titleQuery, countries: countriesQuery },
    });

    if (Object.keys(data).length === 0 || data.length === 0)
      throw Error("مفيش نتائج للاسف");
    const handledData = handleTitle(data);

    dispatch(pendingMoviesFilterGet(handledData));
  } catch (error) {
    console.log(error.message);
    dispatch(erorrMoviesFilterGet(error.message));
  }
};

// Get countries filter
export const getGenresMoves = async (setGenres, setLoading, setError) => {
  setLoading(true);
  try {
    const { data } = await axiosInstance.get("/movies/genres");
    const handeledData = data.filter(
      (item) => item.length !== 0 && !item.match(/^ *$/)
    );

    let slicedData = [];
    let temprorayPart = [];

    handeledData.forEach((item, index) => {
      let indexPlusedOne = index + 1;
      let is5Doubled = indexPlusedOne % 5 === 0;
      let isLastIndex = indexPlusedOne === handeledData.length;
      let isRestItems = isLastIndex && !is5Doubled && handeledData.length > 5;

      temprorayPart.push(item);

      if (is5Doubled) {
        slicedData.push({ _id: `g${indexPlusedOne}`, genres: temprorayPart });
        temprorayPart = [];
      }

      if (isRestItems) {
        slicedData.push({ _id: `g${indexPlusedOne}`, genres: temprorayPart });
      }

      if (handeledData.length < 5 && isLastIndex) {
        slicedData.push({ _id: `g${indexPlusedOne}`, genres: temprorayPart });
      }
    });

    setLoading(false);
    setGenres(slicedData);
  } catch (error) {
    let errorCode = error.response.status;
    setLoading(false);

    if (errorCode === 400) setError(error.response.data);
    else setError("في مشكله بس مش من عندك , متقلقش");
  }
};

// Get one random movie
export const getOneMovie = async (setResult, initData) => {
  setResult((prev) => ({ ...prev, isFetching: true, error: null }));
  try {
    const { data } = await axiosInstance.get("/movies/one-movie");
    setResult((prev) => ({ ...prev, isFetching: false, data }));
  } catch (error) {
    let errorMessage =
      error.response?.data?.message || "في مشكله بس مش من عندك , متقلقش";
    setResult((prev) => ({ ...prev, data: initData, error: errorMessage }));
  }

  setResult((prev) => ({ ...prev, isFetching: false }));
};

// Get one movie details
export const getDetailsItem = async (id, setFetch) => {
  setFetch((prev) => ({ ...prev, isFetching: true }));
  try {
    const { data } = await axiosInstance.get(`/movies/details/${id}`);
    setFetch((prev) => ({ ...prev, isFetching: false, data }));
  } catch (error) {
    let errorCode = error.response.status;

    setFetch((prev) => ({ ...prev, isFetching: false }));

    if (errorCode === 400)
      setFetch((prev) => ({ ...prev, error: error.response.data }));
    else
      setFetch((prev) => ({
        ...prev,
        error: "في مشكله بس مش من عندك , متقلقش",
      }));
  }
};

// Get categoried movies with (more button)
export const getCategoriedMovies = async (
  type,
  page,
  category,
  dispatch,
  setStatus
) => {
  dispatch(startCategoriedMovies());
  setStatus((prev) => ({ ...prev, isFetching: true }));
  try {
    const { data } = await axiosInstance.get(`/movies/category/${category}`, {
      params: { type, page },
    });
    dispatch(pendingCategoriedMovies(data));
  } catch (error) {
    let responseError;
    dispatch(erorrCategoriedMovies());
    if (error.response.status === 400) {
      responseError = error.response.data;
    } else {
      responseError = "في مشكله حصلت.";
    }
    setStatus((prev) => ({ ...prev, error: responseError }));
  }
  setStatus((prev) => ({ ...prev, isFetching: false }));
};
