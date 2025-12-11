# ArtConnect Backend API

Backend server untuk aplikasi ArtConnect - Platform untuk penikmat seni melihat dan menyimpan karya seni favorit.

## 🎨 Fitur Utama

**User Role: Art Enthusiast (Penikmat Seni)**
- **Authentication & Authorization** - JWT-based authentication
- **User Management** - Profile management
- **Gallery Browsing** - Browse galeri seni (view-only)
- **Artworks Browsing** - Lihat karya seni dengan filter category
- **Favorites (My Gallery)** - Simpan artwork favorit ke profil pribadi
- **Comments & Likes** - Berikan feedback untuk karya seni
- **Category Filters** - Filter galleries dan artworks by category
- **User Profiles** - Lihat profil dan portfolio user

**Admin:** Upload artwork via admin FE (terpisah dari user app)

## 🛠️ Tech Stack

| Technology | Description |
| ------ | ------ |
| [Node.js] | Runtime environment |
| [Express] | Web framework |
| [PostgreSQL] | Primary database |
| [Cloudinary] | Image storage & CDN |
| [JWT] | Authentication |
| [Multer] | File upload handling |
| [Bcrypt.js] | Password hashing |

## 📋 Prerequisites

- Node.js v14+ 
- PostgreSQL v12+
- Cloudinary account (untuk image hosting)
- npm atau yarn

## 🚀 Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd capstone-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` file dengan konfigurasi Anda:
```env
PGUSER=postgres
PGHOST=localhost
PGDATABASE=artconnect_db
PGPASSWORD=your_postgres_password
PGPORT=your_postgres_port

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SECRETE_KEY_JWT=your_super_secret_jwt_key
PORT=3000
```

4. **Setup database**

Buat database PostgreSQL:
```bash
createdb artconnect_db
```

Import schema:
```bash
psql -U postgres -d artconnect_db -f database/schema.sql
```

5. **Start server**

Development mode (dengan auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## 📁 Project Structure

```
capstone-backend/
├── api/
│   └── index.js              # Vercel serverless handler
├── database/
│   └── schema.sql            # Database schema
├── setup/
│   ├── Postman_Collection.json
│   └── POSTMAN_GUIDE.md
├── src/
│   ├── config/
│   │   ├── cloudinary.js     # Cloudinary config & multer setup
│   │   └── db.js             # PostgreSQL connection
│   ├── controller/
│   │   ├── artworks.js
│   │   ├── comments.js
│   │   ├── communities.js
│   │   ├── galleries.js
│   │   ├── likes.js
│   │   └── users.js
│   ├── helper/
│   │   ├── auth.js           # JWT & authentication middleware
│   │   └── common.js         # Response formatter
│   ├── models/
│   │   ├── artworks.js
│   │   ├── comments.js
│   │   ├── communities.js
│   │   ├── favorites.js
│   │   ├── galleries.js
│   │   ├── likes.js
│   │   └── users.js
│   └── routes/
│       ├── artworks.js
│       ├── comments.js
│       ├── communities.js
│       ├── galleries.js
│       ├── likes.js
│       ├── users.js
│       ├── favorites.js
│       └── index.js          # Route aggregator
├── .env.example
├── .gitignore
├── index.js                  # Entry point
├── package.json
├── vercel.json              # Vercel deployment config
├── API_TESTING_GUIDE.md     # Complete API documentation
└── README.md
```

## 📚 Database Schema

### Main Tables (Active)
- **users** - User accounts dan profiles (fullname, email, city, gender)
- **galleries** - Galeri artwork (browse only)
- **artworks** - Karya seni dengan metadata (browse only - upload via admin)
- **favorites** - User's favorite artworks ("My Gallery" di profile)
- **comments** - Komentar feedback pada artwork
- **likes** - Like untuk artwork dan comment
- **exhibitions** - Pameran virtual (browse only)
- **exhibition_artworks** - Many-to-many relation exhibitions-artworks

### Inactive Tables (Removed)
- **communities** - ~~Komunitas seni~~ (Using Google Form)
- **community_members** - ~~Anggota komunitas~~ (Removed)
- **community_gallery** - ~~Artwork di komunitas~~ (Removed)
- **notifications** - Notifikasi user (optional, not implemented)

**Note:** Database schema contains inactive tables for backward compatibility. See `documentation/api&database/USER_ROLE_CHANGES.md` for details.

Detail schema ada di `database/schema.sql`

## 🔌 API Endpoints

**Total: 27 endpoints**

**User Role:** Art Enthusiast (Penikmat Seni - View Only)  
**Admin:** Upload via Admin FE (terpisah)

### Authentication & Profile (7 endpoints)
- `POST /api/users/register` - Register user baru
- `POST /api/users/login` - Login user
- `POST /api/users/refresh-token` - Refresh token
- `GET /api/users/profile` - Get own profile (protected)
- `GET /api/users/:id` - Get user profile by ID
- `PUT /api/users/:id` - Update profile (city, gender only)
- `DELETE /api/users/:id` - Deactivate account

### Browse Galleries (3 endpoints - View Only)
- `GET /api/galleries` - Get all galleries with pagination
- `GET /api/galleries/:id` - Get gallery detail
- `GET /api/galleries/:id/artworks` - Get artworks in gallery

### Browse Exhibitions (3 endpoints - View Only)
- `GET /api/exhibitions` - Get all exhibitions with pagination
- `GET /api/exhibitions/:id` - Get exhibition detail
- `GET /api/exhibitions/:id/artworks` - Get artworks in exhibition

### Browse Users (3 endpoints - View Only)
- `GET /api/users` - Get all users with pagination
- `GET /api/users/:id/galleries` - Get user galleries
- `GET /api/users/:id/exhibitions` - Get user exhibitions

### Browse Artworks (2 endpoints - View Only)
- `GET /api/artworks` - Browse all artworks with filters
- `GET /api/artworks/:id` - Get artwork detail

### Favorites - My Gallery (3 endpoints)
- `POST /api/artworks/:id/favorite` - Add artwork to favorites (protected)
- `DELETE /api/artworks/:id/favorite` - Remove from favorites (protected)
- `GET /api/users/:id/favorites` - Get my favorite artworks (protected)

### Comments (4 endpoints)
- `POST /api/artworks/:id/comments` - Add comment (protected)
- `GET /api/artworks/:id/comments` - Get comments with pagination
- `PUT /api/comments/:id` - Update own comment (protected)
- `DELETE /api/comments/:id` - Delete own comment (protected)

### Likes (4 endpoints)
- `POST /api/artworks/:id/like` - Like artwork (protected)
- `DELETE /api/artworks/:id/like` - Unlike artwork (protected)
- `POST /api/comments/:id/like` - Like comment (protected)
- `DELETE /api/comments/:id/like` - Unlike comment (protected)

**See `documentation/api&database/USER_ROLE_CHANGES.md` for complete details.**
- `POST /api/communities` - Create community (protected)
- `POST /api/communities/:id/join` - Join community (protected)
- `POST /api/communities/:id/leave` - Leave community (protected)
- `GET /api/communities/:id/gallery` - Get community artworks

### Exhibitions
- `GET /api/exhibitions` - Get all exhibitions
- `POST /api/exhibitions` - Create exhibition (protected)
- `POST /api/exhibitions/:id/artworks` - Add artwork to exhibition (protected)
- `GET /api/exhibitions/:id/artworks` - Get exhibition artworks

### Search & Discovery
- `GET /api/search?q=query&type=artworks` - Search
- `GET /api/trending` - Get trending artworks
- `GET /api/recommendations` - Get personalized recommendations (protected)

**Dokumentasi lengkap:** Lihat `API_TESTING_GUIDE.md`

## 🧪 Testing

Testing menggunakan Postman:

1. Import collection dari `setup/Postman_Collection.json`
2. Ikuti panduan di `API_TESTING_GUIDE.md`
3. Setup environment variables di Postman:
   - `base_url`: http://localhost:3000/api
   - `token`: (akan di-set setelah login)

## 📸 Cloudinary Upload System

File uploads otomatis diorganisir ke folder berbeda:

- **Profiles** → `artconnect/profiles/` (300x300, cropped)
- **Artworks** → `artconnect/artworks/` (original quality)
- **Galleries** → `artconnect/galleries/` (800x600)
- **Exhibitions** → `artconnect/exhibitions/` (1200x400, banner)

**Workflow untuk migrasi gambar dari local FE:**
1. Frontend menyimpan gambar di folder local project
2. Upload batch images ke Cloudinary menggunakan API
3. Update database dengan Cloudinary URLs
4. Sinkronisasi dengan existing likes dan comments

Detail konfigurasi ada di `CLOUDINARY_SETUP.md`

## 🔍 Search System

Full-text search menggunakan PostgreSQL:
- **GIN indexes** untuk performa optimal
- **ts_rank** untuk relevance scoring
- **Multi-table search** (artworks, users, galleries, communities, exhibitions)
- **Trending algorithm**: `(likes * 0.5 + views * 0.3 + comments * 0.2)`

## 🔐 Authentication

- JWT-based authentication
- Protected routes menggunakan middleware `protect`
- Token expires dalam 24 jam
- Refresh token tersedia untuk renewal

## 🌐 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables di Vercel dashboard

### Manual Deployment

1. Build (tidak ada build step untuk Express):
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| DB_HOST | PostgreSQL host | ✅ |
| DB_USER | Database user | ✅ |
| DB_PASSWORD | Database password | ✅ |
| DB_NAME | Database name | ✅ |
| DB_PORT | Database port | ✅ |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | ✅ |
| CLOUDINARY_API_KEY | Cloudinary API key | ✅ |
| CLOUDINARY_API_SECRET | Cloudinary API secret | ✅ |
| SECRETE_KEY_JWT | JWT secret key | ✅ |
| PORT | Server port | ❌ (default: 3000) |

## 🐛 Debug

Lint code:
```bash
npm run lint
```

Test database connection:
```bash
npm run test-db
```

## 📦 Third Party Modules

| Module | Purpose | Install |
| ------ | ------ | ------ |
| [Express] | Web framework | `npm i express` |
| [PostgreSQL] | Database | `npm i pg` |
| [Cloudinary] | Image hosting | `npm i cloudinary` |
| [Multer] | File upload | `npm i multer` |
| [Multer-Storage-Cloudinary] | Cloudinary storage | `npm i multer-storage-cloudinary` |
| [Bcrypt.js] | Password hashing | `npm i bcryptjs` |
| [Jsonwebtoken] | JWT auth | `npm i jsonwebtoken` |
| [Dotenv] | Environment variables | `npm i dotenv` |
| [CORS] | Cross-origin support | `npm i cors` |
| [Uuid] | UUID generation | `npm i uuid` |
| [Http-errors] | Error handling | `npm i http-errors` |
| [Nodemon] | Development server | `npm i nodemon` |
| [Morgan] | HTTP logger | `npm i morgan` |
| [Redis] | Caching (optional) | `npm i redis` |

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

ISC License

## 👥 Authors

- Backend Developer Team

## 📞 Support

Untuk pertanyaan atau issues, silakan buka issue di repository ini.

---

**Happy Coding! 🎨**

[Node.js]: <https://nodejs.org>
[Express]: <http://expressjs.com>
[PostgreSQL]: <https://node-postgres.com>
[Cloudinary]: <https://cloudinary.com>
[JWT]: <https://jwt.io>
[Multer]: <https://www.npmjs.com/package/multer>
[Multer-Storage-Cloudinary]: <https://www.npmjs.com/package/multer-storage-cloudinary>
[Bcrypt.js]: <https://www.npmjs.com/package/bcryptjs>
[Jsonwebtoken]: <https://www.npmjs.com/package/jsonwebtoken>
[Dotenv]: <https://www.npmjs.com/package/dotenv>
[CORS]: <https://www.npmjs.com/package/cors>
[Uuid]: <https://www.npmjs.com/package/uuid>
[Http-errors]: <https://www.npmjs.com/package/http-errors>
[Nodemon]: <https://www.npmjs.com/package/nodemon>
[Morgan]: <https://www.npmjs.com/package/morgan>
[Redis]: <https://www.npmjs.com/package/redis>
