# 📋 DEPLOYMENT CHECKLIST - ArtConnect

## 🎯 PRE-DEPLOYMENT (Sebelum Deploy)

### Database Setup
- [ ] Pilih provider database cloud (Neon/Supabase/Railway)
- [ ] Buat database PostgreSQL baru
- [ ] Catat connection string
- [ ] Jalankan `backend/database/schema.sql`
- [ ] Jalankan `backend/database/seed.sql`
- [ ] Test koneksi database dari local

### Cloudinary Setup
- [ ] Login/signup ke Cloudinary
- [ ] Dapatkan Cloud Name, API Key, API Secret
- [ ] Upload existing images: `node backend/scripts/upload-cloudinary.js`
- [ ] Update database dengan Cloudinary URLs jika perlu

### Code Preparation
- [ ] Update `.gitignore` sudah benar
- [ ] File `.env` TIDAK di-commit ke Git
- [ ] CORS origins sudah dikonfigurasi di `backend/index.js`
- [ ] `vercel.json` ada di folder `backend` dan `frontend`
- [ ] All dependencies up to date: `npm audit fix`

### Git Repository
- [ ] Repository sudah di-push ke GitHub
- [ ] Branch `main` adalah default branch
- [ ] No sensitive data in commit history

---

## 🔧 BACKEND DEPLOYMENT

### Vercel Project Setup
- [ ] Login ke Vercel: https://vercel.com
- [ ] Import project dari GitHub
- [ ] Set root directory ke `backend`
- [ ] Framework preset: Other
- [ ] Build command: (kosongkan)
- [ ] Output directory: (kosongkan)

### Environment Variables (di Vercel Dashboard)
- [ ] `NODE_ENV` = production
- [ ] `PORT` = 3000
- [ ] `PGUSER` = [database user]
- [ ] `PGHOST` = [database host]
- [ ] `PGDATABASE` = [database name]
- [ ] `PGPASSWORD` = [database password]
- [ ] `PGPORT` = 5432
- [ ] `JWT_SECRET` = [strong random string min 32 chars]
- [ ] `CLOUDINARY_CLOUD_NAME` = [your cloud name]
- [ ] `CLOUDINARY_API_KEY` = [your api key]
- [ ] `CLOUDINARY_API_SECRET` = [your api secret]
- [ ] `FRONTEND_URL` = [frontend URL setelah deploy]

### Deployment Verification
- [ ] Deploy berhasil tanpa error
- [ ] Catat backend URL: `https://[project].vercel.app`
- [ ] Test endpoint: `GET https://[backend-url]/api/artworks`
- [ ] Test dengan Postman collection
- [ ] Check logs di Vercel Dashboard jika ada error

---

## 🎨 FRONTEND DEPLOYMENT

### Environment Configuration
- [ ] Buat file `frontend/.env.production`
- [ ] Set `VITE_API_BASE_URL=https://[backend-url]/api`

### Vercel Project Setup
- [ ] Import project (same repo) ke Vercel
- [ ] Set root directory ke `frontend`
- [ ] Framework preset: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`

### Environment Variables (di Vercel Dashboard)
- [ ] `VITE_API_BASE_URL` = https://[backend-url]/api

### Deployment Verification
- [ ] Deploy berhasil tanpa error
- [ ] Catat frontend URL: `https://[project].vercel.app`
- [ ] Website bisa diakses
- [ ] Inspect console, no CORS errors
- [ ] Images loading correctly

---

## 🔄 UPDATE BACKEND CORS

Setelah frontend deploy, update CORS di backend:

- [ ] Edit `backend/index.js`
- [ ] Tambahkan frontend URL ke `allowedOrigins`
- [ ] Push ke GitHub (auto re-deploy)
- [ ] Atau update via Vercel env var `FRONTEND_URL`

---

## ✅ POST-DEPLOYMENT TESTING

### Authentication Tests
- [ ] Register new user works
- [ ] Login works
- [ ] JWT token stored in localStorage
- [ ] Protected routes accessible after login
- [ ] Logout works

### Core Features Tests
- [ ] View artworks (home page)
- [ ] View artwork detail
- [ ] Upload new artwork (requires login)
- [ ] Edit artwork (requires login)
- [ ] Delete artwork (requires login)
- [ ] Like/unlike artwork
- [ ] Add comment
- [ ] View user profile
- [ ] Edit profile

### Gallery Features Tests
- [ ] Create gallery
- [ ] Add artwork to gallery
- [ ] View gallery
- [ ] Edit gallery
- [ ] Delete gallery

### UI/UX Tests
- [ ] Mobile responsive
- [ ] Images loading fast (via Cloudinary)
- [ ] Navbar works correctly
- [ ] Footer displays correctly
- [ ] Forms validation works
- [ ] Error messages display correctly

### Performance Tests
- [ ] Page load time < 3 seconds
- [ ] API response time reasonable
- [ ] No console errors
- [ ] No memory leaks

---

## 🐛 TROUBLESHOOTING CHECKLIST

### Backend Issues
- [ ] Check Vercel deployment logs
- [ ] Verify all environment variables set correctly
- [ ] Test database connection
- [ ] Check API endpoints dengan Postman
- [ ] Verify JWT_SECRET is set

### Frontend Issues
- [ ] Check browser console for errors
- [ ] Verify `VITE_API_BASE_URL` correct
- [ ] Check Network tab for failed requests
- [ ] Verify CORS settings in backend
- [ ] Clear browser cache and test

### Database Issues
- [ ] Verify database is running
- [ ] Check connection string format
- [ ] Verify SSL enabled for cloud database
- [ ] Check if tables exist: `\dt` in psql
- [ ] Check if seed data loaded

---

## 📊 MONITORING SETUP (Optional but Recommended)

### Analytics
- [ ] Enable Vercel Analytics
- [ ] Setup Google Analytics (optional)

### Error Tracking
- [ ] Setup Sentry for error tracking
- [ ] Configure error alerts

### Performance Monitoring
- [ ] Check Vercel performance metrics
- [ ] Monitor database query performance
- [ ] Setup uptime monitoring (UptimeRobot/Pingdom)

---

## 🎉 FINAL STEPS

- [ ] Update README.md dengan live URLs
- [ ] Share URLs dengan team/client
- [ ] Create backup of production database
- [ ] Document any custom configuration
- [ ] Celebrate! 🎊

---

## 📝 DEPLOYMENT NOTES

**Backend URL:** _______________________________

**Frontend URL:** _______________________________

**Database Provider:** _______________________________

**Deployment Date:** _______________________________

**Deployed By:** _______________________________

**Issues Encountered:**
- 
- 
- 

**Notes:**
- 
- 
- 

---

**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Completed
