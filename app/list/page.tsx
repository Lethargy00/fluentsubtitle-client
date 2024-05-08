"use client";
import { useEffect, useState } from "react";
import MovieDetails from "./components/MoviePostCard";
import SearchBar from "./components/SearchBar";
import style from "./page.module.css";
import { usePerformSearch } from "../api/search";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { performSearch } = usePerformSearch(searchQuery);

  useEffect(() => {
    performSearch();
  }, [searchQuery]);

  return (
    <>
      <SearchBar onSearch={setSearchQuery} />
      <div className={style.listContainer}>
        <MovieDetails movieId={"jurassic-shark"} />
        <MovieDetails movieId={"jurassic-shark-2"} />
        <MovieDetails movieId={"jurassic-shark-3"} />
        <MovieDetails movieId={"2-headed-shark-attack"} />
      </div>
    </>
  );
}
