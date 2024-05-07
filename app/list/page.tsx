import MovieDetails from "./components/MoviePostCard";

export default function Home() {
  return (
    <main>
      <MovieDetails movieId={"jurassic-shark"} />
      <MovieDetails movieId={"jurassic-shark-2"} />
      <MovieDetails movieId={"jurassic-shark-3"} />
      <MovieDetails movieId={"2-headed-shark-attack"} />
    </main>
  );
}
