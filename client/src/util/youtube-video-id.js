export const getYoutubeIdFromURL = (url) => {
  const params = new URLSearchParams(new URL(url).search);

  return params.get("v");
};
