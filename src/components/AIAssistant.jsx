import { useState } from "react";
import { chatWithAgent } from "../api/backend";

export default function AIAssistant({ movies = [] }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I’m MovieGuideAI. Ask me for movie-night ideas." },
  ]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const data = await chatWithAgent(userMessage, movies);
      const recommendationText = data.recommendations?.length
        ? ` Picks: ${data.recommendations.map((r) => `${r.title} (${r.year || "N/A"})`).join(", ")}`
        : "";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `${data.reply}${recommendationText}` },
      ]);
    } catch (_error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "I couldn’t reach the backend agent. Make sure it is running on port 8787." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-4 pb-8">
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-bold text-lg mb-3">🤖 AI Movie Assistant</h3>

        <div className="max-h-56 overflow-auto space-y-2 mb-3">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`text-sm p-2 rounded-md ${message.role === "assistant" ? "bg-gray-100" : "bg-blue-100 ml-6"}`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask for a recommendation by mood, genre, or audience"
            className="flex-1 border rounded-md px-3 py-2"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-primary text-white rounded-md px-4 py-2 disabled:opacity-60"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </section>
  );
}
