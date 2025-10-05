export default function MovieGrid({ movies, onMovieClick }) {
  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            onClick={() => onMovieClick(movie)}
            className="cursor-pointer"
          >
            <img src={movie.Poster} alt={movie.Title} className="rounded" />
            <h2 className="mt-2 text-center">{movie.Title}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}

