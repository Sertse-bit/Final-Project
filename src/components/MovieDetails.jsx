export default function MovieDetails({ movie, isOpen, loading, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white text-black rounded-xl p-6 w-full max-w-lg relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-lg font-semibold">Loading details...</p>
          </div>
        ) : movie ? (
          <>
            {/* Movie Poster & Info */}
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full md:w-48 rounded"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                <p className="text-sm mb-1">
                  <strong>Year:</strong> {movie.year}
                </p>
                <p className="text-sm mb-1">
                  <strong>Genre:</strong> {movie.genre}
                </p>
                <p className="text-sm mb-1">
                  <strong>Rating:</strong> {movie.rating}
                </p>
                <p className="text-sm mb-1">
                  <strong>Duration:</strong> {movie.duration}
                </p>
                <p className="mt-2 text-sm">{movie.plot}</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center py-20">No details available</p>
        )}
      </div>
    </div>
  );
}

