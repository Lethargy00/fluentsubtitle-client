"use client";

import SubtitleList from "./components/SubtitleList";
import style from "./page.module.css";
import React, { useEffect, useState } from "react";
import { useFetchMovie } from "@/app/api/fetchMovie";
import { Movie } from "@/app/interfaces/movie";

// Component to display movie details.
export default function MovieDetailsPage({
  params,
}: {
  params: { movieId: string };
}) {
  const movieId = params.movieId;
  const [movieData, setMovieData] = useState<Movie | null>(null);

  // Fetch movie data when the movieId changes.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await useFetchMovie(movieId);
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setMovieData(null);
      }
    };
    fetchData();
  }, [movieId]);

  // Display loading while movie data is being fetched.
  if (!movieData) {
    return <div>Loading...</div>;
  }

  let imageUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;

  // Placeholder image if no image were found.
  if (movieData.poster_path === null) {
    imageUrl = "https://placehold.co/400x600?text=No+Photo&font=roboto";
  }

  // Render movie details and subtitle list.
  return (
    <>
      <div className={style.container}>
        <img src={imageUrl} alt={movieData.title} className={style.image} />
        <div className={style.description}>
          <h1 className={style.titleContainer}>
            <span className={style.title}>{movieData.title}</span>{" "}
            <span className={style.releaseDate}>
              ({movieData.release_date})
            </span>
          </h1>
          <p className={style.overview}>{movieData.overview}</p>
        </div>
      </div>

      <SubtitleList movieId={movieId} />
    </>
  );
}
