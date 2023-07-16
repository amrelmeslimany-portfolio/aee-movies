export const baseURL = process.env.REACT_APP_BACKEND_BASEURL;

export const handleTitle = (data, string = "(2022)") =>
  data.map((item) => {
    const newTitle = item.movieTitle.replace(string, "").trim();
    return { ...item, movieTitle: newTitle };
  });

export const handleErrors = (error) => {
  const handledError = error.response?.data?.message
    ? error.response.data.message
    : "حصلت مشكله من عندنا من الموقع, حاول مرا تانيا";
  return handledError;
};

export const handleZeroPrefix = (number) => {
  if (number > 0 && number < 10) return "0" + number;
  return number;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const isImg = (cover = "") => {
  if (cover.search("img") !== -1) return true;
  else return false;
};

export const handleDuplicatedPost = (items) => {
  const handeled = items.reduce((acc, current) => {
    const isEqual = acc.find((item) => item.postID === current.postID);
    if (!isEqual) return acc.concat([current]);
    else return acc;
  }, []);
  return handeled;
};

export const updateLikesPost = (posts, action) => {
  return posts.map((post) => {
    if (post.postID === action.payload.id)
      return {
        ...post,
        postLikes: action.payload.likes,
      };
    return post;
  });
};

export const isDevelopment = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
    return true;
  else return false;
};

export const filterTags = (value = "") =>
  value.replace(/<\/?[\w\s="/.':;#-\/\?]+>/g, "");
