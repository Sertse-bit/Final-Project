const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "368be984";
const BASE_URL = "https://www.omdbapi.com/";

// ✅ Fetch movies by search term
export async function fetchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`);
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

// ✅ Fetch full movie details by ID
export async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}
