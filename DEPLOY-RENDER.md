# Deploy to Render - Step by Step

## Prerequisites
- GitHub account (free)
- Render account (free) - sign up at https://render.com

---

## Step 1: Push to GitHub

### Option A: Using Git GUI (Easier)
1. Open **GitHub Desktop** or your preferred Git client
2. Add this project as a repository
3. Commit all files
4. Publish to GitHub (create new repository)
5. Make sure `render.yaml` is included

### Option B: Using Command Line
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit for Render deployment"

# Create repo on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/nestle-retailer-direct.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Render

1. **Go to https://render.com**
2. **Sign up/Login** (use GitHub login for easiest setup)
3. Click **"New +"** → **"Blueprint"**
4. **Connect your GitHub repository**
   - Find `nestle-retailer-direct` in the list
   - Click **"Connect"**
5. **Render will auto-detect** the `render.yaml` file
6. Click **"Apply"** to start deployment

---

## Step 3: Wait for Deployment

- First deployment takes **5-10 minutes**
- Render will:
  - Create PostgreSQL database
  - Install dependencies
  - Build assets (npm run build)
  - Run migrations
  - Start the web server

---

## Step 4: Get Your URL

After deployment completes:

1. Go to your service dashboard on Render
2. Copy the URL (looks like: `https://nestle-retailer-direct-xxxx.onrender.com`)
3. **Share this URL** to access from your other laptop

---

## Step 5: Login Credentials

After deployment completes, login with:

- **Email:** admin@nestle.com
- **Password:** password

The admin user is automatically created by the database seeder.

---

## Access Your App

- **URL:** `https://nestle-retailer-direct-xxxx.onrender.com`
- **Login:** admin@nestle.com
- **Password:** password

---

## Troubleshooting

### Build Fails
- Check "Logs" tab in Render dashboard
- Common issue: Node version - Render uses Node 18+ by default

### Database Migration Fails
- The migrations use MySQL syntax, may need PostgreSQL compatibility
- Check logs for specific errors

### Site Loads Slowly on First Visit
- Free tier "spins down" after 15 minutes of inactivity
- First request after idle takes ~30 seconds to wake up

### 500 Error
- Check logs in Render dashboard
- May need to set APP_KEY manually in Environment Variables

---

## Important Notes

### Free Tier Limitations
- **500 hours/month** of uptime (enough for ~21 days)
- Service sleeps after **15 minutes** of inactivity
- **Database:** 1GB storage limit
- **Bandwidth:** 100GB/month

### PostgreSQL vs MySQL
This deployment uses **PostgreSQL** (Render's default). The migrations should work, but if you encounter issues:
- Some MySQL-specific syntax may need adjustment
- Let me know and I can fix any compatibility issues

---

## Cost Upgrade (Optional)

To avoid sleep and get better performance:
- **Starter Plan:** $7/month for web service
- **Database:** Free tier is usually sufficient for development
