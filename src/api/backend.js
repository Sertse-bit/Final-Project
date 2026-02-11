 codex/explain-codebase-structure-and-pointers-oshftv
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

function buildUrl(path) {
  return `${BACKEND_URL}${path}`;
}

function fallbackSpotlight(genre = "All") {
  return {
    mood: "Offline mode",
    genre,
    spotlight: {
      id: "local-spotlight",
      title: "The Matrix",
      year: "1999",
      genre: genre === "All" ? "Sci-Fi, Action" : genre,
    },
    reason: "Backend unavailable, showing local dynamic fallback.",
  };
}

function fallbackAgentReply(message, movies = []) {
  const text = String(message || "").toLowerCase();
  if (!text.trim()) return "Tell me your mood and I will suggest a movie.";
  if (text.includes("action")) return "Try a high-energy action title with a short runtime for a fun watch.";
  if (text.includes("horror")) return "Pick one suspenseful horror and keep the lights low for the full effect.";
  if (movies.length > 0) return `Start with ${movies[0].title || movies[0].Title} and then switch genres for variety.`;
  return "Try one adventure and one drama for a balanced movie night.";
}

export async function fetchSpotlight(genre = "All") {
  try {
    const res = await fetch(buildUrl(`/api/dynamic/spotlight?genre=${encodeURIComponent(genre)}`));
    if (!res.ok) throw new Error("Bad response");
    return await res.json();
  } catch {
    return fallbackSpotlight(genre);
  }
}

export async function chatWithAgent(message, movies = []) {
  try {
    const res = await fetch(buildUrl(`/api/agent/chat`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, movies }),
    });

    if (!res.ok) throw new Error("Bad response");
    return await res.json();
  } catch {
    const safeMovies = Array.isArray(movies) ? movies.slice(0, 3) : [];
    return {
      reply: fallbackAgentReply(message, safeMovies),
      recommendations: safeMovies.map((m) => ({
        id: m.id || m.imdbID,
        title: m.title || m.Title,
        year: m.year || m.Year,
      })),
      agent: "MovieGuideAI (offline)",
    };
  }
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8787";

export async function fetchSpotlight(genre = "All") {
  const res = await fetch(`${BACKEND_URL}/api/dynamic/spotlight?genre=${encodeURIComponent(genre)}`);
  if (!res.ok) throw new Error("Failed to load spotlight");
  return res.json();
}

export async function chatWithAgent(message, movies = []) {
  const res = await fetch(`${BACKEND_URL}/api/agent/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, movies }),
  });

  if (!res.ok) throw new Error("Failed to contact AI agent");
  return res.json();
 main
}
