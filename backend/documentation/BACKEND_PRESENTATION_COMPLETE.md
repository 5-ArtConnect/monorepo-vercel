# 🎨 ArtConnect Backend - Skrip Presentasi Lengkap

## 📋 Persiapan Sebelum Presentasi

### 1. Materials Yang Perlu Disiapkan
- ✅ Laptop dengan backend running (localhost:3000)
- ✅ Postman dengan collection imported
- ✅ Code editor (VS Code) terbuka di project folder
- ✅ Database viewer (pgAdmin/TablePlus) - optional
- ✅ Slide presentasi (jika ada) - optional
- ✅ Browser untuk demo frontend integration

### 2. Checklist Technical
```bash
# Backend running
cd backend
npm start

# Database ready
psql -U postgres -d artconnect -c "SELECT COUNT(*) FROM users;"

# Postman ready
# Import: ArtConnect_API.postman_collection.json
```

---

## 🎤 SKRIP PRESENTASI LENGKAP (30-40 Menit)

---

## **PART 1: INTRODUCTION & OVERVIEW (5 menit)**

### **OPENING**

> "Selamat pagi/siang/sore. Hari ini saya akan mempresentasikan **ArtConnect Backend System** - sebuah REST API backend untuk platform galeri seni digital."

> "Presentasi ini akan mencakup:"
> - ✅ Arsitektur & Tech Stack
> - ✅ Database Design
> - ✅ API Endpoints & Features
> - ✅ Security & Authentication
> - ✅ Live Demo dengan Postman

---

### **1.1 Project Overview**

**[Tampilkan folder structure di VS Code]**

> "ArtConnect adalah platform dimana user dapat:"
> - Browse galleries dan artworks
> - Memberikan feedback melalui comments dan ratings
> - Like artworks dan comments
> - Menyimpan favorite artworks ke My Gallery

> "Yang membuat unique adalah: **ini adalah view-only platform**."
> - User tidak bisa upload artwork sendiri
> - Galleries dan artworks dikelola oleh admin
> - Fokus ke curation dan appreciation, bukan creation

---

### **1.2 Tech Stack**

**[Buka package.json]**

> "Backend ini dibangun dengan modern JavaScript stack:"

```
Backend:
✅ Node.js + Express.js - Web framework
✅ PostgreSQL - Relational database
✅ JWT (jsonwebtoken) - Authentication
✅ bcryptjs - Password hashing
✅ UUID - Unique identifiers
✅ CORS - Cross-origin support

Development:
✅ Nodemon - Auto-reload
✅ dotenv - Environment variables

Production:
✅ Vercel - Serverless deployment
✅ Neon/Supabase - PostgreSQL hosting
```

> "Mengapa pilihan ini?"
> - PostgreSQL: Relational data dengan complex queries
> - JWT: Stateless authentication, scalable
> - Express: Lightweight, mature, large ecosystem
> - Vercel: Easy deployment, serverless, auto-scaling

---

### **1.3 Project Structure**

**[Tampilkan folder structure]**

```
backend/
├── src/
│   ├── config/          # Database & Cloudinary config
│   ├── controller/      # Business logic
│   ├── models/          # Database queries
│   ├── routes/          # API routes
│   └── helper/          # Auth & utilities
├── database/
│   ├── schema.sql       # Database structure
│   └── seed.sql         # Sample data
├── documentation/
│   └── postman/         # API documentation
└── index.js             # Entry point
```

> "Ini menggunakan **MVC-like pattern**:"
> - **Routes**: Define endpoints
> - **Controllers**: Handle business logic
> - **Models**: Database operations
> - Clean separation of concerns

---

## **PART 2: DATABASE ARCHITECTURE (7 menit)**

### **2.1 Database Schema Overview**

**[Buka schema.sql]**

> "Mari kita lihat database design. Saya punya **6 main tables**:"

```
1. users          - User accounts & profiles
2. galleries      - Art galleries/collections
3. artworks       - Individual artworks
4. comments       - User comments dengan rating
5. likes          - Like system (polymorphic)
6. favorites      - User's favorite artworks
```

> "Ini adalah PostgreSQL dengan **UUID primary keys** untuk better scalability."

---

### **2.2 Users Table**

**[Scroll ke users table]**

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE,
    bio TEXT,
    profile_picture VARCHAR(500),
    phone VARCHAR(20),
    city VARCHAR(100),
    gender VARCHAR(50),
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false
);
```

> "Key points:"
> - UUID sebagai ID - lebih aman dan scalable
> - Email unique - untuk login
> - Password di-hash dengan bcrypt
> - Role system - untuk future admin features
> - Soft delete dengan is_active
> - Profile fields: city, gender (editable), email & fullname (permanent)

---

### **2.3 Galleries & Artworks**

**[Scroll ke galleries & artworks]**

> "Galleries adalah collections, artworks adalah individual pieces."

```sql
CREATE TABLE galleries (
    id UUID PRIMARY KEY,
    owner_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    cover_image_url VARCHAR(500),
    -- ... timestamps & soft delete
);

CREATE TABLE artworks (
    id UUID PRIMARY KEY,
    gallery_id UUID REFERENCES galleries(id),
    artist_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    category VARCHAR(100),
    medium VARCHAR(100),
    dimensions VARCHAR(100),
    price DECIMAL(15, 2),
    is_for_sale BOOLEAN,
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    -- ...
);
```

> "Perhatikan:"
> - Foreign keys untuk relational integrity
> - Artwork punya metadata lengkap: medium, dimensions, price
> - Counter columns (like_count, comment_count) untuk performance
> - Category untuk filtering

---

### **2.4 Comments & Likes System**

```sql
CREATE TABLE comments (
    id UUID PRIMARY KEY,
    artwork_id UUID REFERENCES artworks(id),
    author_id UUID REFERENCES users(id),
    text TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    like_count INT DEFAULT 0,
    -- ...
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    artwork_id UUID REFERENCES artworks(id),
    comment_id UUID REFERENCES comments(id),
    -- Either artwork_id OR comment_id, not both
    UNIQUE(user_id, artwork_id),
    UNIQUE(user_id, comment_id)
);
```

> "Comments punya rating 1-5 bintang untuk feedback."
> "Likes adalah polymorphic - bisa like artwork ATAU comment."
> "UNIQUE constraints mencegah double-like."

---

### **2.5 Favorites (My Gallery)**

```sql
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    artwork_id UUID REFERENCES artworks(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, artwork_id)
);
```

> "Simple junction table untuk user's favorite artworks."
> "Ini adalah fitur 'My Gallery' - personal collection."

---

### **2.6 Database Relationships**

**[Bisa gambar diagram atau jelaskan verbal]**

> "Relationship summary:"
> - User **has many** Galleries (as owner)
> - Gallery **has many** Artworks
> - Artwork **has many** Comments
> - User **has many** Comments (as author)
> - User **has many** Likes (on artworks or comments)
> - User **has many** Favorites (saved artworks)

> "Semua menggunakan **foreign key constraints** untuk data integrity."

---

## **PART 3: API ARCHITECTURE (8 menit)**

### **3.1 API Structure**

**[Buka src/routes/index.js]**

```javascript
router
  .use('/users', UserRouter)
  .use('/galleries', GalleryRouter)
  .use('/artworks', ArtworkRouter)
  .use('/', CommentRouter)
  .use('/', LikeRouter)
  .use('/', FavoriteRouter)
```

> "API organized by resource. Base URL: `/api`"

> "Total **19 endpoints** dalam 6 categories:"

---

### **3.2 Endpoint Breakdown**

**[Tampilkan di Postman atau list]**

```
1. Authentication & Profile (7 endpoints)
   POST   /users/register
   POST   /users/login
   POST   /users/refresh-token
   GET    /users/profile
   GET    /users/:id
   PUT    /users/:id
   DELETE /users/:id

2. Browse Galleries (3 endpoints)
   GET    /galleries
   GET    /galleries/:id
   GET    /galleries/:id/artworks

3. Browse Artworks (2 endpoints)
   GET    /artworks
   GET    /artworks/:id

4. Comments (5 endpoints)
   GET    /artworks/:id/comments
   GET    /artworks/:id/rating
   POST   /artworks/:id/comments
   PUT    /comments/:id
   DELETE /comments/:id

5. Likes (4 endpoints)
   POST   /artworks/:id/like
   DELETE /artworks/:id/like
   POST   /comments/:id/like
   DELETE /comments/:id/like

6. Favorites (3 endpoints)
   POST   /artworks/:id/favorite
   DELETE /artworks/:id/favorite
   GET    /users/:id/favorites
```

---

### **3.3 Authentication Flow**

**[Buka src/helper/auth.js]**

> "Authentication menggunakan **JWT (JSON Web Tokens)**."

```javascript
// Middleware protect
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json(...)
  
  const decoded = jwt.verify(token, JWT_SECRET)
  req.user = decoded
  next()
}
```

> "Flow:"
> 1. User register/login → dapat access token + refresh token
> 2. Access token disimpan di client (localStorage/cookie)
> 3. Setiap request → kirim via Authorization header: `Bearer <token>`
> 4. Middleware verify token → inject user info ke req.user
> 5. Controller bisa akses req.user untuk authorization

> "**Access token** expires in 1 hour."
> "**Refresh token** expires in 7 days - untuk generate new access token."

---

### **3.4 Controller Pattern**

**[Buka salah satu controller, misal src/controller/artworks.js]**

```javascript
const getAllArtworks = async (req, res) => {
  try {
    // 1. Extract & validate parameters
    const { page = 1, limit = 10, category } = req.query
    
    // 2. Call model for database operation
    const result = await artworkModel.getAll(...)
    
    // 3. Format & return response
    res.status(200).json({
      message: 'Success',
      data: result.rows,
      pagination: { page, limit, total }
    })
  } catch (error) {
    // 4. Error handling
    res.status(500).json({ error: error.message })
  }
}
```

> "Setiap controller mengikuti pattern:"
> - Extract & validate input
> - Call model (database layer)
> - Format response
> - Handle errors

> "Ini membuat code **clean, testable, dan maintainable**."

---

### **3.5 Model Pattern**

**[Buka src/models/artworks.js]**

```javascript
const getAll = (limit, offset, category) => {
  let query = `
    SELECT a.*, 
           u.fullname as artist_name,
           g.name as gallery_name
    FROM artworks a
    JOIN users u ON a.artist_id = u.id
    JOIN galleries g ON a.gallery_id = g.id
    WHERE a.is_deleted = false
  `
  
  const params = [limit, offset]
  
  if (category) {
    query += ` AND a.category = $3`
    params.push(category)
  }
  
  return pool.query(query, params)
}
```

> "Models hanya handle **database operations**:"
> - SQL queries
> - Parameterized queries (SQL injection protection)
> - Join tables untuk relational data
> - Return raw database result

---

### **3.6 Response Format**

> "Semua API response mengikuti **consistent format**:"

**Success Response:**
```json
{
  "message": "Success",
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45
  }
}
```

**Error Response:**
```json
{
  "error": "Error message here",
  "details": "Optional detailed info"
}
```

> "HTTP Status Codes:"
> - 200: OK (GET, PUT success)
> - 201: Created (POST success)
> - 400: Bad Request (validation error)
> - 401: Unauthorized (no/invalid token)
> - 403: Forbidden (tidak punya akses)
> - 404: Not Found
> - 500: Internal Server Error

---

## **PART 4: KEY FEATURES & SECURITY (5 menit)**

### **4.1 Security Implementations**

> "Security adalah priority. Ini yang sudah di-implement:"

**1. Password Security**
```javascript
// Hashing password dengan bcrypt (10 rounds)
const passwordHash = await bcrypt.hash(password, 10)

// Verify password
const isMatch = await bcrypt.compare(password, user.password)
```

**2. SQL Injection Protection**
```javascript
// GOOD - Parameterized query
pool.query('SELECT * FROM users WHERE id = $1', [userId])

// BAD - String interpolation (vulnerable)
// pool.query(`SELECT * FROM users WHERE id = ${userId}`)
```

**3. JWT Authentication**
```javascript
// Generate token dengan expiry
const token = jwt.sign({ id, email, role }, JWT_SECRET, {
  expiresIn: '1h'
})
```

**4. CORS Configuration**
```javascript
// Allow frontend access
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
```

**5. Environment Variables**
```javascript
// Sensitive data di .env file
DB_HOST=localhost
DB_PASSWORD=secret
JWT_SECRET=supersecret
```

---

### **4.2 Data Validation**

> "Input validation di controller level:"

```javascript
// Email validation
if (!email || !email.includes('@')) {
  return res.status(400).json({ error: 'Invalid email' })
}

// Rating validation
if (rating < 1 || rating > 5) {
  return res.status(400).json({ error: 'Rating must be 1-5' })
}

// Required fields
if (!title || !description) {
  return res.status(400).json({ error: 'Missing required fields' })
}
```

---

### **4.3 Authorization Logic**

> "Authorization checks memastikan user hanya akses data mereka:"

```javascript
// Example: Update comment
const comment = await commentModel.findById(commentId)

if (comment.author_id !== req.user.id) {
  return res.status(403).json({ 
    error: 'Unauthorized: You can only edit your own comments' 
  })
}

// Proceed with update
```

---

### **4.4 Performance Optimizations**

> "Beberapa optimization yang sudah di-implement:"

**1. Counter Columns**
```sql
-- Denormalized counters untuk avoid COUNT queries
like_count INT DEFAULT 0,
comment_count INT DEFAULT 0,
view_count INT DEFAULT 0
```

**2. Database Indexes**
```sql
CREATE INDEX idx_artworks_category ON artworks(category);
CREATE INDEX idx_artworks_gallery_id ON artworks(gallery_id);
CREATE INDEX idx_users_email ON users(email);
```

**3. Pagination**
```javascript
// Limit data returned per request
const limit = parseInt(req.query.limit) || 10
const offset = (page - 1) * limit

// LIMIT OFFSET query
SELECT * FROM artworks LIMIT $1 OFFSET $2
```

**4. Selective Field Selection**
```javascript
// Hanya ambil fields yang dibutuhkan
SELECT id, email, fullname, city, gender 
FROM users  -- Tidak ambil password, token, dll
```

---

## **PART 5: LIVE DEMO dengan POSTMAN (10 menit)**

### **5.1 Setup Demo**

**[Buka Postman]**

> "Sekarang kita akan demo API secara live."
> "Saya akan demonstrasi typical user journey."

---

### **5.2 User Journey Demo**

**STEP 1: Register & Login**

> "Pertama, user mendaftar."

**[Execute: POST /users/register]**
```json
{
  "email": "presentation@demo.com",
  "password": "demo123",
  "fullname": "Demo User"
}
```

> "Berhasil! User dapat access token."

**[Show environment variables - token tersimpan]**

---

**STEP 2: Browse Galleries**

> "User mulai explore galleries."

**[Execute: GET /galleries?limit=5]**

> "Dapat 5 galleries dengan cover images dan descriptions."

**[Execute: GET /galleries/{id}]**

> "User tertarik dengan satu gallery, lihat detailnya."

**[Execute: GET /galleries/{id}/artworks]**

> "Dan lihat semua artworks dalam gallery tersebut."

---

**STEP 3: View Artwork Detail**

> "User klik salah satu artwork."

**[Execute: GET /artworks/{id}]**

> "Dapat detail lengkap:"
> - Artwork info: title, artist, medium, dimensions, price
> - Gallery info
> - Engagement metrics: likes, comments, views

---

**STEP 4: Interact - Add Comment**

> "User impressed, mau kasih feedback."

**[Execute: POST /artworks/{id}/comments]**
```json
{
  "text": "Absolutely beautiful! The use of color is masterful.",
  "rating": 5
}
```

> "Comment berhasil dibuat dengan rating 5 bintang."

**[Execute: GET /artworks/{id}/rating]**

> "Dan ini average rating dari semua comments."

---

**STEP 5: Like Artwork**

> "User suka banget, langsung like."

**[Execute: POST /artworks/{id}/like]**

> "Artwork di-like! Like count naik."

---

**STEP 6: Add to Favorites**

> "User mau save ke koleksi personal."

**[Execute: POST /artworks/{id}/favorite]**

> "Masuk ke My Gallery user."

**[Execute: GET /users/{id}/favorites]**

> "Ini My Gallery user - koleksi favorite artworks mereka."

---

**STEP 7: Profile Management**

> "User mau update profile."

**[Execute: GET /users/profile]**

> "Lihat profile saat ini."

**[Execute: PUT /users/{id}]**
```
city: Jakarta
gender: Laki-Laki
```

> "Profile updated!"

---

### **5.3 Show Error Handling**

> "Mari kita lihat error handling."

**[Execute: POST /artworks/{id}/comments tanpa token]**

> "401 Unauthorized - harus login dulu."

**[Execute: POST /artworks/{id}/comments dengan rating=10]**

> "400 Bad Request - rating harus 1-5."

**[Execute: PUT /comments/{someone_else_comment}]**

> "403 Forbidden - tidak bisa edit comment orang lain."

---

## **PART 6: DEPLOYMENT & PRODUCTION (3 menit)**

### **6.1 Deployment Architecture**

> "Untuk production, stack kita:"

```
Backend:
├── Vercel Serverless Functions
├── Environment: Node.js 18.x
└── Auto-scaling

Database:
├── Neon PostgreSQL (atau Supabase)
├── Connection pooling
└── Automated backups

Assets:
└── Cloudinary (images)
```

---

### **6.2 Environment Configuration**

```env
# Production .env
NODE_ENV=production
DATABASE_URL=postgresql://...@neon.tech/artconnect
JWT_SECRET=<super-secure-random-string>
FRONTEND_URL=https://artconnect.vercel.app
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
```

> "Semua secrets di environment variables, tidak di-commit ke Git."

---

### **6.3 Deployment Process**

**[Show deployment files jika ada]**

```bash
# vercel.json configuration
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/index.js"
    }
  ]
}
```

> "Deploy process:"
> 1. Push code ke GitHub
> 2. Vercel auto-detect changes
> 3. Build & deploy automatically
> 4. Health check
> 5. Live in seconds!

---

## **PART 7: CONCLUSION & Q&A (2 menit)**

### **Summary**

> "Jadi, ArtConnect Backend adalah:"

✅ **Modern REST API** dengan Express.js + PostgreSQL
✅ **19 Endpoints** mencakup authentication, browsing, dan interaction
✅ **Secure** - JWT auth, bcrypt, SQL injection protection
✅ **Scalable** - UUID, indexes, pagination, counter columns
✅ **Well-structured** - MVC pattern, clean separation
✅ **Production-ready** - Deployed di Vercel dengan Neon DB
✅ **Well-documented** - Postman collection, API docs

---

### **Key Achievements**

📊 **Database:**
- 6 tables dengan proper relationships
- UUID primary keys
- Indexes untuk performance
- Sample data untuk testing

🔒 **Security:**
- JWT authentication
- Password hashing (bcrypt)
- SQL injection protection
- CORS configuration
- Input validation

🎯 **Features:**
- User authentication & profile
- Gallery & artwork browsing
- Comments dengan rating system
- Like system (artworks & comments)
- Favorites/My Gallery

📦 **Quality:**
- Consistent response format
- Error handling
- RESTful best practices
- Clean code structure

---

### **Future Enhancements**

> "Potential improvements untuk future:"

1. **Search Feature** - Full-text search dengan PostgreSQL atau Elasticsearch
2. **Admin Panel** - Manage galleries & artworks
3. **Image Upload** - Direct upload dengan Multer + Cloudinary
4. **Notification System** - Real-time notifications
5. **Rate Limiting** - Protect against abuse
6. **Caching** - Redis untuk frequently accessed data
7. **WebSocket** - Real-time features (live comments, etc)
8. **Email Service** - Email verification, password reset
9. **Advanced Analytics** - Track user behavior, popular artworks

---

### **Q&A Session**

> "Terima kasih! Sekarang saya buka sesi tanya jawab."

**Common Questions & Answers:**

**Q: Berapa lama development time?**
> A: Backend core development sekitar 2-3 minggu. Database design 3 hari, API endpoints 1 minggu, testing & refinement 1 minggu.

**Q: Kenapa tidak pakai ORM seperti Prisma/Sequelize?**
> A: Untuk learning purposes dan full control over queries. Raw SQL memberikan pemahaman mendalam tentang database operations dan optimal query writing.

**Q: Bagaimana handle concurrent requests?**
> A: Node.js event loop handle concurrency naturally. PostgreSQL connection pooling (pg library) manage multiple simultaneous database connections. Untuk scale lebih besar, bisa pakai load balancer.

**Q: Testing strategy?**
> A: Manual testing dengan Postman untuk MVP. Untuk production, bisa implement Jest untuk unit tests, Supertest untuk integration tests, dan Postman automated tests.

**Q: Kenapa user tidak bisa upload artwork?**
> A: Design decision - fokus ke curated content. Artworks dikelola admin untuk maintain quality. Ini bisa diubah di future dengan role-based permissions.

**Q: Bagaimana dengan API documentation?**
> A: Saat ini menggunakan Postman collection. Bisa di-generate jadi static docs atau pakai Swagger/OpenAPI untuk auto-generated docs.

**Q: Database backup strategy?**
> A: Neon/Supabase provide automated daily backups. Bisa setup custom backup schedule dan store di S3 untuk extra safety.

**Q: Cost estimation untuk production?**
> A: 
> - Vercel: Free tier (hobby) atau $20/month (Pro)
> - Neon: Free tier 0.5GB atau $19/month (Pro)
> - Cloudinary: Free tier 25GB atau $99/month
> - Total: Bisa start gratis, scale sesuai traffic

---

### **Resources**

**Documentation:**
- API Documentation: `/backend/documentation/postman/`
- Database Schema: `/backend/database/schema.sql`
- Deployment Guide: `/DEPLOYMENT_GUIDE.md`

**Code Repository:**
- GitHub: [Link to repo]
- Live API: https://artconnect-api.vercel.app/api
- Frontend: https://artconnect.vercel.app

**Contact:**
- Email: your.email@example.com
- GitHub: @yourusername

---

**TERIMA KASIH!** 🎉

---

## 📝 PRESENTATION TIPS

### Before Presentation:
1. ✅ Test all endpoints - make sure everything works
2. ✅ Prepare sample data - realistic names/emails
3. ✅ Clear browser/Postman cache - fresh start
4. ✅ Check internet connection - stable untuk live demo
5. ✅ Backup plan - screenshots jika demo failed
6. ✅ Time yourself - practice untuk stay on schedule

### During Presentation:
1. ✅ Speak clearly dan pacing yang baik
2. ✅ Eye contact dengan audience
3. ✅ Explain while doing - narrate your actions
4. ✅ Handle errors gracefully - show problem-solving
5. ✅ Welcome questions - engage with audience
6. ✅ Stay confident - you built this!

### After Presentation:
1. ✅ Share resources - Postman collection, GitHub link
2. ✅ Follow up questions via email
3. ✅ Gather feedback untuk improvement
4. ✅ Update documentation based on feedback

---

## 🎯 ALTERNATIVE PRESENTATION FLOWS

### **Short Version (15 minutes):**
1. Overview (2 min)
2. Database schema (3 min)
3. API demo (8 min)
4. Q&A (2 min)

### **Medium Version (25 minutes):**
1. Introduction & Tech Stack (3 min)
2. Database Design (5 min)
3. API Architecture (5 min)
4. Live Demo (10 min)
5. Q&A (2 min)

### **Extended Version (45 minutes):**
- Full script as above
- Add: Code deep-dive
- Add: Performance discussion
- Add: Multiple user demo
- Add: Extended Q&A

---

**Good luck with your presentation!** 🚀
