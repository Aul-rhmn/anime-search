# Anime Search App

A React-based mini project that allows users to search for anime and view detailed information about each selection. The app uses **React**, **TypeScript**, **Redux**, and **React Query** with server-side pagination and instant search.

---

## Overview

This is a two-page React application:

1. **Search Page** – Users can search for anime using a search input with **debouncing** to prevent excessive API calls. Results are paginated server-side.
2. **Detail Page** – Shows detailed information of the selected anime, including poster, titles, synopsis, genres, stats, studios, and trailers.

The app uses **Jikan API** (free, no authentication required).

---

## Features

* Instant search with debouncing (250ms)
* Server-side pagination on the search page
* Redux for state management
* React Router for navigation
* Responsive UI
* Error handling for API failures
* Loading states with skeleton loaders
* SEO-friendly `index.html` metadata

---

## Technical Stack

* React 18+
* TypeScript
* Redux (state management)
* React Query (data fetching & caching)
* React Router DOM (navigation)
* Tailwind CSS (UI styling)
* Vite (build tool)

---

## Live Demo

[https://anime-search-tan.vercel.app/](#https://anime-search-tan.vercel.app/)

---

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Aul-rhmn/anime-search.git
cd animesearch
```

2. Install dependencies using **npm**:

```bash
npm install
```

3. Start the development server on **port 4000**:

```bash
npm run dev
```

4. Open `http://localhost:4000` in your browser.

> ⚠️ Note: No environment variables are needed. The app should run immediately after `npm install` and `npm run dev`.

---

## Usage

1. Type the anime name in the search input.
2. Search results appear instantly (debounced 250ms).
3. Navigate pages using the pagination controls.
4. Click an anime card to see detailed information.
5. Use the back button to return to the previous search page (state preserved via URL parameters).

---

## Bonus Features

* Instant search implementation with cancellation of in-flight requests
* Preserving search state when navigating back from the detail page
* Responsive design for mobile and desktop
* Clean and well-structured TypeScript code

---

## License

This project is for **YoPrint React Coding Project** submission purposes. All code is written in TypeScript and React.

---