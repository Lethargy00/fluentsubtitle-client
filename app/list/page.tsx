"use client";

// Import necessary components and styles.
import MovieDetails from "./components/MoviePostCard";
import SearchBar from "./components/SearchBar";
import style from "./page.module.css";
import { useEffect, useState } from "react";
import { usePerformSearch } from "../api/search";

// Define the Home component.
export default function Home() {
  // State variable to hold the search query.
  const [searchQuery, setSearchQuery] = useState("");

  // Deconstruct the results and performSearch function from the customAPI hook.
  const { results, performSearch } = usePerformSearch(searchQuery);

  // Perform the initial search when the component mounts.
  useEffect(() => {
    performSearch();
  }, [performSearch, searchQuery]);

  // Render the page.
  return (
    <>
      <SearchBar onSearch={setSearchQuery} />
      <div className={style.listContainer}>
        <MovieDetails movies={results} />
      </div>
    </>
  );
}
