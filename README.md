# SCROLL 📜

A premium, intelligence-driven news scroll platform for the modern age. Experience high-density knowledge through an immersive, Reels-style vertical feed.

## 🚀 Mobile App (Android APK)

The Android app is automatically built using GitHub Actions.

### How to Download:
1. **Login to GitHub**: You **MUST** be logged into your GitHub account to see artifacts.
2. Go to the **[Actions Tab](https://github.com/prtyxydv/scroll-app/actions)**.
3. Click on the most recent **Green Checkmark (✅)** run (titled: "Upgrade build server to Java 21...").
4. Scroll to the very bottom to the **Artifacts** section.
5. Click **`scroll-app-debug`** to download.
6. Unzip the file and install the `.apk` on your Android device.

---

## 💎 Features

- **Intelligence Dashboard**: Real-time localized weather and automated Gold market rates (INR).
- **Personalized Feed**: A logic-driven algorithm that re-ranks news categories based on your likes and bookmarks.
- **Trending Engine**: Dynamic "Hottest Right Now" horizontal carousel powered by real engagement data.
- **Snap-to-Page UI**: Immersive, full-screen vertical scrolling with strict page-snapping and zero clutter.
- **100+ Real Stories**: Pre-seeded with 100+ high-quality, India-centric and international news articles.

---

## ✍️ Author Guide (Publishing News)

Any user promoted to **Admin** can manage the global feed directly from their phone.

1. **Sign Up**: Create an account within the app.
2. **Promote**: Use the `backend/promoteAdmin.js` script to grant Admin rights.
3. **Publish**: Once logged in as an Admin, a **Plus (+)** icon appears in the bottom navigation.
4. **Global Update**: Articles published via this interface are instantly synced to every device running the app worldwide.

---

## 🛠️ Technical Architecture

- **Frontend**: React + Vite + Tailwind CSS + Capacitor (Native bridge).
- **Backend**: Node.js + Express + MongoDB Atlas (Deployed on Render).
- **Automation**: GitHub Actions for CI/CD and automated APK generation.
- **APIs**: Open-Meteo (Weather), Metals.live (Gold), Internal Analytics (Engagement).

---

## 🌐 Web Access (iOS/Desktop)

For iPhones or Desktop use, the app behaves as a **Progressive Web App (PWA)**:
1. Open the URL in Safari (iOS) or Chrome (Android).
2. Tap **Share** (iOS) or **Menu** (Android).
3. Select **"Add to Home Screen"**.
4. The Scroll icon will appear on your phone just like a native app.

---

© 2026 Scroll Intelligence Layer. All rights reserved.
