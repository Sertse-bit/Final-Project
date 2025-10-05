import react from 'react';

/* This component fetches full movie details by imdbID when opened */
export default function MovieDetails({ movie, isOpen, onClose }) {
  const [details, setDetails] = react.useState(null);

  react.useEffect(() => {
    if (!isOpen || !movie) {
      setDetails(null);
      return;
    }
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=YOUR_OMDB_API_KEY&i=${movie.id}&plot=full`);
        const data = await res.json();
        setDetails(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchDetails();
  }, [isOpen, movie]);

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="relative max-w-4xl w-full bg-muted/10 rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-3 gap-4 p-6">
          <img src={movie.image} alt={movie.title} className="w-full h-96 object-cover rounded-xl md:col-span-1"/>
          <div className="md:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold">{movie.title}</h3>
                <div className="text-sm text-gray-300">{movie.year} • {movie.genre}</div>
              </div>
              <button onClick={onClose} className="text-gray-300">Close</button>
            </div>

            <div className="mt-4 text-gray-200">
              {details ? (
                <>
                  <p className="mb-2"><strong>Plot:</strong> {details.Plot}</p>
                  <p className="mb-1"><strong>Genre:</strong> {details.Genre}</p>
                  <p className="mb-1"><strong>Runtime:</strong> {details.Runtime}</p>
                  <p className="mb-1"><strong>Director:</strong> {details.Director}</p>
                  <p className="mb-1"><strong>Actors:</strong> {details.Actors}</p>
                  <p className="mb-1"><strong>IMDB Rating:</strong> {details.imdbRating}</p>
                </>
              ) : (
                <p>Loading details...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

