# Eventory – Events Discovery & Booking Platform

A modern bilingual (Arabic + English) landing page and events discovery platform with RTL/LTR support.

## Tech Stack

- **Frontend:** React + TypeScript (Vite), TailwindCSS, React Router, React Query
- **i18n:** react-i18next (Arabic default, RTL support)
- **Backend:** Node.js + Express (TypeScript), mock APIs

## Quick Start

### 1. Install dependencies

```bash
npm run install:all
```

Or manually:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

### 2. Run both client and server

```bash
npm run dev
```

This starts:
- **Client** at http://localhost:5173
- **Server** at http://localhost:3001

### Or run separately

**Terminal 1 – Server:**
```bash
cd server && npm run dev
```

**Terminal 2 – Client:**
```bash
cd client && npm run dev
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # Axios client, React Query hooks
│   │   ├── components/    # Header, HeroSlider, EventCard, etc.
│   │   ├── i18n/         # Arabic & English translations
│   │   ├── pages/        # Home, Category, EventDetails, Login
│   │   └── main.tsx
│   └── ...
├── server/                 # Express backend
│   ├── src/
│   │   ├── data/seed.ts   # Mock events (30–60 items)
│   │   ├── middleware/    # Auth middleware
│   │   ├── routes/       # categories, events, auth, bookings
│   │   └── index.ts
│   └── ...
└── package.json           # Root scripts
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List categories |
| GET | `/api/events` | List events (query: category, search, location, sort) |
| GET | `/api/events/:id` | Event details |
| POST | `/api/auth/login` | Mock login (returns token) |
| POST | `/api/bookings` | Create booking (requires Bearer token) |

## Features

- **Landing page:** Hero slider, category sections, app promo, footer
- **Category listing:** Filters (location, sort), search
- **Event details:** Gallery, book button, redirect to login if not authenticated
- **Mock auth:** Any email/password works; token stored in localStorage

## Mock Auth

For demo purposes, any email and password will log you in. The token is stored in `localStorage` and used for booking requests.

---

*Powered by mariam*
