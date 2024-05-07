"use client";
import MovieDetails from "./components/MoviePostCard";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<any[]>([]);

  return (
    <>
      <SearchBar />

      <MovieDetails movieId={"jurassic-shark"} />
      <MovieDetails movieId={"jurassic-shark-2"} />
      <MovieDetails movieId={"jurassic-shark-3"} />
      <MovieDetails movieId={"2-headed-shark-attack"} />
    </>
  );
}
