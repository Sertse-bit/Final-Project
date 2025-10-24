import { LogIn, UserPlus } from "lucide-react";

export default function Header({ onSearch, searchQuery, onSigninClick, onSignupClick }) {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white sticky top-0 z-20 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* 🎬 Logo */}
        <div className="flex items-center gap-2">
          <div
            className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #f43f5e, #f97316)" }}
          >
            🎬 MovieStream
          </div>
        </div>

        {/* 🔍 Search Bar */}
        <div className="flex-1 mx-6 max-w-md">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full border border-gray-700 rounded-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 outline-none transition"
          />
        </div>

        {/* 🔐 Auth Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSigninClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500 text-pink-500 font-semibold hover:bg-pink-500/20 transition"
          >
            <LogIn size={18} />
            <span>Sign In</span>
          </button>

          <button
            onClick={onSignupClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold hover:opacity-90 shadow-md transition"
          >
            <UserPlus size={18} />
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    </header>
  );
}

