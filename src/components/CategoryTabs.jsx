
export default function CategoryTabs({ categories = [], activeCategory, onCategoryChange }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onCategoryChange(c)}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            activeCategory === c ? 'bg-primary text-white' : 'bg-white/5 text-gray-300'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
