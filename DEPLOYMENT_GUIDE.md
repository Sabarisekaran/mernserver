# MERN Project Deployment Guide

## Project Structure
```
mern/
├── client/          (Hosting: Vercel)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   └── .vercelignore
└── server/          (Hosting: Render)
    ├── db/
    ├── routes/
    ├── config.env
    ├── server.js
    └── package.json
```

---

## COMPLETE DEPLOYMENT PROCESS (Step-by-Step)

### PHASE 1: PREPARATION (Local Setup)

#### Step 1: Update Server Package.json
Add the `start` script to your server's package.json:
```json
"scripts": {
  "start": "node server.js",
  "dev": "node server.js"
}
```

#### Step 2: Configure CORS in Server
Your server.js already has CORS configured for Vercel client. Ensure it's set to:
```javascript
app.use(cors({
  origin: "https://mernprojectday2.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
```

#### Step 3: Verify Environment Variables
**Server (config.env should contain):**
```
MONGO_URI=your_mongodb_connection_string
PORT=5050
```

**Client: Create .env.local in client folder:**
```
VITE_API_URL=https://mernserver-hotl.onrender.com
```

#### Step 4: Update API Calls in Client
Your client API calls should use the environment variable. Replace hardcoded URLs with:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';
fetch(`${API_URL}/record/`);
```

---

### PHASE 2: GITHUB SETUP

#### Step 5: Push to GitHub
```bash
cd d:\programproject_2\mern

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial MERN project setup for deployment"

# Create new repository on GitHub (https://github.com/new)
# Then push to it:
git remote add origin https://github.com/YOUR_USERNAME/mern-project.git
git branch -M main
git push -u origin main
```

---

### PHASE 3: DEPLOY SERVER TO RENDER

#### Step 6: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account
3. Authorize Render to access your GitHub repositories

#### Step 7: Create Web Service on Render
1. Click "New +" → "Web Service"
2. Select your GitHub repository (`mern-project`)
3. Configure:
   - **Name:** `mernprojectday2backend` (or any name)
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free (or paid if needed)

#### Step 8: Add Environment Variables in Render
In Render dashboard, go to your Web Service → "Environment":
```
MONGO_URI=your_mongodb_connection_string
PORT=5050
```

#### Step 9: Deploy
- Click "Create Web Service"
- Render will automatically deploy
- Get your server URL: `https://mernserver-hotl.onrender.com`

#### Step 10: Keep Server Awake (Optional)
- Free Render services spin down after inactivity
- Consider upgrading to paid plan or use a health check service

---

### PHASE 4: DEPLOY CLIENT TO VERCEL

#### Step 11: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub account
3. Authorize Vercel to access your GitHub repositories

#### Step 12: Import Project to Vercel
1. Click "Add New..." → "Project"
2. Select your GitHub repository (`mern-project`)
3. Configure:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

#### Step 13: Add Environment Variables in Vercel
In Vercel project settings → "Environment Variables":
```
VITE_API_URL=https://mernserver-hotl.onrender.com
```

#### Step 14: Deploy
- Click "Deploy"
- Vercel will build and deploy automatically
- Get your client URL: `https://mernprojectday2.vercel.app`

#### Step 15: Update Server CORS
Go back to your server and update CORS origin to match your Vercel URL:
```javascript
app.use(cors({
  origin: "https://YOUR_VERCEL_URL.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
```
Then redeploy server on Render.

---

### PHASE 5: TESTING & VERIFICATION

#### Step 16: Test the Application
1. Open your Vercel client URL in browser
2. Try creating, reading, updating, and deleting records
3. Check browser console for errors
4. Check Render server logs for issues

#### Step 17: Debugging (If Issues Arise)
**Client Issues:**
- Open browser DevTools (F12)
- Check "Console" tab for errors
- Check "Network" tab to see API calls
- Verify VITE_API_URL is correct in Vercel env vars

**Server Issues:**
- Go to Render dashboard → your web service
- Click "Logs" to view server logs
- Check MongoDB connection string is correct
- Ensure CORS origin matches your client URL

---

## QUICK REFERENCE: KEY URLs

| Component | URL | Status |
|-----------|-----|--------|
| **Client** | https://mernprojectday2.vercel.app | Vercel |
| **Server** | https://mernserver-hotl.onrender.com | Render |
| **Database** | MongoDB Atlas | MongoDB |

---

## IMPORTANT NOTES

1. **CORS:** Update server's CORS origin whenever your Vercel URL changes
2. **Environment Variables:** Never commit sensitive data (API keys, connection strings)
3. **Cold Starts:** Free Render services may take 30-60 seconds on first request
4. **MongoDB Connection:** Ensure IP whitelist includes Render's IP (or use 0.0.0.0/0 in development)
5. **API URL:** Always use environment variables for API URLs, never hardcode

---

## TROUBLESHOOTING CHECKLIST

- [ ] Server package.json has `start` script
- [ ] Client API calls use `VITE_API_URL` environment variable
- [ ] Server CORS includes your Vercel URL
- [ ] Render environment variables are set correctly
- [ ] Vercel environment variables are set correctly
- [ ] MongoDB connection string is valid and accessible
- [ ] GitHub repository is public (or give access)
- [ ] Port is set in server environment (not hardcoded)
