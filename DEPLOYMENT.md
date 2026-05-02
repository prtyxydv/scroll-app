# Deployment & Author Guide: Scroll

This guide explains how to make your app live globally and how any "Author" can update content from their phone.

---

## 1. Global Deployment (Make it Live)

### Step A: Push to GitHub
I have already initialized git and committed your code.
1. Create a **new public repository** on GitHub named `scroll-app`.
2. Run these commands in your terminal:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/scroll-app.git
   git branch -M main
   git push -u origin main
   ```

### Step B: Deploy Backend (Render.com)
1. Sign up for [Render.com](https://render.com).
2. Click **New > Web Service** and connect your GitHub repo.
3. Set **Root Directory** to `backend`.
4. **Environment Variables**: Add everything from your local `backend/.env` (especially `MONGO_URI` and `JWT_SECRET`).

### Step C: Deploy Frontend (Vercel.com)
1. Sign up for [Vercel.com](https://vercel.com).
2. Click **Add New > Project** and import your GitHub repo.
3. Set **Root Directory** to `frontend`.
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. In `frontend/src/api/axios.js`, ensure the `baseURL` points to your **Live Render URL**.

---

## 2. Multi-Author Publishing (How it works)

Any person can become an **Author** and update the app from their phone:

1. **Sign Up**: The person creates a normal account on your live app.
2. **Promotion**: You (the owner) promote them to `admin` in the MongoDB database (using the `promoteAdmin.js` script or MongoDB Atlas UI).
3. **The "Author" Experience**:
   - Once they log in on their phone, they will see the **Admin (+) icon** in the bottom bar.
   - They can click it to **Publish New Articles** or **Delete** old ones.
   - **Instant Update**: As soon as they hit "Publish", the news is pushed to the database and appears on **every phone globally** that has the app installed.

---

## 3. Install on any Phone (PWA)

Your app is already a **Progressive Web App**:
- **Android**: Open your live URL in Chrome > Tap 3 dots > **"Install App"**.
- **iOS**: Open your live URL in Safari > Tap Share > **"Add to Home Screen"**.

This puts a **"Scroll" icon** on their home screen just like a real app store app.
