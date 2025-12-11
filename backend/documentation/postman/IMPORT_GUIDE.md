# 📮 ArtConnect API - Import & Setup Guide

Panduan lengkap untuk import dan setup Postman Collection untuk testing ArtConnect Backend API.

---

## 📥 Import ke Postman

### Metode 1: Import File JSON

1. **Buka Postman**
2. **Klik tombol "Import"** di pojok kiri atas
3. **Pilih "File"** tab
4. **Upload file berikut:**
   - `ArtConnect_API.postman_collection.json` (Collection)
   - `ArtConnect_Environment.postman_environment.json` (Environment)
5. **Klik "Import"**

### Metode 2: Drag & Drop

1. Buka Postman
2. Drag & drop kedua file JSON ke dalam window Postman
3. Postman akan otomatis mendeteksi dan import

---

## ⚙️ Setup Environment

### 1. Aktivasi Environment

1. Di pojok kanan atas Postman, klik dropdown **"No Environment"**
2. Pilih **"ArtConnect Environment"**
3. Environment sekarang aktif dan siap digunakan

### 2. Konfigurasi Base URL

Environment sudah memiliki default value:
```
base_url: http://localhost:3000/api
```

**Untuk mengubah:**
1. Klik ikon "eye" di pojok kanan atas
2. Klik "Edit" pada ArtConnect Environment
3. Ubah value `base_url` sesuai kebutuhan:
   - Local: `http://localhost:3000/api`
   - Production: `https://your-api.com/api`
4. Klik "Save"

### 3. Variables yang Tersedia

Environment ini sudah dikonfigurasi dengan variables berikut:

| Variable | Description | Auto-filled |
|----------|-------------|-------------|
| `base_url` | Base API URL | ❌ Manual |
| `accessToken` | JWT access token | ✅ Auto (after login) |
| `refreshToken` | JWT refresh token | ✅ Auto (after login) |
| `userId` | Current user ID | ✅ Auto (after login) |
| `galleryId` | Sample gallery ID | ✅ Auto (after browse) |
| `artworkId` | Sample artwork ID | ✅ Auto (after browse) |
| `commentId` | Last created comment ID | ✅ Auto (after create) |

**✨ Auto-fill Magic:** Token dan ID akan otomatis tersimpan setelah request berhasil!

---

## 🚀 Quick Start Testing

### Step 1: Register & Login

#### 1. Register User
```
POST → Authentication & Users > Register User
```
- **Body sudah pre-filled** dengan contoh data
- Klik **"Send"**
- ✅ `userId` akan otomatis tersimpan

#### 2. Login User
```
POST → 1. Authentication & Profile > Login User
```
- **Body sudah pre-filled** (email & password sama dengan register)
- Klik **"Send"**
- ✅ `accessToken`, `refreshToken`, dan `userId` otomatis tersimpan
- 🔑 Sekarang Anda bisa akses protected endpoints!

### Step 2: Browse Content (View Only)

#### 3. Get All Galleries
```
GET → 2. Browse Galleries > Get All Galleries
```
- Lihat semua galleries yang tersedia
- Gunakan `?category=xxx` untuk filter by category
- Klik **"Send"**
- ✅ `galleryId` otomatis tersimpan dari response

#### 4. Get Gallery Artworks
```
GET → 2. Browse Galleries > Get Gallery Artworks
```
- Menggunakan `{{galleryId}}` yang sudah tersimpan
- Lihat semua artworks dalam gallery
- Klik **"Send"**
- ✅ `artworkId` otomatis tersimpan dari response

#### 5. Get Artwork Detail
```
GET → 3. Browse Artworks > Get Artwork Detail
```
- Menggunakan `{{artworkId}}` yang sudah tersimpan
- Lihat detail lengkap artwork
- Klik **"Send"**

### Step 3: Favorites & Feedback Features

#### 6. Add to Favorites
```
POST → 5. Favorites > Add to Favorites
```
- Simpan artwork ke koleksi favorit pribadi (My Gallery)
- Klik **"Send"**

#### 7. Like Artwork
```
POST → 7. Likes > Like Artwork
```

#### 8. Add Comment
```
POST → 6. Comments > Add Comment
```
- Rating: 1-5
- ✅ `commentId` otomatis tersimpan

---

## 📂 Collection Structure

```
ArtConnect API - Art Enthusiast Role
│
├── 📁 1. Authentication & Profile (7 requests)
│   ├── Register User
│   ├── Login User
│   ├── Refresh Token
│   ├── Get Own Profile
│   ├── Get User Profile By ID
│   ├── Update User Profile
│   └── Delete User Account
│
├── 📁 2. Browse Galleries (3 requests - View Only)
│   ├── Get All Galleries
│   ├── Get Gallery Detail
│   └── Get Gallery Artworks
│
├── 📁 3. Browse Artworks (2 requests - View Only)
│   ├── Get All Artworks
│   └── Get Artwork Detail
│
├── 📁 4. Browse Users (3 requests)
│   ├── Get All Users
│   ├── Get User By ID
│   └── Get User Galleries
│
├── 📁 5. Favorites - My Gallery (3 requests)
│   ├── Add to Favorites
│   ├── Remove from Favorites
│   └── Get My Favorites
│
├── 📁 6. Comments (4 requests - Feedback)
│   ├── Add Comment
│   ├── Get Artwork Comments
│   ├── Update Comment
│   └── Delete Comment
│
└── 📁 7. Likes (4 requests - Feedback)
    ├── Like Artwork
    ├── Unlike Artwork
    ├── Like Comment
    └── Unlike Comment
```

**Total: ~23 API Endpoints** ✨

**Removed Features:**
- ❌ Search endpoints (use category filters)
- ❌ Trending/Recommendations
- ❌ Communities (all)
- ❌ Gallery create/edit/delete (admin FE only)
- ❌ Artwork upload/edit/delete (admin FE only)
- ❌ Exhibitions (all - removed)

---

## 🔐 Authentication Flow

### Protected Endpoints (Requires Token)

Endpoints yang memerlukan authentication akan otomatis menggunakan `{{accessToken}}` dari environment.

**Cara Kerja:**
1. Login → Token tersimpan otomatis
2. Request protected endpoint → Token otomatis di-attach ke header
3. Token expired? → Gunakan "Refresh Token" request

### Token Headers

Protected requests sudah dikonfigurasi dengan:
```
Authorization: Bearer {{accessToken}}
```

Anda **tidak perlu** menambahkan header ini manual!

---

## 📤 File Upload Endpoints

Beberapa endpoints memerlukan file upload:

### Endpoints dengan File Upload:
- **Update User Profile** → `profilePicture` (optional)
- **Upload Artwork** → `image` (required) ⚠️

### Cara Upload File di Postman:

1. Pilih request yang support file upload
2. Tab **"Body"** → sudah di-set ke **"form-data"**
3. Pada field dengan type **"file"**, klik **"Select Files"**
4. Pilih image file dari komputer Anda
5. Klik **"Send"**

**Format yang didukung:**
- JPG/JPEG
- PNG
- WebP
- Max size: ~10MB (tergantung konfigurasi server)

---

## 🔍 Query Parameters Guide

### Pagination

Semua list endpoints mendukung pagination:
```
?page=1&limit=10
```

**Parameters:**
- `page`: Halaman (default: 1)
- `limit`: Items per page (default: 10)

### Filtering

#### Galleries:
```
?category=Contemporary&search=art
```

#### Artworks:
```
?category=Painting&is_for_sale=true
```

### Browse with Category Filters:
```
?category=Abstract Art
```
- Category: `Painting`, `Photography`, `Sculpture`, `Digital`, `Contemporary`, dll

---

## 🧪 Testing Scenarios

### Scenario 1: Complete User Flow
1. ✅ Register User
2. ✅ Login User
3. ✅ Get Own Profile
4. ✅ Update User Profile
5. ✅ Get User Galleries

### Scenario 2: Browse Content
1. ✅ Get All Galleries (view only)
2. ✅ Get Gallery Detail
3. ✅ Get Gallery Artworks
4. ✅ Get All Artworks
5. ✅ Get Artwork By ID

### Scenario 3: Favorites (My Gallery)
1. ✅ Add Artwork to Favorites
2. ✅ Get My Favorites
3. ✅ Remove from Favorites

### Scenario 4: Feedback & Interactions
1. ✅ Like Artwork
2. ✅ Add Comment (with rating)
3. ✅ Like Comment
4. ✅ Get Artwork Comments
5. ✅ Update/Delete Own Comment

---

## 🎯 Pre-Request Scripts

Collection ini menggunakan **Test Scripts** untuk auto-save variables:

### Login Request Script:
```javascript
if (pm.response.code === 201) {
    var jsonData = pm.response.json();
    pm.environment.set('accessToken', jsonData.data.token);
    pm.environment.set('refreshToken', jsonData.data.refreshToken);
    pm.environment.set('userId', jsonData.data.id);
}
```

### Get Gallery Artworks Script:
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    if (jsonData.data.length > 0) {
        pm.environment.set('artworkId', jsonData.data[0].id);
    }
}
```

**Benefit:** Anda tidak perlu copy-paste ID manual! 🎉

---

## 🐛 Troubleshooting

### Error 401 Unauthorized
**Problem:** Token tidak valid atau expired

**Solution:**
1. Pastikan sudah login
2. Check environment variable `accessToken` sudah terisi
3. Jika expired, gunakan "Refresh Token" request
4. Atau login ulang

### Error 403 Forbidden
**Problem:** Tidak punya akses (bukan owner)

**Solution:**
- Hanya owner yang bisa edit/delete resource
- Pastikan resource milik user yang sedang login

### Error 404 Not Found
**Problem:** Resource ID tidak ditemukan

**Solution:**
- Pastikan ID valid dan resource belum dihapus
- Check environment variables (`galleryId`, `artworkId`, dll)

### Error 422 Validation Error
**Problem:** Data tidak valid

**Solution:**
- Check required fields sudah diisi
- Pastikan format data benar (email, date, dll)
- Check file upload (size, format)

### Error 500 Internal Server Error
**Problem:** Server error

**Solution:**
1. Check server logs
2. Pastikan database running
3. Verify schema sudah di-import
4. Check network connection

### File Upload Error
**Problem:** File tidak terupload

**Solution:**
1. Pastikan type field di-set ke "file" (bukan "text")
2. Check file size tidak melebihi limit
3. Gunakan format yang didukung (JPG, PNG, WebP)

---

## 💡 Tips & Best Practices

### 1. Organize dengan Folders
- Collection sudah terorganisir dengan baik
- Gunakan folder sesuai feature yang ingin ditest

### 2. Gunakan Environment
- Jangan hardcode values
- Manfaatkan variables untuk flexibility

### 3. Save Requests
- Simpan request yang sudah dimodifikasi
- Buat duplicate untuk variasi testing

### 4. Use Pre-filled Examples
- Semua request sudah memiliki example data
- Modify sesuai kebutuhan testing

### 5. Check Response
- Perhatikan status code
- Validate response structure
- Check data accuracy

### 6. Sequential Testing
- Test sesuai flow (Register → Login → Create, dll)
- Dependency: Login dulu sebelum test protected endpoints

### 7. Clean Up
- Delete test data setelah selesai
- Atau gunakan database terpisah untuk testing

---

## 📊 API Response Format

### Success Response (2xx)
```json
{
  "status": 200,
  "message": "Success message",
  "data": {
    // Response data
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### Error Response (4xx, 5xx)
```json
{
  "status": 400,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

---

## 📝 Additional Resources

- **API Documentation:** `API_DOCUMENTATION.md`
- **User Role Changes:** `USER_ROLE_CHANGES.md`
- **Database Schema:** `schema.sql`
- **Cloudinary Setup:** `CLOUDINARY_SETUP.md`

---

## 🎉 You're All Set!

Collection dan environment sudah siap digunakan. Mulai testing dengan:

1. **Pastikan server running:** `npm run dev`
2. **Pilih environment:** ArtConnect Environment
3. **Mulai dari:** 1. Authentication & Profile → Register User
4. **Browse galleries:** 2. Browse Galleries → Get All Galleries
5. **Upload artwork:** 5. Artworks Management → Upload Artwork
6. **Have fun testing!** 🚀

---

**Happy Testing! 🎨**

