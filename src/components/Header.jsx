
export default function Header({ onSearch, searchQuery }) {
  return (
    <header className="bg-muted/30 backdrop-blur sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">M</span>
          </div>
          <h1 className="text-xl font-bold">MovieStream</h1>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <input
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search movies, genres, actors..."
            className="w-full rounded-md px-4 py-2 bg-white/5 placeholder:text-gray-300 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-white/5 rounded-md">Sign In</button>
          <button className="px-4 py-2 bg-primary text-white rounded-md">Get Started</button>
        </div>
      </div>
    </header>
  );
}