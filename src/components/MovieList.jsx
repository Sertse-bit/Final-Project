export default function MovieList({ movies, onSelect }) {
  if (!movies.length) return <p className="text-gray-500">No movies found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((m) => (
        <div
          key={m.imdbID}
          onClick={() => onSelect(m.imdbID)}
          className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer hover:shadow-xl transition"
        >
          <img
            src={m.Poster !== "N/A" ? m.Poster : "/placeholder.png"}
            alt={m.Title}
            className="w-full h-64 object-cover"
          />
          <div className="p-3">
            <h2 className="font-bold text-lg">{m.Title}</h2>
            <p className="text-gray-500">{m.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
