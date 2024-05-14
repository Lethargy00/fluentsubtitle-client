"use client";
import React from "react";
import style from "./MoviePostCard.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faDownload } from "@fortawesome/free-solid-svg-icons";
import { Movie } from "@/app/interfaces/movie";

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

        const releaseYear =
          movie.release_date.slice(0, 4) === ""
            ? "Unknown"
            : movie.release_date.slice(0, 4);

        return (
          <div key={movie.id} className={style.container}>
            <img src={imageUrl} alt={movie.title} />
            <div>
              <div className={style.movieTitle}>
                <Link href={`/list/${movie.id}`} key={movie.id}>
                  <h2>
                    {movie.title} ({releaseYear})
                  </h2>
                </Link>
                <h2>
                  <span className={style.starRating}>
                    {Math.round(movie.vote_average * 10) / 10} / 10{" "}
                    <FontAwesomeIcon icon={faStar} className={style.star} />{" "}
                  </span>
                  <FontAwesomeIcon icon={faHeart} className={style.heart} />
                </h2>
              </div>
              <p className={style.text}>{movie.overview}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieDetails;
