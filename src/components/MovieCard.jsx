
export default function MovieCard({
  title,
  genre,
  rating,
  year,
  image,
  duration,
  description,
  featured = false,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105 ${
        featured ? "h-[500px]" : "h-[350px]"
      }`}
    >
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <div className="flex flex-wrap gap-2 text-sm text-gray-300 mt-1">
          <span>{year}</span>
          {genre && <span>• {genre}</span>}
          {duration && <span>• {duration}</span>}
          {rating && rating !== "N/A" && <span>⭐ {rating}</span>}
        </div>
        {featured && description && (
          <p className="text-sm text-gray-200 mt-2 line-clamp-3">{description}</p>
        )}
      </div>
    </div>
  );
}

