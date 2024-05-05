export const saveQueryToLocalStorage = (value) => {
  // delete empty or whitespace queries
  if (!value.trim()) {
    return;
  }

  let savedQueries = localStorage.getItem("searchQueries");
  if (!savedQueries) {
    savedQueries = JSON.stringify([value]);
  } else {
    savedQueries = JSON.parse(savedQueries);
    if (!savedQueries.includes(value)) {
      savedQueries.push(value);
    }
    if (savedQueries.length > 5) {
      savedQueries.shift();
    }
    savedQueries = JSON.stringify(savedQueries);
  }
  localStorage.setItem("searchQueries", savedQueries);
};

export const handleDeleteSuggestion = (value, setSuggestions) => {
  const savedQueries = JSON.parse(localStorage.getItem("searchQueries"));
  const updatedSuggestions = savedQueries.filter(
    (suggest) => suggest !== value
  );
  localStorage.setItem("searchQueries", JSON.stringify(updatedSuggestions));
  setSuggestions(updatedSuggestions);
};
