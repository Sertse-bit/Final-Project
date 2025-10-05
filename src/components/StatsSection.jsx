
export default function StatsSection() {
  return (
    <section className="mt-12 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-xl p-6">
          <h4 className="text-2xl font-bold">10k+</h4>
          <p className="text-gray-300">Movies & Shows</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6">
          <h4 className="text-2xl font-bold">500k+</h4>
          <p className="text-gray-300">Monthly Users</p>
        </div>
        <div className="bg-white/5 rounded-xl p-6">
          <h4 className="text-2xl font-bold">4.8</h4>
          <p className="text-gray-300">Average Rating</p>
        </div>
      </div>
    </section>
  );
}
