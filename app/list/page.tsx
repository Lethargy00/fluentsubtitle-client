"use client";
import MovieDetails from "./components/MoviePostCard";
import SearchBar from "./components/SearchBar";
import style from "./page.module.css";

export default function Home() {
  return (
    <>
      <SearchBar />
      <div className={style.listContainer}>
        <MovieDetails movieId={"jurassic-shark"} />
        <MovieDetails movieId={"jurassic-shark-2"} />
        <MovieDetails movieId={"jurassic-shark-3"} />
        <MovieDetails movieId={"2-headed-shark-attack"} />
      </div>
    </>
  );
}
