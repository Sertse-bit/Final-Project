export const movieSeeds = [
  { id: "tt0133093", title: "The Matrix", year: "1999", genre: "Sci-Fi, Action" },
  { id: "tt0111161", title: "The Shawshank Redemption", year: "1994", genre: "Drama" },
  { id: "tt0468569", title: "The Dark Knight", year: "2008", genre: "Action, Crime" },
  { id: "tt0109830", title: "Forrest Gump", year: "1994", genre: "Drama, Romance" },
  { id: "tt0120737", title: "The Lord of the Rings: The Fellowship of the Ring", year: "2001", genre: "Adventure, Drama" },
  { id: "tt0167260", title: "The Lord of the Rings: The Return of the King", year: "2003", genre: "Adventure, Action" },
  { id: "tt0110912", title: "Pulp Fiction", year: "1994", genre: "Crime, Drama" },
  { id: "tt6751668", title: "Parasite", year: "2019", genre: "Drama, Thriller" },
  { id: "tt7286456", title: "Joker", year: "2019", genre: "Drama, Thriller" },
  { id: "tt8579674", title: "1917", year: "2019", genre: "Drama, War" },
  { id: "tt0114369", title: "Se7en", year: "1995", genre: "Crime, Drama" },
  { id: "tt0088763", title: "Back to the Future", year: "1985", genre: "Adventure, Sci-Fi" },
];

export function pickByGenre(genre) {
  const matches = movieSeeds.filter((movie) =>
    movie.genre.toLowerCase().includes(String(genre).toLowerCase())
  );

  if (!matches.length) {
    return movieSeeds[Math.floor(Math.random() * movieSeeds.length)];
  }

  return matches[Math.floor(Math.random() * matches.length)];
}

export function randomMovie() {
  return movieSeeds[Math.floor(Math.random() * movieSeeds.length)];
}
