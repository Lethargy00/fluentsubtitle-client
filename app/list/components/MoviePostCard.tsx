"use client";
import React from "react";
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

// MovieDetails component that takes an array of movie objects and returns a list of movies.
const MovieDetails: React.FC<{ movies: Movie[] }> = ({ movies }) => {
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
