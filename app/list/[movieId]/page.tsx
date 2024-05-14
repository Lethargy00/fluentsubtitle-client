"use client";

import SubtitleList from "./components/SubtitleList";
import style from "./page.module.css";
import React, { useEffect, useState } from "react";
import { useFetchMovie } from "@/app/api/fetchMovie";
import { Movie } from "@/app/interfaces/movie";

export default function MovieDetailsPage({
  params,
}: {
  params: { movieId: string };
}) {
  const movieId = params.movieId;
  const [movieData, setMovieData] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await useFetchMovie(movieId);
      setMovieData(data);
    };
    fetchData();
  }, [movieId]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  let imageUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;

  if (movieData.poster_path === null) {
    imageUrl = "https://placehold.co/400x600?text=No+Photo&font=roboto";
  }

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
