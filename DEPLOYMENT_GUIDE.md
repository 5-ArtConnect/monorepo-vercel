# 🚀 PANDUAN DEPLOYMENT VERCEL - ArtConnect

## 📌 ARSITEKTUR DEPLOYMENT

Project ini menggunakan **2 deployment terpisah**:
1. **Backend API** (Express.js) → Vercel Serverless Function
2. **Frontend** (React + Vite) → Vercel Static Site

---

## 🎯 PERSIAPAN SEBELUM DEPLOY

### 1. **Install Vercel CLI** (Optional tapi recommended)
```bash
npm install -g vercel
```

### 2. **Setup Database PostgreSQL di Cloud**

**Pilihan Database Cloud:**
- ✅ **Neon** (Recommended - Free tier generous): https://neon.tech
- ✅ **Supabase**: https://supabase.com
- ✅ **Railway**: https://railway.app
- ✅ **ElephantSQL**: https://www.elephantsql.com

**Langkah Setup Database:**
1. Buat akun di salah satu provider
2. Buat database PostgreSQL baru
3. Jalankan schema dan seed:
   ```bash
   # Connect ke database cloud dan run:
   psql -h your-host -U your-user -d your-database -f backend/database/schema.sql
   psql -h your-host -U your-user -d your-database -f backend/database/seed.sql
   ```
4. Catat connection string yang diberikan

### 3. **Setup Cloudinary**
1. Login ke https://cloudinary.com
2. Dapatkan credentials:
   - Cloud Name
   - API Key
   - API Secret
3. Upload existing images menggunakan script:
   ```bash
   cd backend
   node scripts/upload-cloudinary.js
   ```

### 4. **Setup Redis (Optional)**
- Jika menggunakan Redis untuk caching
- Provider: **Upstash Redis** (https://upstash.com) - Free tier available

---

## 🔧 DEPLOYMENT BACKEND

### **Metode 1: Via Vercel Dashboard (Recommended untuk pertama kali)**

1. **Push code ke GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import Project ke Vercel:**
   - Login ke https://vercel.com
   - Click "Add New Project"
   - Import repository Anda dari GitHub
   - Pilih `backend` folder sebagai root directory

3. **Configure Project:**
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** (kosongkan atau: `echo "No build needed"`)
   - **Output Directory:** (kosongkan)
   - **Install Command:** `npm install`

4. **Set Environment Variables:**
   
   Di Vercel Dashboard → Settings → Environment Variables, tambahkan:
   ```
   NODE_ENV=production
   PORT=3000
   
   PGUSER=your_database_user
   PGHOST=your_database_host
   PGDATABASE=your_database_name
   PGPASSWORD=your_database_password
   PGPORT=5432
   
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters
   
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Deploy:**
   - Click "Deploy"
   - Tunggu proses selesai
   - Catat URL backend (misal: `https://artconnect-backend.vercel.app`)

### **Metode 2: Via Vercel CLI**

```bash
cd backend
vercel

# Follow prompts:
# - Setup and deploy: Y
# - Which scope: (pilih account Anda)
# - Link to existing project: N
# - Project name: artconnect-backend
# - Directory: ./
# - Override settings: N

# Set environment variables
vercel env add PGUSER
vercel env add PGHOST
vercel env add PGDATABASE
vercel env add PGPASSWORD
vercel env add PGPORT
vercel env add JWT_SECRET
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
vercel env add NODE_ENV

# Deploy to production
vercel --prod
```

---

## 🎨 DEPLOYMENT FRONTEND

### **Metode 1: Via Vercel Dashboard**

1. **Update Environment Variable:**
   
   Buat file `frontend/.env.production`:
   ```env
   VITE_API_BASE_URL=https://artconnect-backend.vercel.app/api
   ```

2. **Import Project:**
   - Di Vercel Dashboard → Add New Project
   - Import repository yang sama (dari GitHub)
   - Pilih `frontend` folder sebagai root directory

3. **Configure Project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Set Environment Variables:**
   ```
   VITE_API_BASE_URL=https://artconnect-backend.vercel.app/api
   ```

5. **Deploy:**
   - Click "Deploy"
   - Frontend akan tersedia di URL seperti: `https://artconnect.vercel.app`

### **Metode 2: Via Vercel CLI**

```bash
cd frontend

# Create production env file
echo "VITE_API_BASE_URL=https://artconnect-backend.vercel.app/api" > .env.production

vercel

# Follow prompts:
# - Setup and deploy: Y
# - Project name: artconnect-frontend
# - Directory: ./

# Set environment variables
vercel env add VITE_API_BASE_URL

# Deploy to production
vercel --prod
```

---

## ⚙️ KONFIGURASI CORS

**PENTING:** Update CORS di backend untuk menerima request dari frontend.

Edit `backend/index.js`:

```javascript
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://artconnect.vercel.app', // Production frontend URL
  'https://your-custom-domain.com' // Jika pakai custom domain
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
```

---

## 🔍 TROUBLESHOOTING

### **Backend Issues:**

1. **Database Connection Failed:**
   - Pastikan SSL enabled di db.js
   - Cek environment variables sudah benar
   - Test connection string di local dulu

2. **Serverless Function Timeout:**
   - Vercel limit: 10 seconds (Hobby), 60 seconds (Pro)
   - Optimize query yang lambat
   - Gunakan pagination

3. **Module Not Found:**
   ```bash
   # Ensure package.json di root backend folder
   # Re-deploy dengan clear cache
   ```

### **Frontend Issues:**

1. **API Not Connecting:**
   - Cek `VITE_API_BASE_URL` benar
   - Pastikan backend sudah deploy
   - Check browser console untuk CORS errors

2. **Environment Variables Not Working:**
   - Prefix HARUS `VITE_` untuk Vite
   - Rebuild setelah update env vars
   - Clear cache dan re-deploy

3. **404 on Refresh:**
   - Pastikan `vercel.json` ada di frontend
   - Routes redirect ke index.html

---

## 🎯 TIPS & BEST PRACTICES

### **1. Environment Variables Security:**
- ❌ JANGAN commit file `.env` ke Git
- ✅ Gunakan `.env.example` sebagai template
- ✅ Set semua env vars di Vercel Dashboard

### **2. Database Best Practices:**
- ✅ Gunakan connection pooling (sudah ada di `pg.Pool`)
- ✅ Enable SSL untuk production database
- ✅ Backup database secara berkala
- ✅ Use indexes untuk query optimization

### **3. Performance Optimization:**
- ✅ Enable compression di Express
- ✅ Implement caching (Redis/in-memory)
- ✅ Optimize images via Cloudinary transformations
- ✅ Use lazy loading di frontend

### **4. Monitoring:**
- ✅ Setup error tracking (Sentry)
- ✅ Monitor Vercel Analytics
- ✅ Check function logs di Vercel Dashboard

### **5. Custom Domain (Optional):**
```bash
# Add custom domain via Vercel Dashboard
# Settings → Domains → Add Domain
# Update DNS records sesuai instruksi
```

### **6. Continuous Deployment:**
- Setelah setup, setiap push ke `main` akan auto-deploy
- Use branch deployments untuk testing:
  ```bash
  git checkout -b staging
  git push origin staging
  # Vercel akan create preview deployment
  ```

---

## 📝 CHECKLIST DEPLOYMENT

### **Pre-Deployment:**
- [ ] Database cloud sudah setup dan running
- [ ] Schema & seed data sudah dijalankan
- [ ] Cloudinary images sudah diupload
- [ ] Environment variables sudah disiapkan
- [ ] `.gitignore` sudah update
- [ ] Code sudah di-push ke GitHub

### **Backend Deployment:**
- [ ] Project imported ke Vercel
- [ ] Root directory set ke `backend`
- [ ] Environment variables configured
- [ ] Deployment success
- [ ] API endpoints tested (gunakan Postman)

### **Frontend Deployment:**
- [ ] `VITE_API_BASE_URL` set ke backend URL
- [ ] Project imported ke Vercel
- [ ] Root directory set ke `frontend`
- [ ] Build & deployment success
- [ ] Website accessible dan functional

### **Post-Deployment:**
- [ ] Test login/register
- [ ] Test upload artwork
- [ ] Test all major features
- [ ] Check mobile responsiveness
- [ ] Monitor error logs

---

## 🆘 GETTING HELP

Jika ada masalah:
1. Check Vercel deployment logs
2. Check browser console
3. Test API endpoints dengan Postman
4. Review Vercel documentation: https://vercel.com/docs

---

## 📚 USEFUL COMMANDS

```bash
# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Rollback to previous deployment
vercel rollback [deployment-url]

# Remove deployment
vercel remove [deployment-name]

# Link local project to Vercel
vercel link
```

---

**Good luck dengan deployment! 🚀**
