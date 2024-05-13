"use client";
import React, { useEffect, useState } from "react";
import SubtitleList from "./components/SubtitleList";
import { useFetchMovie } from "@/app/api/fetchMovie";
import style from "./page.module.css";
import SubtitleForm from "./components/SubtitleForm";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

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
          <h1 className={style.title}>
            {movieData.title} ({movieData.release_date})
          </h1>
          <p>{movieData.overview}</p>
        </div>
      </div>

      <SubtitleList movieId={movieId} />
    </>
  );
}
