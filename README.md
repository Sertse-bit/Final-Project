🎬 Movie Database App

A Vite + React movie database app to search, browse, and view detailed movie information using the OMDb API.

## 🌟 Features

- 🎥 Browse movies by categories (Action, Comedy, Sci-Fi, Romance, Horror, Drama, Adventure)
- 🔍 Search movies by title
- 🎞️ View movie details (title, year, genre, rating, runtime, plot)
- 🖼️ Fallback image when posters are missing
- ⚡ Infinite scroll / pagination
- 📱 Responsive layout
- 🔐 Sign in / sign up modal UI (frontend-only placeholder)

## 🛠️ Tech Stack

- React 18
- Vite 5
- Tailwind CSS
- Lucide React icons

## 🚀 Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```bash
VITE_OMDB_API_KEY=your_api_key_here
```

> You can get an API key from https://www.omdbapi.com/apikey.aspx.

### 3) Start development server

```bash
npm run dev
```

### 4) Open the app

After running `npm run dev`, open:

- `http://localhost:5173`

To test the production build locally:

```bash
npm run build
npm run preview
```

Then open:

- `http://localhost:4173`

## ✅ Where to test (quick checks)

- **Home load:** confirm movies appear on first render.
- **Search:** type a movie title in the header search bar and verify results update.
- **Category tabs:** click a category and verify visible cards filter by genre.
- **Movie details:** click a movie card and verify modal content (year/genre/rating/runtime/plot).
- **Infinite scroll:** scroll to the bottom and verify more movies load until “No more movies.” appears.
- **Missing API key path:** remove `VITE_OMDB_API_KEY` and confirm the app shows a helpful setup error.

### Other scripts

```bash
npm run build
npm run preview
```
