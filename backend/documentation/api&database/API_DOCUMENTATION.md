# ArtConnect API - Features & Documentation

**Version:** 1.0  
**Release Date:** December 2025  
**Status:** ✅ Active

---

## 📋 Overview

ArtConnect Backend API provides a platform where users can:
- **Browse** galleries and artworks
- **Save Favorites** to personal collection (My Gallery)
- **Give Feedback** through comments and likes
- **Filter by Category** to discover artworks

**Key Constraint:** Users are **view-only consumers** for galleries and artworks. They cannot create, edit, or delete galleries/artworks (managed via admin FE).

---

## 🎯 User Capabilities

### ✅ User CAN DO:
- Register and login
- View own profile (fullname, email, city, gender)
- Edit own profile (city & gender only)
- Browse galleries (view-only)
- Browse artworks (view-only)
- Browse users and their galleries
- Save artworks to favorites (My Gallery)
- Comment on artwork
- Like/unlike artwork
- Like/unlike comments
- Filter by category

### ❌ User CANNOT DO:
- Create gallery (admin only)
- Edit gallery (admin only)
- Delete gallery (admin only)
- Upload artwork (admin only)
- Edit artwork (admin only)
- Delete artwork (admin only)
- Join/create community (feature removed)

---

## 🔌 API Endpoints (~23 total)

### 1️⃣ Authentication & Profile (7 endpoints)

#### POST `/api/users/register`
Register a new user account
```
Body: {
  "email": "user@example.com",
  "password": "password123",
  "fullname": "John Doe"
}
Response: { id, email, fullname, token, refreshToken }
```

#### POST `/api/users/login`
Login and get access token
```
Body: { "email": "user@example.com", "password": "password123" }
Response: { token, refreshToken, user }
```

#### POST `/api/users/refresh-token`
Get new access token
```
Header: Authorization: Bearer <refreshToken>
Response: { token }
```

#### GET `/api/users/profile`
Get current logged-in user profile
```
Header: Authorization: Bearer <accessToken>
Response: { id, email, fullname, city, gender, role, timestamps }
```

#### GET `/api/users/:id`
Get user profile by ID
```
Header: Authorization: Bearer <accessToken>
Response: { id, email, fullname, city, gender, role, timestamps }
```

#### PUT `/api/users/:id`
Update user profile (city & gender only)
```
Header: Authorization: Bearer <accessToken>
Body: { "city": "Jakarta", "gender": "Laki-Laki" }
Response: { updated user object }
```

#### DELETE `/api/users/:id`
Deactivate user account
```
Header: Authorization: Bearer <accessToken>
Response: { message: "Account deleted" }
```

---

### 2️⃣ Browse Galleries (3 endpoints - View Only)

#### GET `/api/galleries`
Browse all galleries with pagination
```
Query: ?page=1&limit=10&category=Contemporary
Response: { data: [...], total, page, limit }
```

#### GET `/api/galleries/:id`
Get gallery detail
```
Response: { id, name, description, category, owner, artworks_count, created_at }
```

#### GET `/api/galleries/:id/artworks`
Get artworks in gallery
```
Query: ?page=1&limit=10
Response: { data: [...], total, page, limit }
```

---

### 3️⃣ Browse Users (3 endpoints)

#### GET `/api/users`
Get all users with pagination
```
Query: ?page=1&limit=10
Header: Authorization: Bearer <accessToken>
Response: { data: [...], total, page, limit }
```

#### GET `/api/users/:id`
Get user profile (already covered in Authentication section)
```
Response: { id, email, fullname, city, gender, role, galleries, exhibitions }
```

#### GET `/api/users/:id/galleries`
Get all galleries by user
```
Header: Authorization: Bearer <accessToken>
Response: { data: [...], total }
```

#### GET `/api/users/:id/exhibitions`
Get all exhibitions by user
```
Header: Authorization: Bearer <accessToken>
Response: { data: [...], total }
```

---

### 5️⃣ Browse Artworks (2 endpoints - View Only)

#### GET `/api/artworks`
Browse all artworks
```
Query: ?page=1&limit=10&category=Painting&is_for_sale=true
Response: { data: [...], total, page, limit }
```

#### GET `/api/artworks/:id`
Get artwork detail
```
Response: { 
  id, gallery_id, owner_id, title, description, 
  image_url, category, price, like_count, comment_count, 
  created_at, updated_at 
}
```

**Note:** Artwork upload/edit/delete handled via separate admin FE

---

### 5️⃣ Favorites - My Gallery (3 endpoints)

#### POST `/api/artworks/:id/favorite`
Add artwork to favorites (My Gallery)
```
Header: Authorization: Bearer <accessToken>
Response: { message: "Added to favorites", favorite_id }
```

#### DELETE `/api/artworks/:id/favorite`
Remove artwork from favorites
```
Header: Authorization: Bearer <accessToken>
Response: { message: "Removed from favorites" }
```

#### GET `/api/users/:id/favorites`
Get user's favorite artworks collection
```
Header: Authorization: Bearer <accessToken>
Query: ?page=1&limit=10
Response: { data: [...favorite artworks], total, page, limit }
```

---

### 6️⃣ Comments (4 endpoints)

#### POST `/api/artworks/:id/comments`
Add comment on artwork
```
Header: Authorization: Bearer <accessToken>
Body: { "text": "Amazing artwork!", "rating": 5 }
Response: { id, artwork_id, author_id, text, rating, created_at }
```

#### GET `/api/artworks/:id/comments`
Get comments on artwork
```
Query: ?page=1&limit=10&sortBy=newest
Response: { data: [...], total, page, limit }
```

#### PUT `/api/comments/:id`
Update own comment
```
Header: Authorization: Bearer <accessToken>
Body: { "text": "Updated comment", "rating": 4 }
Response: { updated comment object }
```

#### DELETE `/api/comments/:id`
Delete own comment
```
Header: Authorization: Bearer <accessToken>
Response: { message: "Comment deleted" }
```

---

### 7️⃣ Likes (4 endpoints)

#### POST `/api/artworks/:id/like`
Like artwork (toggle)
```
Header: Authorization: Bearer <accessToken>
Response: { liked: true, like_count: 25 }
```

#### DELETE `/api/artworks/:id/like`
Unlike artwork
```
Header: Authorization: Bearer <accessToken>
Response: { liked: false, like_count: 24 }
```

#### POST `/api/comments/:id/like`
Like comment (toggle)
```
Header: Authorization: Bearer <accessToken>
Response: { liked: true, like_count: 3 }
```

#### DELETE `/api/comments/:id/like`
Unlike comment
```
Header: Authorization: Bearer <accessToken>
Response: { liked: false, like_count: 2 }
```

---

### 8️⃣ Browse by Category Filters

User **tidak memiliki fitur search**. Browsing dilakukan dengan **filter category** pada setiap endpoint:

#### Filter Galleries by Category
```
GET /api/galleries?category=Contemporary&page=1&limit=10
Query: ?category=Contemporary|Abstract|Modern|Traditional
```

#### Filter Artworks by Category  
```
GET /api/artworks?category=Painting&page=1&limit=10
Query: ?category=Painting|Sculpture|Photography|Digital
```

**Note:** Tidak ada endpoint `/search`. User hanya bisa browse dengan filter category.

---

## 📊 Statistics

| Category | Before | After | Change |
|----------|--------|-------|--------|
| Authentication & Users | 11 | 7 | -4 |
| Galleries | 6 | 3 | -3 (view-only) |
| Artworks | 6 | 2 | -4 (view-only) |
| Favorites | 0 | 3 | +3 (new) |
| Comments | 5 | 4 | -1 |
| Likes | 4 | 4 | 0 |
| Exhibitions | 8 | 0 | -8 (removed) |
| Communities | 7 | 0 | -7 (removed) |
| Search | 4 | 0 | -4 (removed, use filters) |
| **TOTAL** | **51** | **~23** | **-28** |

---

## 🔐 Authentication

### JWT Bearer Token
All protected endpoints require:
```
Header: Authorization: Bearer <accessToken>
```

### Token Refresh
```
POST /api/users/refresh-token
Header: Authorization: Bearer <refreshToken>
Response: { token: "new_access_token" }
```

---

## 🚀 Getting Started

### 1. Register User
```bash
POST http://localhost:3000/api/users/register
Body: { "email": "user@example.com", "password": "pwd", "fullname": "John" }
```

### 2. Login
```bash
POST http://localhost:3000/api/users/login
Body: { "email": "user@example.com", "password": "pwd" }
Response: { "token": "...", "refreshToken": "..." }
```

### 3. Browse Galleries
```bash
GET http://localhost:3000/api/galleries?page=1&limit=10
```

### 4. View Artwork
```bash
GET http://localhost:3000/api/artworks/artwork-id
```

### 5. Add Comment
```bash
POST http://localhost:3000/api/artworks/artwork-id/comments
Header: Authorization: Bearer <token>
Body: { "text": "Great work!", "rating": 5 }
```

### 6. Like Artwork
```bash
POST http://localhost:3000/api/artworks/artwork-id/like
Header: Authorization: Bearer <token>
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- Pagination default: page=1, limit=10
- User profile fields displayed: id, email, fullname, city, gender
- User profile fields editable: city, gender (email & fullname are permanent)
- Favorites feature (My Gallery) available - save artworks to personal collection
- Communities feature removed for MVP
- Artwork upload removed - Artists upload via admin FE
- **Search feature removed** - use category filters on GET endpoints (`?category=xxx`)

---

## 🔗 Related Documentation

- **User Role Changes**: `documentation/api&database/USER_ROLE_CHANGES.md`
- **Postman Collection**: `documentation/postman/ArtConnect_API.postman_collection.json`
- **Database Schema**: `database/schema.sql`
- **README**: `Readme.md`

