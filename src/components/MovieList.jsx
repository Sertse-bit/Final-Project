export default function MovieList({ movies, onSelect }) {
  if (!movies.length) return <p className="text-gray-500 text-center">No movies found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((m) => (
        <div
          key={m.id}
          onClick={() => onSelect(m.id)}
          className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer hover:shadow-xl transition"
        >
          <img
            src={m.image || "https://via.placeholder.com/300x450?text=No+Image"}
            alt={m.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-3">
            <h2 className="font-bold text-lg">{m.title}</h2>
            <p className="text-gray-500">{m.year}</p>
            {m.genre && <p className="text-sm text-gray-400">{m.genre}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
