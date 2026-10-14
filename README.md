# Travel Planner Dashboard

A travel-planning dashboard built with **React and Vite**, with an **Express API** and **MongoDB** integration. The interface brings trip planning, destination discovery, budget tracking, travel analytics, and account preferences into one place.

**Live demo:** [Travel Planner Dashboard](https://travel-planner-pan.netlify.app/)

> **Project status:** This repository contains a portfolio/demo application with sample trip and account data. It is not connected to live airline, hotel, visa, or booking-provider systems, so booking labels and travel statistics should not be treated as live reservations or real-time data.

## Highlights

- **Travel dashboard** — overview cards for trips, countries, budget, and flights.
- **Trip planning** — create and edit trip details, including destination, dates, budget, travel style, transport, accommodation, meals, and companions.
- **Destination discovery** — browse destination cards and place recommendations with travel imagery.
- **Trip review and export** — review trip details before confirmation and export a confirmation PDF from the interface.
- **Analytics and expenses** — view example travel-expense trends using Recharts.
- **Budget overview** — review example spending categories and budget tips.
- **Preferences** — interact with dashboard settings such as alerts, display mode, and sync preferences.
- **Login screen** — demo sign-in interface backed by the Express API.
- **REST API** — endpoints for trip data, login, collection listing, and service health.

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React 18, Vite 5 |
| UI and animation | CSS, Framer Motion, React Icons |
| Charts | Recharts |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Configuration | dotenv |

## Project Structure

The runnable application is nested inside the repository. Use this directory for the frontend and backend commands.

```text
TRAVEL-PLANNER/
├── .gitignore
├── package.json
├── package-lock.json
└── travel-planner-dashboard/
    └── travel-planner-dashboard/
        ├── index.html
        ├── package.json
        ├── package-lock.json
        ├── server.js
        ├── vite.config.js
        ├── src/
        │   ├── App.jsx
        │   ├── main.jsx
        │   ├── styles.css
        │   ├── components/
        │   │   ├── Cards.jsx
        │   │   ├── ExpenseChart.jsx
        │   │   └── Sidebar.jsx
        │   └── pages/
        │       └── LoginPage.jsx
        └── dist/  # built frontend assets currently tracked in the repository
```

## Run Locally

### 1. Prerequisites

Install:
- Node.js (an active LTS release is recommended)
- npm (included with Node.js)
- Access to a MongoDB database if you want the API to load and save trip data

### 2. Open the application directory

From the repository root:

```bash
cd travel-planner-dashboard/travel-planner-dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the database

Create a local `.env` file in `travel-planner-dashboard/travel-planner-dashboard/`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/travelPlanner
PORT=5000
```

Use your own MongoDB connection string if you use MongoDB Atlas. Do not commit the `.env` file or publish credentials.

### 5. Start the backend

In the application directory:

```bash
npm run server
```

The API uses port `5000` by default. The backend exposes a health endpoint at `http://localhost:5000/health`.

### 6. Start the frontend

Open a second terminal in the same application directory:

```bash
npm run dev
```

Open the local URL printed by Vite, normally:

```text
http://localhost:5173
```

Vite is configured to proxy `/api` requests to the backend at `http://localhost:5000`.

### 7. Create a production build

```bash
npm run build
npm run preview
```

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Check whether the backend process is responding |
| GET | `/api/trips` | Retrieve stored trips |
| PUT | `/api/trips` | Replace the stored trip list |
| POST | `/api/login` | Validate demo login credentials |
| GET | `/api/collections` | List MongoDB collection names |

The API requires a working MongoDB connection for database-backed routes. The `/health` response indicates backend health; it should not be taken as proof that all database operations are working.

## Screenshots

<img width="1134" height="615" alt="p31" src="https://github.com/user-attachments/assets/31098e7a-00e8-4b84-8c04-1eb53673c12d" />


<img width="1357" height="678" alt="P32" src="https://github.com/user-attachments/assets/3a047c75-d73c-46a7-9f84-38c3ddca9b7e" />



## Important Security and Production Notes

This repository needs security work before deployment or use with real accounts:

- **A `.env` file is currently tracked in the repository.** Treat any credentials it contains as exposed: rotate/revoke them, remove the file from Git tracking, and add `.env` to `.gitignore`. Deleting the file in a new commit alone does not erase it from Git history.
- The backend source contains a hard-coded MongoDB connection-string fallback. Remove that fallback and require configuration through environment variables before deployment.
- The demo login implementation compares passwords as plain text, and seed data includes a demo account. Do not use real passwords or personal information; use password hashing and a proper authentication/session strategy before production.
- Add request validation, authorization, rate limiting, and safer error responses before exposing the API publicly.
- Demo analytics and destination/booking content may be static sample data. Confirm each feature's behavior in the running application before describing it as a live integration.

## Future Improvements

- Add genuine screenshots and a short demo GIF.
- Add automated tests for trip creation, editing, authentication, and API validation.
- Add secure password hashing and session/token handling.
- Improve environment configuration and deployment documentation.
- Connect real travel-provider APIs only when appropriate credentials and integrations are implemented.

## Author

Created by [PreciousBharath](https://github.com/PreciousBharath).

---

If you find a bug or want to suggest an improvement, please open an issue in this repository.
