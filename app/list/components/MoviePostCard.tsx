"use client";
import React, { useEffect, useState } from "react";
import styles from "./MoviePostCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// Define the structure of a movie object with its properties
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

// MovieDetails component that takes movieId as a prop and fetches movie details.
const MovieDetails: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  // const [movie, setMovie] = useState<Movie | null>(null);
  // const apiKey = "4421cf94a11108972354abe55a5af248";
  // const baseUrl = "https://api.themoviedb.org/3";

  // // useEffect hook to fetch movie details when the component mounts or when movieId changes
  // useEffect(() => {
  //   const fetchMovie = async () => {
  //     const response = await fetch(
  //       `${baseUrl}/search/movie?api_key=${apiKey}&query=${movieId}`
  //     );
  //     const data = await response.json();

  //     // Check if any movie was found
  //     if (data.results.length > 0) {
  //       // Extract the first movie's ID
  //       const movieId = data.results[0].id;

  //       // Fetch detailed information for the movie
  //       const movieResponse = await fetch(
  //         `${baseUrl}/movie/${movieId}?api_key=${apiKey}`
  //       );
  //       const movieData = await movieResponse.json();

  //       // Update the movie state with the fetched details
  //       setMovie({
  //         id: movieId,
  //         title: movieData.title,
  //         poster_path: movieData.poster_path,
  //         overview: movieData.overview,
  //         release_date: movieData.release_date,
  //         vote_average: movieData.vote_average,
  //       });
  //     }
  //   };

  //   fetchMovie();
  // }, [movieId]); // Dependency array to re-run the effect when movieId changes

  // // Render a loading message if the movie details are not yet available
  // if (!movie) return <div>Loading...</div>;

  // const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  // // Extract the first four letters of the release_date
  // const releaseYear = movie.release_date.slice(0, 4);

  if (movies.length === 0) return <div>Waiting for search / Loading...</div>;

  return (
    <>
      {movies.map((movie: Movie) => {
        let imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        if (movie.poster_path === null) {
          imageUrl = "https://placehold.co/400x600?text=No+Photo&font=roboto";
        }

        const releaseYear = movie.release_date.slice(0, 4);
        return (
          <div className={styles.container}>
            <img src={imageUrl} alt={movie.title} />
            <div>
              <div className={styles.movieTitle}>
                <Link href={`/list/${movie.id}`} key={movie.id}>
                  <h2>
                    {movie.title} ({releaseYear})
                  </h2>
                </Link>
                <h2>
                  {Math.round(movie.vote_average * 10) / 10} / 10{" "}
                  <FontAwesomeIcon icon={faStar} className={styles.star} />{" "}
                  <FontAwesomeIcon icon={faHeart} className={styles.heart} />
                </h2>
              </div>
              <p className={styles.text}>{movie.overview}</p>
              <div className={styles.downloadCount}>
                <p>
                  25.980
                  <FontAwesomeIcon icon={faDownload} />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieDetails;
