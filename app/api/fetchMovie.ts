// Hook for fetching movie data.
export const useFetchMovie = async (movieId: string) => {
  const apiKey = "4421cf94a11108972354abe55a5af248";
  const baseUrl = "https://api.themoviedb.org/3/movie/";

  try {
    // Fetch movie data from the API.
    const response = await fetch(`${baseUrl}${movieId}?api_key=${apiKey}`);

    // Check if the response is ok (status code 200-299).
    if (!response.ok) {
      // If not ok, throw an error with the status code.
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response as JSON.
    const data = await response.json();

    // Return the fetched movie data.
    return data;
  } catch (error) {
    // Log the error to the console.
    console.error("Error fetching movie data:", error);
    // Rethrow the error.
    throw error;
  }
};
