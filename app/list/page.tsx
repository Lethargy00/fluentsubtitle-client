import MovieDetails from "./components/MoviePostCard";
import SearchBar from "./components/SearchBar";

export default function Home() {
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
