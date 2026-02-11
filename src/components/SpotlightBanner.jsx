export default function SpotlightBanner({ spotlightData, loading }) {
  if (loading) {
    return (
      <section className="container mx-auto px-4 py-2">
        <div className="rounded-xl bg-white shadow p-4 text-gray-500">Loading dynamic spotlight...</div>
      </section>
    );
  }

  if (!spotlightData?.spotlight) return null;

  return (
    <section className="container mx-auto px-4 py-3">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-5 shadow-lg">
        <p className="text-xs uppercase tracking-wide opacity-90">Dynamic Spotlight · {spotlightData.mood}</p>
        <h2 className="text-2xl font-bold mt-1">{spotlightData.spotlight.title} ({spotlightData.spotlight.year})</h2>
        <p className="text-sm opacity-95 mt-1">{spotlightData.spotlight.genre}</p>
        <p className="text-sm mt-2 opacity-90">{spotlightData.reason}</p>
      </div>
    </section>
  );
}
