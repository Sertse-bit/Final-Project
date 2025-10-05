import { useState, useEffect } from "react";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import MovieGrid from "./components/MovieGrid";
import CategoryTabs from "./components/CategoryTabs";
import SearchResults from "./components/SearchResults";
import MovieDetails from "./components/MovieDetails";
import StatsSection from "./components/StatsSection";

const VITE_OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_KEY = "76bb783b";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ["All", "Action", "Drama", "Comedy", "Sci-Fi", "Horror", "Romance", "Adventure"];

  // Search function (by title)
  const fetchMovies = async (query = "Avengers") => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`);
      const data = await res.json();
      if (data.Search) {
        const formatted = data.Search.map((m) => ({
          id: m.imdbID,
          title: m.Title,
          year: m.Year,
          image: m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x450?text=No+Image",
          genre: m.Type || "Movie",
          rating: "N/A",
          duration: "—",
        }));
        setMovies(formatted);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error(err);
      setMovies([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies("Avengers");
  }, []);

  // When searchQuery changes, fetch results (debounce simple)
  useEffect(() => {
    if (!searchQuery) return;
    const t = setTimeout(() => {
      fetchMovies(searchQuery);
    }, 500);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const filteredMovies = () => {
    if (activeCategory === "All") return movies;
    return movies.filter((m) =>
      m.genre.toLowerCase().includes(activeCategory.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="container mx-auto px-4 py-8">
        {searchQuery ? (
          <SearchResults
            query={searchQuery}
            results={movies}
            onClear={() => {
              setSearchQuery("");
              fetchMovies("Avengers");
            }}
            loading={loading}
            onMovieClick={setSelectedMovie}
          />
        ) : (
          <>
            {/* Featured */}
            {movies.length > 0 && (
              <section className="mb-8">
                <MovieCard
                  title={movies[0].title}
                  genre={movies[0].genre}
                  rating={movies[0].rating}
                  year={movies[0].year}
                  image={movies[0].image}
                  duration={movies[0].duration}
                  description="Featured from OMDb search results"
                  featured={true}
                  onClick={() => setSelectedMovie(movies[0])}
                />
              </section>
            )}

            {/* Categories */}
            <section className="py-4 mb-6">
              <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </section>

            {/* Movie Grid */}
            <MovieGrid
              title="Discover"
              movies={filteredMovies()}
              onMovieClick={setSelectedMovie}
            />

            <StatsSection />
          </>
        )}
      </main>

      <footer className="bg-muted/50 mt-16 py-12">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="font-bold text-xl">MovieStream</span>
              </div>
              <p className="text-muted-foreground">Your ultimate destination for movies and TV shows.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Browse</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Movies</a></li>
                <li><a href="#" className="hover:text-primary">TV Shows</a></li>
                <li><a href="#" className="hover:text-primary">Genres</a></li>
                <li><a href="#" className="hover:text-primary">Top Rated</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">My List</a></li>
                <li><a href="#" className="hover:text-primary">Watchlist</a></li>
                <li><a href="#" className="hover:text-primary">Settings</a></li>
                <li><a href="#" className="hover:text-primary">Help</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 MovieStream. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <MovieDetails
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}
