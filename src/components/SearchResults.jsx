export default function SearchResults({ query, results, loading, onSelect, onClear }) {
  if (!query) return null; // Only show when user types

  return (
    <div className="mt-4 bg-gray-800 p-4 rounded-md shadow-lg max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-white">Search results for "{query}"</h3>
        <button
          onClick={onClear}
          className="text-red-400 hover:text-red-600 text-sm"
        >
          Clear
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-400">No movies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((m) => (
            <div
              key={m.id}
              onClick={() => onSelect(m.id)}
              className="bg-white rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={m.image || "https://via.placeholder.com/300x450?text=No+Image"}
                alt={m.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-2">
                <h4 className="font-bold text-sm">{m.title}</h4>
                <p className="text-gray-500 text-xs">{m.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


