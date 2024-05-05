import { useContext, useState, useEffect, useRef } from "react";
import { ImageContext } from "../App";
import {
  saveQueryToLocalStorage,
  handleDeleteSuggestion,
} from "../utils/storeDataLocalStorage";

const SearchField = () => {
  const { setQuery, query } = useContext(ImageContext);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    const savedQueries = localStorage.getItem("searchQueries");
    if (savedQueries) {
      setSuggestions(JSON.parse(savedQueries));
    }

    // Event listener to close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      saveQueryToLocalStorage(value);
    }, 1000);
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex relative" ref={inputRef}>
      <input
        className="bg-gray-50 border border-gray-300 text-sm w-full indent-2 p-2.5 outline-none focus:border-blue-500 focus:ring-2 rounded-tl rounded-bl"
        type="search"
        placeholder="Search Anything..."
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
      {showSuggestions && suggestions.length !== 0 && (
        <ul className="absolute bg-white border border-gray-300 mt-10 py-1 px-2 rounded-b shadow-md w-full z-10">
          {suggestions.map((suggest, index) => (
            <li key={index} className="flex justify-between items-center">
              <span
                className="text-gray-500 text-xs cursor-pointer hover:text-gray-700"
                onClick={() => handleSuggestionClick(suggest)}
              >
                {suggest}
              </span>
              <button
                className="text-gray-500 text-[10px] cursor-pointer hover:text-gray-700"
                onClick={() => handleDeleteSuggestion(suggest, setSuggestions)}
              >
                &#10006;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchField;
