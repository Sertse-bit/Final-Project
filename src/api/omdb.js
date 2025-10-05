// src/api/omdb.js
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

export const searchMovies = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch movies');
  }
};

export const getMovieById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch movie details');
  }
};
