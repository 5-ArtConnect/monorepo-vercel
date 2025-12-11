# 🎨 ArtConnect - Art Gallery Platform

Platform untuk penikmat seni melihat, menyimpan, dan memberikan feedback pada karya seni.

**Version:** 1.2  
**Status:** 🚀 Ready for Deployment  
**Last Updated:** December 12, 2025

**🔗 Deployment Ready:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for Vercel deployment instructions  

---

## 🎉 Latest Updates (December 12, 2025)

### ✅ Critical Bugs Fixed:
1. **User Registration Bug** - Token sekarang otomatis di-return saat register (auto-login)
2. **Module Export Error** - Controller export format diperbaiki
3. **Infinite Recursion** - Function `deleteUser` bug fixed
4. **Vercel Config** - Deployment configuration updated
5. **Security Issue** - `.env` files properly secured in gitignore

**📄 Lihat detail lengkap di:** `AUDIT_REPORT.md`

---

## 📋 Project Overview

ArtConnect adalah aplikasi web yang menghubungkan art enthusiasts (penikmat seni) dengan karya seni dari berbagai artist. User dapat browse galleries & artworks, menyimpan favorit, dan memberikan feedback melalui comments & likes.

### 🎯 User Role: Art Enthusiast

User di ArtConnect adalah **view-only consumers** yang dapat:
- ✅ Browse galleries & artworks (view-only)
- ✅ Save artwork ke "My Gallery" (favorites)
- ✅ Comment & like pada artwork
- ✅ Filter by category
- ✅ View artist profiles

User **TIDAK BISA**:
- ❌ Upload/create artwork (managed by admin)
- ❌ Create/edit galleries (managed by admin)

---

## 🏗️ Architecture

```
ArtConnect/
├── backend/                       # Backend API (Express + PostgreSQL)
├── frontend/                      # Frontend (React + Vite + TailwindCSS)
├── QUICK_START.md                 # Quick start guide
├── AUDIT_REPORT.md                # Bug fixes & audit report
├── INTEGRATION_DOCUMENTATION.md   # Full integration docs
├── DEPLOYMENT_GUIDE.md            # 🆕 Full deployment guide to Vercel
├── DEPLOYMENT_CHECKLIST.md        # 🆕 Step-by-step deployment checklist
├── QUICK_DEPLOY.md                # 🆕 Quick reference for deployment
└── README.md                      # This file
```

### Tech Stack

**Backend:**
- Node.js + Express.js
- PostgreSQL (dengan UUID)
- JWT Authentication
- Cloudinary (image storage)
- Bcrypt (password hashing)

**Frontend:**
- React 19.1.1
- Vite 7.1.7
- TailwindCSS 3.4.18
- React Router DOM 7.10.0
- Lucide React Icons

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- PostgreSQL v12+
- npm atau yarn

### Installation

**1. Clone & Setup Database**
```bash
# Setup database
psql -U postgres
CREATE DATABASE artconnect_db;
\q

# Import schema & seed data
cd backend
psql -U postgres -d artconnect_db -f database/schema.sql
psql -U postgres -d artconnect_db -f database/seed.sql
```

**2. Backend Setup**
```bash
cd backend
cp .env.example .env
# Edit .env dengan credentials Anda
npm install
npm run dev
```
Backend: http://localhost:3000

**3. Frontend Setup**
```bash
cd frontend
cp .env.example .env
# Edit .env jika perlu (default: http://localhost:3000/api)
npm install
npm run dev
```
Frontend: http://localhost:5173

### Test Login
```
Email: john.doe@example.com
Password: password123
```

**Lihat `QUICK_START.md` untuk petunjuk lengkap!**

---

## ✨ Features

### ✅ Implemented (Integrated dengan Backend)

| Feature | Description | Status |
|---------|-------------|--------|
| **Authentication** | Login, register dengan JWT + auto-login | ✅ Fixed |
| **User Profile** | View & edit profile (city, gender) | ✅ |
| **My Gallery** | Collection of favorite artworks | ✅ |
| **Add/Remove Favorites** | Save artworks to personal gallery | ✅ |
| **Security** | Environment variables & gitignore setup | ✅ Fixed |

### ⏳ Partially Implemented (Need Integration)

| Feature | Description | Status |
|---------|-------------|--------|
| **Home Page** | Featured galleries & artists | ⏳ |
| **Gallery Browse** | Browse all galleries with filters | ⏳ |
| **Artwork Browse** | Browse artworks by category | ⏳ |
| **Artwork Detail** | View artwork with comments & likes | ⏳ |
| **Comments System** | CRUD comments on artworks | ⏳ |
| **Likes System** | Like/unlike artworks & comments | ⏳ |

### 🔒 Not Integrated (External System)

| Feature | Description | Note |
|---------|-------------|------|
| **Community** | Join/create communities | Via Google Form |
| **Exhibition** | Submit to exhibitions | Manual approval by admin |

---

## 📁 Project Structure

### Backend (`backend/`)
```
├── index.js                    # Entry point
├── vercel.json                 # ✅ Fixed deployment config
├── .env.example                # Environment template
├── .env                        # Environment config (gitignored)
├── database/
│   ├── schema.sql             # Database structure with triggers
│   └── seed.sql               # Dummy data (updated with artist names)
├── src/
│   ├── config/                # DB & Cloudinary config
│   ├── controller/            # ✅ Business logic (bugs fixed)
│   ├── models/                # ✅ Database queries (bugs fixed)
│   ├── routes/                # API endpoints
│   └── helper/                # Auth & utilities
└── documentation/
    ├── api&database/          # API & DB docs
    └── postman/               # Postman collection
```

### Frontend (`frontend/`)
```
├── index.html
├── .env.example                # ✅ New: Environment template
├── .env                        # API base URL config (gitignored)
├── .gitignore                  # ✅ Updated: Secure .env files
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Root component
│   ├── AuthContext.jsx       # ✅ JWT token management
│   ├── services/             # ✅ API integration layer
│   │   ├── api.js           # Base API config
│   │   ├── auth.js          # ✅ Authentication (updated)
│   │   ├── users.js         # User management
│   │   ├── galleries.js     # Galleries
│   │   ├── artworks.js      # Artworks
│   │   ├── favorites.js     # My Gallery
│   │   ├── comments.js      # Comments
│   │   └── likes.js         # Likes
│   ├── components/           # Reusable components
│   ├── Router/               # Routing config
│   ├── ArtConnectLogin.jsx   # ✅ Login page
│   ├── ArtConnectSignup.jsx  # ✅ Signup page (auto-login fixed)
│   ├── Profile.jsx           # ✅ Profile page
│   ├── MyGallery.jsx         # ✅ My Gallery page
│   └── Home.jsx              # Home page
└── public/
```

---

## 🔌 API Integration

### Service Layer Architecture

Semua API calls ter-centralized di folder `src/services/`:

```javascript
// Example: Login
import { login } from './services/auth';

const handleLogin = async () => {
  const response = await login({ email, password });
  // Token automatically saved to localStorage
};
```

**Available Services:**
- `api.js` - Base HTTP client
- `auth.js` - Authentication (login, register, logout)
- `users.js` - User profile CRUD
- `galleries.js` - Browse galleries
- `artworks.js` - Browse artworks
- `favorites.js` - Manage My Gallery
- `comments.js` - CRUD comments
- `likes.js` - Like/unlike

### Environment Variables

**Backend (`.env`):**
```env
# Database Configuration
PGUSER=postgres
PGHOST=localhost
PGDATABASE=artconnect_db
PGPASSWORD=your_password
PGPORT=6000

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
SECRETE_KEY_JWT=your_secret_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend (`.env`):**
```env
# API Base URL
VITE_API_BASE_URL=http://localhost:3000/api
```

> 💡 **Tip**: Gunakan `.env.example` sebagai template!

---

## 🗂️ Database

### Schema
- **users** - User accounts (all art enthusiasts)
- **galleries** - Art galleries (view-only for users)
- **artworks** - Art pieces (view-only for users)
- **comments** - User feedback (CRUD by users)
- **likes** - Likes on artworks & comments
- **favorites** - User's favorite artworks (My Gallery)

### Seed Data (Dummy Users)

**Artists:**
1. **Mario Silva** (mario.silva@example.com) - Abstract & Digital Artist
2. **Hanna Kim** (hanna.kim@example.com) - Sculpture Artist
3. **Kim Sejeong** (kim.sejeong@example.com) - Photographer

**Regular Users:**
- John Doe (john.doe@example.com)
- Sarah Smith (sarah.smith@example.com)
- Mike Johnson (mike.johnson@example.com)

**Password untuk semua:** `password123`

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **QUICK_START.md** | Cara cepat menjalankan aplikasi |
| **AUDIT_REPORT.md** | 🆕 Bug fixes & security audit report |
| **INTEGRATION_DOCUMENTATION.md** | Dokumentasi lengkap integrasi API |
| **backend/documentation/API_DOCUMENTATION.md** | API endpoints reference |
| **backend/documentation/DATABASE_DOCUMENTATION.md** | Database schema detail |

---

## 🔐 Authentication Flow

1. User register/login via form
2. Backend return JWT token + refreshToken
3. Frontend store tokens di localStorage
4. Setiap API request include `Authorization: Bearer <token>` header
5. Backend verify token di middleware

```javascript
// AuthContext automatically handle this
const { login, logout, user, isLoggedIn } = useAuth();
```

---

## 🎯 Next Steps (Untuk Developer)

### ✅ Completed (December 12, 2025)
- [x] Fix critical bugs (registration, export, recursion)
- [x] Update Vercel deployment config
- [x] Secure environment variables
- [x] Create environment templates (.env.example)
- [x] Complete audit documentation

### Priority 1: Testing & Validation
- [ ] Test registration → auto-login flow
- [ ] Test all API endpoints with Postman
- [ ] Validate CRUD operations
- [ ] Test protected routes
- [ ] Deploy to staging environment

### Priority 2: Core Features Integration
- [ ] Integrate Home page dengan galleries API
- [ ] Integrate Gallery browse page
- [ ] Integrate Category filter page
- [ ] Integrate Artwork detail page
- [ ] Integrate Comments system (CRUD)
- [ ] Integrate Likes system

### Priority 3: UX Improvements
- [ ] Remove console.log before production
- [ ] Add loading skeletons
- [ ] Add error boundaries
- [ ] Implement pagination/infinite scroll
- [ ] Add image lazy loading optimization

---

## 🧪 Testing

### Manual Testing

**Test Login:**
```
1. Buka http://localhost:5173
2. Navigate ke Login
3. Email: john.doe@example.com, Password: password123
4. Verify redirect ke home & navbar berubah
```

**Test Profile:**
```
1. Login
2. Navigate ke Profile (dari navbar)
3. Klik "Edit Profile"
4. Ubah City & Gender
5. Klik "Simpan"
6. Verify data updated
```

**Test My Gallery:**
```
1. Login
2. Navigate ke My Gallery
3. Verify favorite artworks muncul
4. Klik "Hapus" pada artwork
5. Verify artwork removed from list
```

### API Testing (Postman)

Import collection dari:
```
for-backend - Copy/documentation/postman/ArtConnect_API.postman_collection.json
```

---

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Cek PostgreSQL running
# Verify .env credentials
# Check PGPORT matches your PostgreSQL port
```

### Frontend Can't Connect Backend
```bash
# Verify backend running: http://localhost:3000
# Check .env: VITE_API_BASE_URL=http://localhost:3000/api
# CORS already enabled di backend
```

### Login/Register Failed
```bash
# Verify database seeded
# Use correct credentials: password123
# Check browser console for errors
# ✅ Register sekarang auto-login (token returned)
```

### Deployment Issues
```bash
# ✅ Vercel config sudah diperbaiki
# Check vercel.json untuk routing config
# Pastikan environment variables di-set di Vercel dashboard
```

---

## 📝 Notes

### Community & Exhibition
Fitur **Community** dan **Exhibition** di frontend **TIDAK** diintegrasikan dengan backend seperti yang diminta. Fitur ini akan menggunakan sistem terpisah (Google Form + manual approval oleh admin).

Pages yang ada tapi tidak connect ke backend:
- `CommunityPage1.jsx`, `CommunityPage2.jsx`, `CommunityPage3.jsx`
- `MyCommunityArt.jsx`
- `Exhibition.jsx` (display only)

### CORS
CORS sudah enabled di backend (`app.use(cors())`) untuk accept requests dari frontend.

### Security
- JWT tokens stored di localStorage
- Tokens automatically included di setiap request
- Refresh token available untuk renew expired tokens

---

## 👥 Credits

**Backend API:** Express.js + PostgreSQL + JWT  
**Frontend:** React + Vite + TailwindCSS  
**Integration Date:** December 11, 2025  
**Bug Fixes & Audit:** December 12, 2025

---

## 🚀 Deployment

Project ini ready untuk di-deploy ke **Vercel**!

### Quick Deploy
```bash
# Jalankan deployment helper
deploy.bat          # Windows
# atau
./deploy.sh         # Linux/Mac
```

### Dokumentasi Deployment
- **📘 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Panduan lengkap deployment
- **📋 [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Checklist step-by-step
- **⚡ [QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - Quick reference

### Deployment Architecture
- **Backend:** Vercel Serverless Function
- **Frontend:** Vercel Static Site
- **Database:** Neon/Supabase/Railway (PostgreSQL Cloud)
- **Storage:** Cloudinary (Images)

**⏱️ Estimated Time:** 20-30 minutes  
**💰 Cost:** FREE (using free tiers)

---

## 📞 Support

Untuk pertanyaan atau issue, lihat dokumentasi lengkap di:
- `QUICK_START.md` - Quick start guide local development
- `DEPLOYMENT_GUIDE.md` - 🆕 Panduan deployment ke Vercel
- `AUDIT_REPORT.md` - Bug fixes & audit report
- `INTEGRATION_DOCUMENTATION.md` - Full integration docs
- `backend/documentation/` - API & database docs

---

## 🔖 Version History

### v1.2 (December 12, 2025) - Deployment Ready
- 🚀 Vercel deployment configuration
- 📘 Complete deployment documentation
- 🔧 CORS configuration for production
- ⚙️ Environment variables templates
- 📋 Deployment checklist & helper scripts

### v1.1 (December 12, 2025) - Bug Fixes & Security
- ✅ Fixed critical registration bug (auto-login)
- ✅ Fixed module export inconsistency
- ✅ Fixed infinite recursion in deleteUser
- ✅ Fixed Vercel deployment configuration
- ✅ Secured environment variables
- ✅ Added .env.example templates

### v1.0 (December 11, 2025) - Initial Release
- ✅ Full frontend-backend integration
- ✅ Authentication system
- ✅ User profile management
- ✅ My Gallery (favorites)

---

**Happy Coding! 🎨**
