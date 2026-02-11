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
}
