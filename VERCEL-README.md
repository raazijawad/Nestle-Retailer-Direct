# Vercel Deployment for Laravel

## Quick Deploy

### 1. Create Neon Database
1. Go to https://neon.tech
2. Sign up with GitHub
3. Create project
4. Copy connection string

### 2. Deploy to Vercel
1. Go to https://vercel.com/new
2. Import this repository
3. Add environment variables:
   - `DATABASE_URL` = Neon connection string
   - `APP_KEY` = Run `php artisan key:generate --show` locally
   - `APP_NAME` = Nestle-Retailer-Direct
   - `APP_ENV` = production
   - `APP_DEBUG` = false
   - `DB_CONNECTION` = pgsql

4. Deploy!

---

## If Build Fails

The build may fail due to complexity. Alternative free options:

### **Netlify** (Recommended - No Card)
1. Go to https://netlify.com
2. Drag & drop the `public` folder
3. For Laravel, use: https://github.com/netlify-labs/netlify-functions-laravel

### **Railway** ($5 free credit, no card initially)
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Add PostgreSQL database
4. Railway auto-detects Laravel

### **Fly.io** (Free allowance, card required)
1. Install Fly CLI
2. Run `fly launch` in project folder
3. Follow prompts

---

## Troubleshooting Vercel

### Build Timeout
Vercel build timeout is 5 minutes. If it times out:
- Use `npm run build` which is faster
- Reduce node_modules size

### Memory Error
Add to vercel.json:
```json
"functions": {
  "api/index.php": {
    "memory": 1024
  }
}
```

### 500 Error After Deploy
1. Check logs in Vercel dashboard
2. Ensure APP_KEY is set
3. Run migrations manually
