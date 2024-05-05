const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

export const fetchImages = async (page, query) => {
  let url;
  const urlPage = `&page=${page}`;
  const urlQuery = query ? `&query=${query}` : "";

  if (query) {
    url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
  } else {
    url = `${mainUrl}${clientID}${urlPage}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
