"use client"
import React, { useEffect, useState } from 'react';
import SubtitleList from './components/SubtitleList';
import MovieDetails from "../components/MoviePostCard";

export default function MovieDetailsPage({ 
  params,
 }: {
  params: { movieId: string};
 }){

  const movieId = params.movieId;

  return (
  <main>
    <MovieDetails movieId={movieId}/>
    <SubtitleList/>
  </main>
  );
}
