import { useState } from "react";

interface UsePerformSearchResult {
  results: any[];
  performSearch: () => Promise<void>;
}

// Custom hook to perform a movie search using The Movie Database API
export const usePerformSearch = (
  searchQuery: string
): UsePerformSearchResult => {
  // State to hold the search results
  const [results, setResults] = useState<any[]>([]);

  // Function to perform the search.
  const performSearch = async () => {
    if (searchQuery.trim() !== "") {
      const apiKey = "4421cf94a11108972354abe55a5af248";
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
  };

  // Return the search results and the performSearch function.
  return { results, performSearch };
};
