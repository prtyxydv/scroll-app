# Scroll News App

A complete production-ready scroll-based news system with a mobile-first UI.

## Project Structure
- `/backend`: Node.js + Express + MongoDB (Mongoose)
- `/frontend`: React + Vite + Tailwind CSS (Web App)
- `/mobile-app`: Expo + React Native (iOS/Android App)

## Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or a URI from Atlas)
- Expo Go app (for mobile testing)

## Setup Instructions

### 1. Backend
1. Go to `backend/`
2. Update `.env` with your `MONGO_URI`.
3. Run `npm install`.
4. Run `node seed.js` to populate initial news.
5. Start server: `node server.js`.

### 2. Web Frontend
1. Go to `frontend/`
2. Run `npm install`.
3. Start dev server: `npm run dev`.
4. Open `http://localhost:5173`.

### 3. Mobile App
1. Go to `mobile-app/`
2. Run `npm install`.
3. Start Expo: `npx expo start`.
4. Scan the QR code with your Expo Go app.
5. *Note: For physical devices, update `mobile-app/src/api/axios.js` with your computer's local IP address instead of `localhost`.*

## Features
- **Infinite Scroll Feed:** High-performance vertical scroll with snapping.
- **JWT Auth:** Secure signup and login for users and admins.
- **Admin Panel:** Separate dashboard to publish news and trigger notifications.
- **Bookmarks:** Save stories to read later.
- **Push Notifications:** Integrated with Expo Notifications and Firebase (placeholder).
