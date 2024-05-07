import { useState } from "react";

interface UsePerformSearchResult {
  performSearch: () => Promise<void>;
}

export const usePerformSearch = (
  searchQuery: string,
  selectedLanguage: string
): UsePerformSearchResult => {
  const [results, setResults] = useState<any[]>([]);

  const performSearch = async () => {
    if (searchQuery.trim() !== "") {
      const apiKey = "4421cf94a11108972354abe55a5af248";
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&language=${selectedLanguage}`
      );
      const data = await response.json();
      console.log(data.results);
      setResults(data.results); // Update the results state with the fetched data.
    }
  };

  return { performSearch };
};
