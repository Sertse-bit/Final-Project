export default function SearchResults({
  query,
  results = [],
  onClear,
  loading,
  onMovieClick,
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          Results for <span className="text-blue-600">{query}</span>
        </h2>
        <button
          onClick={onClear}
          className="text-sm text-red-500 hover:underline"
        >
          Clear
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => onMovieClick(movie)}
              className="cursor-pointer"
            >
              <img src={movie.Poster} alt={movie.Title} className="rounded" />
              <h3 className="mt-2 text-center">{movie.Title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </section>
  );
}



