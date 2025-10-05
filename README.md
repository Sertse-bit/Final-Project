# Movie Database (Frontend Capstone)

This is a React + Vite + Tailwind project that searches movies using the OMDB API.

## Setup

1. Copy `.env.example` to `.env` and put your OMDB key:
   ```
   VITE_OMDB_API_KEY=your_key_here
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run dev server:
   ```
   npm run dev
   ```

## Build & Deploy

```
npm run build
npm run preview
```

Deploy to Vercel or Netlify and add `VITE_OMDB_API_KEY` as an environment variable in the platform settings.

## Features

- Search movies
- View movie details (modal)
- Error handling
- Responsive layout with Tailwind

## Next steps / Stretch
- Favorites (localStorage)
- Pagination
- Trailers via YouTube
