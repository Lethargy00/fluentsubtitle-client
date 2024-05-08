export const useFetchMovie = async (movieId: string) => {
  const apiKey = "4421cf94a11108972354abe55a5af248";
  const baseUrl = "https://api.themoviedb.org/3/movie/";
  const response = await fetch(`${baseUrl}${movieId}?api_key=${apiKey}`);
  console.log(`${baseUrl}${movieId}?api_key=${apiKey}`);
  const data = await response.json();

  return data;
};
