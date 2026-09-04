# Deployment Guide (Vercel)

This project can be deployed seamlessly to Vercel for the frontend, while the backend can be hosted on platforms like Render, Railway, or Heroku.

## How the `localhost` Port Issues Were Fixed

Before deployment, all API requests from the frontend were hardcoded to `http://localhost:5001`. This is problematic in production, as the frontend needs to communicate with the deployed backend URL, not the user's local machine.

Here is how the issue was resolved:
1. **Dynamic Environment Variable (`VITE_API_URL`)**: 
   We introduced `import.meta.env.VITE_API_URL` to the frontend.
2. **Updated `useApi.js` & `Chatbot.jsx`**:
   Any `fetch` calls or API routes were modified to first check for the environment variable, and fall back to localhost for local development:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
   ```
   Now, during production on Vercel, the app will use the deployed backend's URL as long as `VITE_API_URL` is set in Vercel's Environment Variables.

---

## Deploying the Frontend to Vercel

Vercel is highly optimized for Vite and React applications. Follow these steps to deploy the frontend:

### 1. Push Your Code to GitHub
Ensure your latest code (including the dynamic URL fixes above) is committed and pushed to a GitHub repository.

### 2. Connect to Vercel
1. Go to [Vercel](https://vercel.com/) and sign in.
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.

### 3. Configure the Project
Since your frontend is in a subdirectory (`/frontend`), you need to configure the build settings correctly:
- **Framework Preset**: Vercel should auto-detect **Vite**.
- **Root Directory**: Click "Edit" and select the `frontend` folder.
- **Build Command**: `npm run build` (default)
- **Output Directory**: `dist` (default)
- **Install Command**: `npm install` (default)

### 4. Set Environment Variables
In the Vercel dashboard for your project, go to the **Environment Variables** section before deploying. Add the following:
- `VITE_API_URL`: The URL of your deployed backend (e.g., `https://hellfire-backend.onrender.com`). *Ensure there is no trailing slash.*
- Add any other frontend keys (like your Clerk publishable key) if they are not already checked in.

### 5. Deploy
Click the **Deploy** button. Vercel will install dependencies, build your Vite app, and assign it a live URL!

---

## Deploying the Backend (to Render)

Vercel is primarily for frontends. Since your backend is a long-running Node.js/Express server (and requires a connection to MongoDB), we will deploy the `backend` folder to **Render.com**, which is beginner-friendly and has a free tier.

Here is a step-by-step guide:

### 1. Create a Render Account
Go to [Render](https://render.com/) and sign up using your GitHub account.

### 2. Create a New Web Service
1. On the Render Dashboard, click **New +** and select **Web Service**.
2. Choose **Build and deploy from a Git repository**.
3. Connect your GitHub account and select your project repository (the same one you pushed for Vercel).

### 3. Configure the Web Service
Fill out the setup form with these exact settings:
- **Name**: Give it a name (e.g., `hellfire-backend`).
- **Region**: Choose the one closest to you.
- **Branch**: `main` (or whatever branch you push to).
- **Root Directory**: `backend` *(⚠️ VERY IMPORTANT: This tells Render to only look inside the backend folder!)*
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start` *(Note: ensure your `backend/package.json` has `"start": "node server.js"` in the scripts section).*
- **Instance Type**: Free tier is fine!

### 4. Setup Environment Variables
Scroll down to the **Environment Variables** section and click **Add Environment Variable**. You need to copy the variables from your local `backend/.env` file. 

Add the following Keys and their Values:
1. **Key**: `MONGO_URI`
   - **Value**: *(If you use MongoDB Atlas, paste your cloud connection string here. If you were using local MongoDB, you MUST create a free cluster on [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) and paste that connection string here).*
2. **Key**: `GEMINI_API_KEY`
   - **Value**: *(Paste your Google Gemini API key here)*
3. **Key**: `CLERK_PUBLISHABLE_KEY`
   - **Value**: *(Paste your Clerk publishable key from `backend/.env`)*
4. **Key**: `CLERK_SECRET_KEY`
   - **Value**: *(Paste your Clerk secret key from `backend/.env`)*

*(Note: You do NOT need to add `PORT`. Render will automatically assign one).*

### 5. Deploy!
Click **Create Web Service**. Render will now install your packages and start the server. 
It will take a few minutes. Once you see `Server running...` in the logs, look at the top left of the Render dashboard for your live URL (it will look something like `https://hellfire-backend-abc.onrender.com`).

---

## 🔗 The Final Connection (Linking Frontend to Backend)

Now that your backend is live on Render:
1. Copy the Render URL (`https://hellfire-backend-abc.onrender.com`).
2. Go back to your **Vercel** dashboard (where you deployed the frontend).
3. Go to **Settings** -> **Environment Variables**.
4. Add a new variable:
   - **Key**: `VITE_API_URL`
   - **Value**: Paste the Render URL here *(Make sure there is NO slash `/` at the very end of the URL)*.
5. Go to the **Deployments** tab in Vercel, click the three dots on your latest deployment, and click **Redeploy**.

**Congratulations! Your full-stack app is now live!**
