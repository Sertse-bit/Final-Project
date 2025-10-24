import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import CategoryTabs from "./components/CategoryTabs";
import MovieDetails from "./components/MovieDetails";
import AuthModal from "./components/AuthModal";

const API_KEY = "368be984";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // ✅ Categories (used for both tabs and random homepage load)
  const categories = ["All", "Action", "Drama", "Comedy", "Sci-Fi", "Horror", "Romance", "Adventure"];

  // ✅ Fetch movies helper
  const fetchMovies = async (query = "Batman", pageNum = 1, limit = 30) => {
    if (!hasMore && pageNum > 1) return;
    setLoading(true);
    setError("");

    try {
      const searchRes = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${pageNum}`
      );
      const searchData = await searchRes.json();

      if (searchData.Response === "True") {
        const moviesWithDetails = await Promise.all(
          searchData.Search.map(async (m) => {
            const detailRes = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${m.imdbID}`
            );
            const details = await detailRes.json();
            return {
              id: m.imdbID,
              title: m.Title,
              year: m.Year,
              image: m.Poster !== "N/A"
                ? m.Poster
                : "https://via.placeholder.com/300x450?text=No+Image",
              genre: details.Genre || "Movie",
              rating: details.imdbRating || "N/A",
              duration: details.Runtime || "—",
              plot: details.Plot || "",
            };
          })
        );

        // ✅ Limit to 30 movies (for homepage)
        const limitedMovies = moviesWithDetails.slice(0, limit);
        setMovies((prev) => (pageNum === 1 ? limitedMovies : [...prev, ...limitedMovies]));
        setHasMore(searchData.Search.length > 0);
      } else {
        if (pageNum === 1) setMovies([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  // ✅ On load: choose random category and fetch up to 30 movies
  useEffect(() => {
    const randomCategory = categories[Math.floor(Math.random() * (categories.length - 1)) + 1]; // skip "All"
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(randomCategory, 1, 30);
  }, []);

  // ✅ When search query changes
  useEffect(() => {
    if (searchQuery === "") return; // don’t refetch on first load
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(searchQuery, 1, 30);
  }, [searchQuery]);

  // ✅ Infinite scroll logic
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight &&
      !loading &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ✅ Load more movies when page changes
  useEffect(() => {
    if (page === 1) return;
    fetchMovies(searchQuery || "Batman", page);
  }, [page]);

  // ✅ Filter movies by category
  const filteredMovies = movies.filter((m) => {
    if (activeCategory === "All") return true;
    return m.genre.toLowerCase().split(", ").includes(activeCategory.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        onSigninClick={() => {
          setAuthMode("signin");
          setShowAuthModal(true);
        }}
        onSignupClick={() => {
          setAuthMode("signup");
          setShowAuthModal(true);
        }}
      />

      <section className="container mx-auto px-4 py-4">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </section>

      <main className="container mx-auto px-4 py-4">
        {error && <p className="text-center text-red-500 font-semibold">{error}</p>}

        <MovieList
          movies={filteredMovies}
          onSelect={(id) => {
            const movie = movies.find((m) => m.id === id);
            setSelectedMovie(movie);
          }}
        />

        {loading && <p className="text-center text-gray-400 mt-4">Loading more...</p>}
        {!hasMore && <p className="text-center text-gray-400 mt-4">No more movies.</p>}
      </main>

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {showAuthModal && (
        <AuthModal
          isSignup={authMode === "signup"}
          onClose={() => setShowAuthModal(false)}
          toggleMode={() =>
            setAuthMode((prev) => (prev === "signup" ? "signin" : "signup"))
          }
        />
      )}
 {/* ✅ Footer */}
      <footer className="bg-muted/40 py-4 text-center text-sm text-gray-500 mt-auto">
        © 2025 Movie Database. All rights reserved.
      </footer>


    </div>
  );
}
