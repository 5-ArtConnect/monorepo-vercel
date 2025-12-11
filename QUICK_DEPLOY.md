# 🚀 VERCEL DEPLOYMENT - QUICK REFERENCE

## ⚡ LANGKAH CEPAT

### 1️⃣ PERSIAPAN (5-10 menit)
```bash
# Setup database cloud (pilih salah satu)
- Neon: https://neon.tech (✅ Recommended)
- Supabase: https://supabase.com
- Railway: https://railway.app

# Setup Cloudinary
- Login: https://cloudinary.com
- Ambil credentials: Cloud Name, API Key, API Secret
```

### 2️⃣ DEPLOY BACKEND (5 menit)
```bash
# Via Vercel Dashboard:
1. Login vercel.com
2. New Project → Import dari GitHub
3. Root Directory: backend
4. Add Environment Variables (lihat list di bawah)
5. Deploy
6. Catat Backend URL
```

**Environment Variables Backend:**
```
NODE_ENV=production
PGUSER=xxx
PGHOST=xxx
PGDATABASE=xxx
PGPASSWORD=xxx
PGPORT=5432
JWT_SECRET=xxx
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

### 3️⃣ DEPLOY FRONTEND (3 menit)
```bash
# Via Vercel Dashboard:
1. New Project → Import sama repo
2. Root Directory: frontend
3. Framework: Vite
4. Add Environment Variables
5. Deploy
```

**Environment Variables Frontend:**
```
VITE_API_BASE_URL=https://[backend-url]/api
```

### 4️⃣ UPDATE CORS (2 menit)
```bash
# Update backend/index.js allowedOrigins dengan Frontend URL
# Push ke GitHub → Auto re-deploy
```

---

## 📦 DATABASE SETUP COMMANDS

```sql
-- Connect to your cloud database
psql -h [HOST] -U [USER] -d [DATABASE]

-- Run schema
\i backend/database/schema.sql

-- Run seed
\i backend/database/seed.sql

-- Verify
\dt
SELECT COUNT(*) FROM users;
```

---

## 🧪 TESTING COMMANDS

```bash
# Test Backend API
curl https://[backend-url]/api/artworks

# Test dengan Postman
Import: backend/documentation/postman/

# Check Frontend
Open: https://[frontend-url]
```

---

## 🛠️ COMMON ISSUES & FIXES

| Issue | Solution |
|-------|----------|
| CORS Error | Update allowedOrigins di backend/index.js |
| Database Connection Failed | Check SSL config & env vars |
| 404 on Frontend Routes | Ensure vercel.json routes correct |
| Env vars not working | Prefix dengan VITE_ untuk frontend |
| Build Failed | Check Node version compatibility |

---

## 📱 VERCEL CLI (Alternative)

```bash
# Install
npm install -g vercel

# Deploy Backend
cd backend
vercel --prod

# Deploy Frontend
cd frontend
vercel --prod
```

---

## 🔗 USEFUL LINKS

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Neon Console:** https://console.neon.tech
- **Cloudinary Dashboard:** https://cloudinary.com/console
- **Full Guide:** See DEPLOYMENT_GUIDE.md

---

## ⏱️ TOTAL TIME: ~20-30 menit
## 💰 TOTAL COST: FREE (dengan free tiers)

---

**Need Help?** Check DEPLOYMENT_GUIDE.md atau DEPLOYMENT_CHECKLIST.md
