"use client";
import React, { useEffect, useState } from "react";
import SubtitleList from "./components/SubtitleList";
import { useFetchMovie } from "@/app/api/fetchMovie";

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

  console.log(movieData);

  return (
    <>
      <h1>{movieData.title}</h1>
      <SubtitleList />
    </>
  );
}
