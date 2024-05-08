"use client";
import { useEffect, useState } from "react";
import MovieDetails from "./components/MoviePostCard";
import SearchBar from "./components/SearchBar";
import style from "./page.module.css";
import { usePerformSearch } from "../api/search";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { results, performSearch } = usePerformSearch(searchQuery);

  useEffect(() => {
    performSearch();
  }, [searchQuery]);

  return (
    <>
      <SearchBar onSearch={setSearchQuery} />
      <div className={style.listContainer}>
        <MovieDetails movies={results} />
      </div>
    </>
  );
}
