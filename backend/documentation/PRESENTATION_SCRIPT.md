# 🎨 ArtConnect API - Skrip Presentasi Postman

## 📋 Persiapan Sebelum Presentasi

### 1. Setup Environment
- Buka Postman
- Import collection: `ArtConnect_API.postman_collection.json`
- Set environment variables:
  - `base_url`: `http://localhost:3000/api`
  - Variables lain akan auto-generate saat testing

### 2. Pastikan Backend Running
```bash
cd backend
npm start
# Server running on http://localhost:3000
```

### 3. Database Ready
- PostgreSQL running
- Database sudah di-seed dengan data dummy

---

## 🎤 SKRIP PRESENTASI (15-20 Menit)

---

## **OPENING (1 menit)**

> "Selamat pagi/siang/sore. Hari ini saya akan mendemonstrasikan **ArtConnect Backend API** - sebuah REST API untuk platform galeri seni digital. API ini memiliki **19 endpoints** yang dibagi dalam 6 kategori utama."

> "Saya akan menggunakan Postman untuk menunjukkan setiap endpoint secara live. Mari kita mulai!"

---

## **1. OVERVIEW API (2 menit)**

> "Pertama, mari kita lihat struktur API kita."

**[Buka Postman Collection]**

> "ArtConnect API memiliki 6 section utama:"
> - **Authentication & Profile** - User management
> - **Browse Galleries** - View galleries (read-only)
> - **Browse Artworks** - View artworks (read-only)
> - **Comments** - User feedback dengan rating
> - **Likes** - Like/unlike system
> - **Favorites** - My Gallery feature

> "API ini menggunakan **JWT Bearer Token** untuk authentication."

---

## **2. AUTHENTICATION & PROFILE (4 menit)**

### **A. Register User**

> "Mari kita mulai dengan mendaftarkan user baru."

**[Klik: 1. Authentication & Profile → Register User]**

```json
{
  "email": "demo@artconnect.com",
  "password": "password123",
  "fullname": "Demo User"
}
```

> "Saya akan register dengan email `demo@artconnect.com`."

**[Klik Send]**

> "Lihat, kita mendapat response **201 Created** dengan:"
> - User ID
> - Access Token (otomatis tersimpan di environment)
> - Refresh Token

**[Show environment variables]**

---

### **B. Login User**

> "Sekarang kita coba login dengan user yang sudah ada di database."

**[Klik: Login User]**

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**[Klik Send]**

> "Login berhasil! Token otomatis tersimpan dan akan digunakan untuk request selanjutnya."

---

### **C. Get Own Profile**

> "Mari kita lihat profile user yang sedang login."

**[Klik: Get Own Profile]**

**[Klik Send]**

> "Kita dapat informasi user seperti:"
> - Fullname
> - Email
> - City & Gender
> - Role
> - Status active & verified

---

### **D. Update Profile**

> "User bisa update city dan gender. Mari kita coba."

**[Klik: Update User Profile]**

**[Form-data]**
```
city: Bandung
gender: Laki-Laki
```

**[Klik Send]**

> "Profile berhasil diupdate. Perhatikan bahwa **email dan fullname tidak bisa diubah** - ini permanent."

---

## **3. BROWSE GALLERIES (3 menit)**

### **A. Get All Galleries**

> "Sekarang kita masuk ke fitur utama - browsing galleries."

**[Klik: 2. Browse Galleries → Get All Galleries]**

**[URL sudah ada params]**
```
?page=1&limit=10&category=Contemporary
```

**[Klik Send]**

> "API mengembalikan:"
> - List galleries dengan pagination
> - Setiap gallery punya: name, description, category, cover image
> - Total galleries dan metadata pagination

> "Penting: **User tidak bisa create/edit/delete galleries** - ini view-only. Galleries dikelola oleh admin."

---

### **B. Get Gallery Detail**

> "Kita bisa lihat detail satu gallery."

**[Klik: Get Gallery Detail]**

**[Pastikan galleryId sudah terisi dari response sebelumnya]**

**[Klik Send]**

> "Kita dapat informasi lengkap gallery termasuk owner information dan artwork count."

---

### **C. Get Gallery Artworks**

> "Dan kita bisa lihat semua artworks dalam gallery ini."

**[Klik: Get Gallery Artworks]**

**[Klik Send]**

> "Ini menampilkan semua artwork yang ada di gallery tersebut, dengan pagination support."

---

## **4. BROWSE ARTWORKS (3 menit)**

### **A. Get All Artworks**

> "Mari kita browse semua artworks yang tersedia."

**[Klik: 3. Browse Artworks → Get All Artworks]**

**[URL]**
```
?page=1&limit=10&category=Painting
```

**[Klik Send]**

> "Kita dapat:"
> - List artworks dengan filter by category
> - Artwork details: title, artist, price, medium, dimensions
> - Metadata: like_count, comment_count, view_count
> - Artist information"

> "User juga **tidak bisa upload/edit/delete artworks** - sistem view-only."

---

### **B. Get Artwork Detail**

> "Kita bisa lihat detail lengkap satu artwork."

**[Klik: Get Artwork Detail]**

**[Klik Send]**

> "Detail artwork mencakup semua informasi plus related data seperti gallery info dan artist profile."

---

## **5. COMMENTS SYSTEM (3 menit)**

### **A. Get Artwork Comments**

> "Sekarang fitur interaksi - Comments. Mari lihat comments pada satu artwork."

**[Klik: 4. Comments → Get Artwork Comments]**

**[Klik Send]**

> "Kita dapat list comments dengan informasi commenter."

---

### **B. Get Average Rating**

> "Kita juga bisa lihat average rating artwork."

**[Klik: Get Average Rating]**

**[Klik Send]**

> "Menampilkan rata-rata rating dari semua comments."

---

### **C. Add Comment**

> "User yang login bisa memberikan comment dengan rating."

**[Klik: Add Comment]**

```json
{
  "text": "Beautiful artwork! The colors are amazing!",
  "rating": 5
}
```

**[Klik Send]**

> "Comment berhasil dibuat dengan rating 5 bintang."

---

### **D. Update & Delete Comment**

> "User bisa update atau delete comment mereka sendiri."

**[Klik: Update Comment]**

```json
{
  "text": "Absolutely stunning! Best artwork I've seen!"
}
```

**[Klik Send]**

> "Comment berhasil diupdate."

**[Quick show Delete Comment endpoint tanpa execute]**

> "Dan ini endpoint untuk delete comment jika diperlukan."

---

## **6. LIKES SYSTEM (2 menit)**

### **A. Like Artwork**

> "User bisa like artwork yang mereka sukai."

**[Klik: 5. Likes → Like Artwork]**

**[Klik Send]**

> "Artwork berhasil di-like. Like count akan bertambah."

---

### **B. Unlike Artwork**

> "Dan tentu saja bisa unlike."

**[Klik: Unlike Artwork]**

**[Klik Send]**

> "Like dihapus."

---

### **C. Like Comment**

> "Selain artwork, user juga bisa like comments."

**[Klik: Like Comment]**

**[Klik Send]**

> "Comment berhasil di-like."

**[Quick show Unlike Comment]**

> "Dan unlike comment jika berubah pikiran."

---

## **7. FAVORITES SYSTEM (2 menit)**

### **A. Add to Favorites**

> "Fitur terakhir - My Gallery. User bisa save favorite artworks."

**[Klik: 6. Favorites → Add to Favorites]**

**[Klik Send]**

> "Artwork berhasil ditambahkan ke My Gallery."

---

### **B. Get User Favorites**

> "Dan kita bisa lihat semua favorite artworks user."

**[Klik: Get User Favorites]**

**[Klik Send]**

> "Ini menampilkan koleksi personal user - My Gallery mereka."

---

### **C. Remove from Favorites**

> "User bisa hapus dari favorites kapan saja."

**[Klik: Remove from Favorites]**

**[Klik Send]**

> "Artwork berhasil dihapus dari My Gallery."

---

## **CLOSING (1 menit)**

> "Jadi, itu adalah **ArtConnect API** dengan 19 endpoints yang mencakup:"

✅ **Authentication** - Register, Login, Profile Management
✅ **Browse** - Galleries & Artworks (view-only)
✅ **Interact** - Comments dengan Rating System
✅ **Engage** - Likes untuk Artworks & Comments
✅ **Personalize** - Favorites/My Gallery Feature

> "API ini sudah **production-ready** dengan:"
> - ✅ JWT Authentication
> - ✅ Input Validation
> - ✅ Error Handling
> - ✅ Pagination Support
> - ✅ RESTful Best Practices

> "**Terima kasih!** Ada pertanyaan?"

---

## 💡 TIPS PRESENTASI

### Do's ✅
1. **Bicara sambil klik** - jelaskan sambil execute request
2. **Tunjukkan response** - scroll dan highlight key fields
3. **Explain status codes** - 200, 201, 400, 401, 404
4. **Show environment variables** - tunjukkan auto-save token
5. **Gunakan data yang masuk akal** - pakai nama/email realistic

### Don'ts ❌
1. Jangan terlalu cepat - beri waktu audience lihat response
2. Jangan skip error handling - show 1-2 error case
3. Jangan lupa check token - pastikan authenticated
4. Jangan execute delete tanpa backup - bisa break demo

---

## 🎯 DEMO SCENARIOS (Alternative Flow)

### **Scenario 1: New User Journey (5 menit)**
1. Register → Login
2. Browse Galleries → Select Gallery → View Artworks
3. View Artwork Detail → Add Comment → Like Artwork
4. Add to Favorites → View My Gallery

### **Scenario 2: Interaction Focus (3 menit)**
1. Login existing user
2. Browse artworks
3. Add multiple comments with different ratings
4. Show average rating
5. Like artwork and comments
6. Build My Gallery collection

### **Scenario 3: Error Handling Demo (2 menit)**
1. Register dengan email duplicate → 409 Conflict
2. Login dengan password salah → 401 Unauthorized
3. Access protected route tanpa token → 401
4. Update comment orang lain → 403 Forbidden

---

## 📝 Q&A PREPARATION

### Pertanyaan yang Mungkin Muncul:

**Q: Kenapa user tidak bisa upload artwork?**
> A: Ini design decision - ArtConnect fokus ke platform viewing/curating. Artworks dikelola admin via separate admin panel untuk quality control.

**Q: Bagaimana dengan search feature?**
> A: Saat ini menggunakan category filter. Search akan ditambahkan di future version dengan Elasticsearch.

**Q: Database apa yang digunakan?**
> A: PostgreSQL dengan UUID sebagai primary key untuk scalability.

**Q: Bagaimana dengan security?**
> A: JWT authentication, bcrypt password hashing, input validation, SQL injection protection via parameterized queries.

**Q: Rate limiting ada?**
> A: Bisa ditambahkan dengan express-rate-limit, tapi belum di-implement di demo ini.

**Q: Deployment ke mana?**
> A: Backend ke Vercel, Database ke Neon/Supabase, Frontend ke Vercel. Sudah ada deployment guide.

---

## 🚀 BONUS: Advanced Demo (Jika Ada Waktu)

### Test dengan Multiple Users
1. Buka 2 Postman tabs/windows
2. Register 2 users berbeda
3. User 1 create comment
4. User 2 like comment user 1
5. Show interaction between users

### Show Pagination
1. Get artworks dengan limit=3, page=1
2. Get artworks dengan limit=3, page=2
3. Tunjukkan total dan metadata

### Show Filtering
1. Get artworks category=Painting
2. Get artworks category=Photography
3. Get galleries category=Contemporary

---

**GOOD LUCK!** 🎉
