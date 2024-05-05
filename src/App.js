import { createContext, useState, useEffect } from "react";
import Images from "./components/Images";
import Jumbutron from "./components/Jumbutron";
import SearchField from "./components/SearchField";
import { fetchImages } from "./utils/fetchApiData";

// Create Context
export const ImageContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  //debounce
  useEffect(() => {
    let delayDebounceFn;
    const setPageAndFetchData = () => {
      if (query.trim() !== "") setPage(1);
      else {
        setPage(0);
      }
    };
    delayDebounceFn = setTimeout(setPageAndFetchData, 1000);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    fetchImages(page, query)
      .then((data) => {
        setPhotos((oldPhotos) => {
          if (query && page === 1) {
            return data.results;
          } else if (query) {
            return [...oldPhotos, ...data.results];
          } else {
            return [...data, ...oldPhotos];
          }
        });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, [page]);

  // infinite scroll
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !isLoading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight
      ) {
        setPage((oldPage) => oldPage + 1);
      }
    });

    return () => window.removeEventListener("scroll", event);
  }, [isLoading]);

  // context value
  const value = {
    photos,
    isLoading,
    error,
    setQuery,
    query,
  };

  //scroll top
  // window.scrollTo(0, 0);

  return (
    <ImageContext.Provider value={value}>
      <Jumbutron>
        <SearchField />
      </Jumbutron>
      <Images />
    </ImageContext.Provider>
  );
}

export default App;
