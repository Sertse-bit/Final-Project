🎬 Movie Database App

A Vite + React movie database app with a lightweight Node backend for dynamic movie features and an AI-style movie assistant.

## 🌟 Features

- 🎥 Browse movies by categories (Action, Comedy, Sci-Fi, Romance, Horror, Drama, Adventure)
- 🔍 Search movies by title from OMDb
- 🎞️ View movie details (title, year, genre, rating, runtime, plot)
- ⚡ Infinite scroll / pagination
- ✨ Dynamic spotlight banner from backend
- 🤖 AI Movie Assistant chat panel powered by backend agent endpoint
- ▶️ Real-time watch in movie details (click **Watch Now** to play video)
- 📱 Responsive layout

## 🧱 Architecture

- **Frontend**: Vite + React + Tailwind (`src/`)
- **Backend**: Node HTTP server (`backend/server.mjs`) with endpoints:
  - `GET /api/health`
  - `GET /api/dynamic/spotlight`
  - `GET /api/discover`
  - `POST /api/agent/chat`

## 🛠️ Tech Stack

- React 18
- Vite 5
- Tailwind CSS
- Lucide React icons
- Node.js (built-in HTTP backend)

## 🚀 Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```bash
VITE_OMDB_API_KEY=your_api_key_here   # optional (demo key fallback exists)
VITE_BACKEND_URL=http://localhost:8787 # optional for non-default backend URL
```

### 3) Run backend (optional, terminal 1)

```bash
npm run backend
```

### 4) Run frontend (terminal 2)

```bash
npm run dev
```

### 5) Open the app

- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:8787/api/health`

## ✅ Where to test (quick checks)

- **Home load**: movies render after startup.
- **Dynamic spotlight**: top banner shows “Dynamic Spotlight” and changes by category (falls back locally if backend is unavailable).
- **AI assistant**: ask for recommendations (for example: “Suggest a horror movie night”). Works in offline fallback mode if backend is down.
- **Movie details**: click a movie card and confirm modal content.
- **Real-time watch**: inside movie details, click **Watch Now** and verify the video player starts.
- **Infinite scroll**: scroll to load more movies.

### Other scripts

```bash
npm run build
npm run preview
```
