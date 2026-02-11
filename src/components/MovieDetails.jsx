import { useEffect, useMemo, useState } from "react";

const trailerLibrary = {
  action: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  drama: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscape.mp4",
  comedy: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  horror: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  romance: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "sci-fi": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  adventure: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  default: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
};

function getTrailerUrl(genre = "") {
  const normalized = genre.toLowerCase();
  const matched = Object.keys(trailerLibrary).find(
    (key) => key !== "default" && normalized.includes(key)
  );

  return matched ? trailerLibrary[matched] : trailerLibrary.default;
}

export default function MovieDetails({ movie, isOpen, loading, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isOpen) setIsPlaying(false);
  }, [isOpen]);

  useEffect(() => {
    setIsPlaying(false);
  }, [movie?.id]);

  const trailerUrl = useMemo(() => getTrailerUrl(movie?.genre), [movie?.genre]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-3">
      <div className="bg-white text-black rounded-xl p-6 w-full max-w-2xl relative shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-lg font-semibold">Loading details...</p>
          </div>
        ) : movie ? (
          <>
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

                <button
                  onClick={() => setIsPlaying(true)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  ▶ Watch Now
                </button>
                <p className="text-xs text-gray-500 mt-2">Click to start video playback in real time.</p>
              </div>
            </div>

            {isPlaying && (
              <div className="mt-5">
                <h3 className="font-semibold mb-2">Now Playing</h3>
                <video
                  className="w-full rounded-lg bg-black"
                  controls
                  autoPlay
                  preload="metadata"
                  src={trailerUrl}
                >
                  Your browser does not support HTML5 video playback.
                </video>
              </div>
            )}
          </>
        ) : (
          <p className="text-center py-20">No details available</p>
        )}
      </div>
    </div>
  );
}
