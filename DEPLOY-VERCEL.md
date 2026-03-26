# Deploy to Vercel + Neon (Free, No Credit Card)

## Overview

This deployment uses:
- **Vercel** - Free hosting for Laravel (serverless)
- **Neon** - Free PostgreSQL database (no credit card needed)

---

## Step 1: Create Neon Database

1. Go to **https://neon.tech**
2. Click **"Sign Up"** → Use GitHub login
3. Create a new project:
   - Name: `nestle-retailer-direct`
   - Region: Choose closest to you (e.g., `us-east-1`)
4. After creation, copy the **Connection String** (looks like):
   ```
   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
   ```

---

## Step 2: Push to GitHub

```bash
git add .
git commit -m "Configure for Vercel + Neon deployment"
git push
```

---

## Step 3: Deploy to Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"** → Use GitHub login
3. Click **"Add New"** → **"Project"**
4. Import your GitHub repository: `raazijawad/Nestle-Retailer-Direct`
5. **Configure Environment Variables** (click "Environment Variables"):

| Name | Value |
|------|-------|
| `APP_NAME` | `Nestle-Retailer-Direct` |
| `APP_ENV` | `production` |
| `APP_DEBUG` | `false` |
| `APP_KEY` | *(leave empty for now)* |
| `DATABASE_URL` | *(paste Neon connection string)* |
| `DB_CONNECTION` | `pgsql` |

6. Click **"Deploy"**

---

## Step 4: Generate APP_KEY

After first deployment:

1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Environment Variables"**
3. Edit `APP_KEY` and set it to:
   ```
   base64:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   (Generate by running locally: `php artisan key:generate --show`)

Or run in Vercel:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel env pull`
3. Then: `php artisan key:generate`
4. Copy the key to Vercel environment

---

## Step 5: Run Migrations

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link to your project
vercel link

# Run migrations
vercel env pull  # Download env vars
php artisan migrate --force
```

### Option B: GitHub Action (Automatic)

Create `.github/workflows/migrate.yml`:

```yaml
name: Run Migrations

on:
  push:
    branches: [main]

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          
      - name: Install dependencies
        run: composer install --no-dev --optimize-autoloader
        
      - name: Run migrations
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: php artisan migrate --force
```

---

## Step 6: Seed Admin User

After migrations:

```bash
php artisan db:seed --class=AdminUserSeeder
```

Or add to database seeder to run automatically.

---

## Access Your App

- **URL:** `https://nestle-retailer-direct-xxxx.vercel.app`
- **Login:** admin@nestle.com
- **Password:** password

---

## Important Notes

### Serverless Limitations

| Feature | Status | Notes |
|---------|--------|-------|
| **Routes** | ✅ Works | All web routes work |
| **Sessions** | ✅ Works | Cookie-based sessions |
| **Cache** | ⚠️ Limited | Use database/array driver |
| **Queues** | ❌ No | Use `sync` driver |
| **WebSockets** | ❌ No | Not supported |
| **File Storage** | ⚠️ Limited | Use cloud storage (S3) |
| **Scheduler** | ❌ No | Use GitHub Actions |

### Cold Starts

- First request after idle: **1-3 seconds**
- Subsequent requests: **~200ms**

### Free Tier Limits

| Resource | Limit |
|----------|-------|
| **Bandwidth** | 100GB/month |
| **Serverless Duration** | 100GB-hours/month |
| **Functions** | Unlimited |
| **Database (Neon)** | 0.5 GB storage |

---

## Troubleshooting

### 500 Error - Missing APP_KEY
```bash
php artisan key:generate --show
# Copy output to Vercel APP_KEY env var
```

### Database Connection Error
- Check DATABASE_URL format includes `?sslmode=require`
- Ensure Neon project is active
- Check IP allowlist in Neon (should be `0.0.0.0/0` for Vercel)

### Migration Errors
```bash
# Check migration status
php artisan migrate:status

# Rollback if needed
php artisan migrate:rollback

# Re-run
php artisan migrate --force
```

### Build Fails
- Check Vercel build logs
- Ensure Node.js 18+ is used
- Clear cache: `vercel --prod`

---

## Update Deployment

After making changes:

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will auto-deploy in ~2-3 minutes.

---

## Remove Card Requirement

If Vercel asks for card:
1. Use **GitHub Student Developer Pack** (if eligible) - no card needed
2. Or use **Netlify** instead (same setup, no card required)
