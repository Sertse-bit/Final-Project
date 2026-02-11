import http from "node:http";
import { movieSeeds, pickByGenre, randomMovie } from "./movieSeeds.mjs";

const port = Number(process.env.PORT || 8787);

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function buildAgentReply(message, movies = []) {
  const text = String(message || "").toLowerCase();

  if (!text.trim()) return "Tell me what mood you're in and I can suggest a movie night lineup.";
  if (text.includes("horror")) return "If you want horror, go for a suspense-heavy pick and pair it with something shorter to keep the pace up.";
  if (text.includes("romance")) return "For romance, look for movies with strong character arcs and runtime under 2 hours for a cozy watch.";
  if (text.includes("family") || text.includes("kids")) return "Family night tip: choose PG/PG-13 movies and mix one comedy with one adventure title.";
  if (movies.length > 0) return `Based on your current list, start with \"${movies[0].title || movies[0].Title}\" and then watch a contrasting genre for variety.`;
  return "Try mixing one familiar classic with one new release-style pick for the best movie night balance.";
}

const server = http.createServer(async (req, res) => {
  if (!req.url) return sendJson(res, 404, { error: "Not found" });
  const url = new URL(req.url, `http://localhost:${port}`);

  if (req.method === "OPTIONS") return sendJson(res, 204, {});

  if (req.method === "GET" && url.pathname === "/api/health") {
    return sendJson(res, 200, { ok: true, service: "movie-ai-backend", time: new Date().toISOString() });
  }

  if (req.method === "GET" && url.pathname === "/api/dynamic/spotlight") {
    const genre = url.searchParams.get("genre") || "All";
    const hour = new Date().getHours();
    const mood = hour < 12 ? "Morning energy" : hour < 18 ? "Afternoon chill" : "Night cinema";
    const spotlight = genre !== "All" ? pickByGenre(genre) : randomMovie();

    return sendJson(res, 200, {
      mood,
      genre,
      spotlight,
      reason: `Generated dynamically for ${mood}${genre !== "All" ? ` with ${genre}` : ""}.`,
    });
  }

  if (req.method === "GET" && url.pathname === "/api/discover") {
    const genre = url.searchParams.get("genre") || "All";
    const pool = genre === "All" ? movieSeeds : movieSeeds.filter((m) => m.genre.toLowerCase().includes(genre.toLowerCase()));
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 6);
    return sendJson(res, 200, { genre, results: shuffled, total: shuffled.length });
  }

  if (req.method === "POST" && url.pathname === "/api/agent/chat") {
    const body = await parseBody(req);
    const movies = Array.isArray(body.movies) ? body.movies.slice(0, 10) : [];

    const recommendations = movies.slice(0, 3).map((m) => ({
      id: m.id || m.imdbID,
      title: m.title || m.Title,
      year: m.year || m.Year,
    }));

    return sendJson(res, 200, {
      reply: buildAgentReply(body.message, movies),
      recommendations,
      agent: "MovieGuideAI",
    });
  }

  return sendJson(res, 404, { error: "Not found" });
});

server.listen(port, () => {
  console.log(`Movie AI backend listening on http://localhost:${port}`);
});
