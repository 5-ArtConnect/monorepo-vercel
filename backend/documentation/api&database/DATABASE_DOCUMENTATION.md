# ArtConnect Database Documentation

**Version:** 1.0  
**Database:** PostgreSQL 12+  
**Created:** December 2025  
**Status:** ✅ Active

---

## 📋 Overview

Database ArtConnect dirancang untuk mendukung platform view-only dimana user sebagai **art enthusiast** dapat browse, menyimpan favorit, dan memberikan feedback pada karya seni.

**Key Features:**
- UUID-based primary keys untuk security
- Soft delete untuk data recovery
- Auto-increment counters dengan database triggers
- Optimized indexing untuk query performance
- Relational integrity dengan foreign keys
- Auto-update timestamps

---

## 🗂️ Database Schema

### **Active Tables (6 Core Tables)**

#### 1. **USERS** - User Accounts & Profiles
Menyimpan data user sebagai penikmat seni.

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| `id` | UUID | Primary key | PK, DEFAULT uuid_generate_v4() |
| `email` | VARCHAR(255) | Email user | UNIQUE, NOT NULL |
| `password` | VARCHAR(255) | Hashed password | NOT NULL |
| `fullname` | VARCHAR(255) | Nama lengkap | NOT NULL |
| `username` | VARCHAR(100) | Username unik | UNIQUE |
| `bio` | TEXT | Bio profil | - |
| `profile_picture` | VARCHAR(500) | URL foto profil | - |
| `phone` | VARCHAR(20) | Nomor telepon | - |
| `city` | VARCHAR(100) | Kota domisili | **EDITABLE** |
| `gender` | VARCHAR(50) | Jenis kelamin | **EDITABLE** |
| `role` | VARCHAR(50) | User role | DEFAULT 'user' |
| `created_at` | TIMESTAMP | Waktu registrasi | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | Waktu update terakhir | AUTO UPDATE |
| `is_active` | BOOLEAN | Status aktif | DEFAULT true |
| `is_verified` | BOOLEAN | Status verifikasi | DEFAULT false |
| `verification_token` | VARCHAR(255) | Token verifikasi email | - |

**Indexes:**
- `idx_users_email` - Email lookup
- `idx_users_username` - Username lookup
- `idx_users_is_active` - Active users filter

**Notes:**
- Email dan fullname **PERMANENT** (tidak bisa diubah)
- Hanya `city` dan `gender` yang editable oleh user
- Password di-hash menggunakan bcrypt

---

#### 2. **GALLERIES** - Art Galleries (View-Only)
Galeri seni yang dibuat oleh admin via admin FE (users hanya bisa view/browse).

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| `id` | UUID | Primary key | PK, DEFAULT uuid_generate_v4() |
| `owner_id` | UUID | ID pembuat gallery | FK → users(id), NOT NULL |
| `name` | VARCHAR(255) | Nama gallery | NOT NULL |
| `description` | TEXT | Deskripsi gallery | - |
| `category` | VARCHAR(100) | Kategori (painting, sculpture, dll) | - |
| `cover_image_url` | VARCHAR(500) | URL cover image | - |
| `created_at` | TIMESTAMP | Waktu dibuat | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | Waktu update | AUTO UPDATE |
| `is_deleted` | BOOLEAN | Soft delete flag | DEFAULT false |

**Indexes:**
- `idx_galleries_owner_id` - Owner lookup
- `idx_galleries_category` - Category filter
- `idx_galleries_created_at` - Sort by date

**User Access:**
- ❌ **TIDAK bisa CREATE** gallery
- ✅ **Hanya BROWSE** (view-only)

---

#### 3. **ARTWORKS** - Art Pieces
Karya seni di dalam gallery (diupload via admin FE, users hanya bisa view).

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| `id` | UUID | Primary key | PK, DEFAULT uuid_generate_v4() |
| `gallery_id` | UUID | ID gallery | FK → galleries(id), NOT NULL |
| `artist_id` | UUID | ID artist/creator | FK → users(id), NOT NULL |
| `title` | VARCHAR(255) | Judul karya | NOT NULL |
| `description` | TEXT | Deskripsi karya | - |
| `image_url` | VARCHAR(500) | URL gambar karya | NOT NULL |
| `category` | VARCHAR(100) | Kategori | - |
| `medium` | VARCHAR(100) | Medium (oil, acrylic, dll) | - |
| `dimensions` | VARCHAR(100) | Ukuran karya | - |
| `price` | DECIMAL(15, 2) | Harga jika dijual | - |
| `is_for_sale` | BOOLEAN | Status dijual | DEFAULT false |
| `created_at` | TIMESTAMP | Waktu dibuat | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | Waktu update | AUTO UPDATE |
| `is_deleted` | BOOLEAN | Soft delete | DEFAULT false |
| `view_count` | INT | Jumlah views | DEFAULT 0 |
| `like_count` | INT | Jumlah likes | **AUTO INCREMENT** |
| `comment_count` | INT | Jumlah komentar | **AUTO INCREMENT** |

**Indexes:**
- `idx_artworks_gallery_id` - Gallery lookup
- `idx_artworks_artist_id` - Artist lookup
- `idx_artworks_category` - Category filter
- `idx_artworks_created_at` - Sort by date
- `idx_artworks_like_count` - Sort by popularity
- `idx_artworks_popular` - Composite index (likes, views, date)

**Auto Counters:**
- `like_count` → Auto +1/-1 via trigger saat like/unlike
- `comment_count` → Auto +1/-1 via trigger saat add/delete comment

**User Access:**
- ✅ **BROWSE & VIEW** artworks
- ❌ **TIDAK bisa CREATE/EDIT/DELETE** artwork (admin only)

---

#### 4. **FAVORITES** - User's Favorite Artworks (My Gallery)
Koleksi favorit pribadi user.

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| `id` | UUID | Primary key | PK, DEFAULT uuid_generate_v4() |
| `user_id` | UUID | ID user | FK → users(id), NOT NULL |
| `artwork_id` | UUID | ID artwork | FK → artworks(id), NOT NULL |
| `created_at` | TIMESTAMP | Waktu disimpan | DEFAULT CURRENT_TIMESTAMP |

**Constraints:**
- UNIQUE(`user_id`, `artwork_id`) - User tidak bisa favorite artwork yang sama 2x

**Indexes:**
- `idx_favorites_user_id` - User's favorites lookup
- `idx_favorites_artwork_id` - Artwork favorited by who

**User Access:**
- ✅ **ADD** artwork ke favorites
- ✅ **REMOVE** dari favorites
- ✅ **VIEW** daftar favorites sendiri

---

#### 5. **COMMENTS** - User Feedback on Artworks
Komentar user pada karya seni.

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| `id` | UUID | Primary key | PK, DEFAULT uuid_generate_v4() |
| `artwork_id` | UUID | ID artwork | FK → artworks(id), NOT NULL |
| `author_id` | UUID | ID pembuat komentar | FK → users(id), NOT NULL |
| `text` | TEXT | Isi komentar | NOT NULL |
| `rating` | INT | Rating opsional (1-5) | CHECK (rating >= 1 AND <= 5) |
| `created_at` | TIMESTAMP | Waktu dibuat | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | Waktu update | AUTO UPDATE |
| `is_deleted` | BOOLEAN | Soft delete | DEFAULT false |
| `like_count` | INT | Jumlah likes | **AUTO INCREMENT** |

**Indexes:**
- `idx_comments_artwork_id` - Artwork comments lookup
- `idx_comments_author_id` - User's comments lookup
- `idx_comments_created_at` - Sort by date
- `idx_comments_artwork_date` - Composite (artwork + date)

**Auto Counters:**
- `like_count` → Auto +1/-1 via trigger saat comment di-like/unlike

**User Access:**
- ✅ **CREATE** komentar pada artwork
- ✅ **UPDATE** komentar sendiri
- ✅ **DELETE** komentar sendiri
- ✅ **VIEW** semua komentar

---

#### 6. **LIKES** - Likes on Artworks & Comments
Like untuk artwork dan comment.

| Column | Type | Description | Constraints |
|--------|------|-------------|-------------|
| `id` | UUID | Primary key | PK, DEFAULT uuid_generate_v4() |
| `user_id` | UUID | ID user yang like | FK → users(id), NOT NULL |
| `artwork_id` | UUID | ID artwork (nullable) | FK → artworks(id) |
| `comment_id` | UUID | ID comment (nullable) | FK → comments(id) |
| `created_at` | TIMESTAMP | Waktu like | DEFAULT CURRENT_TIMESTAMP |

**Constraints:**
- UNIQUE(`user_id`, `artwork_id`) - User tidak bisa like artwork 2x
- UNIQUE(`user_id`, `comment_id`) - User tidak bisa like comment 2x
- CHECK: Minimal salah satu (`artwork_id` OR `comment_id`) harus ada

**Indexes:**
- `idx_likes_user_id` - User's likes lookup
- `idx_likes_artwork_id` - Artwork likes count
- `idx_likes_comment_id` - Comment likes count

**Triggers:**
- INSERT like → Auto +1 counter di `artworks.like_count` atau `comments.like_count`
- DELETE like → Auto -1 counter

**User Access:**
- ✅ **LIKE** artwork
- ✅ **UNLIKE** artwork
- ✅ **LIKE** comment
- ✅ **UNLIKE** comment

---

### **Inactive Tables (Preserved for Backward Compatibility)**

#### 7. **EXHIBITIONS** - REMOVED ❌
Exhibition feature dihapus, tabel tidak digunakan.

#### 8. **EXHIBITION_ARTWORKS** - REMOVED ❌
Junction table untuk exhibitions (tidak digunakan).

#### 9. **COMMUNITIES** - INACTIVE ❌
Community feature dihapus, tabel dipertahankan untuk backward compatibility.

#### 10. **COMMUNITY_MEMBERS** - INACTIVE ❌
Members dari communities (tidak digunakan).

#### 11. **COMMUNITY_GALLERY** - INACTIVE ❌
Gallery dalam communities (tidak digunakan).

#### 12. **NOTIFICATIONS** - NOT IMPLEMENTED ⏸️
Notifikasi (belum diimplementasikan, tapi tabel sudah ada).

---

## 🔄 Database Triggers & Automation

### **Auto-Update Timestamps**

Trigger untuk auto-update `updated_at` pada semua tabel:

```sql
CREATE TRIGGER update_[table]_updated_at BEFORE UPDATE ON [table]
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

**Applies to:**
- users
- galleries
- artworks
- comments
- exhibitions
- communities

---

### **Auto-Increment Counters**

#### **1. Artwork Like Counter**
```sql
-- Trigger: trigger_artwork_like_count
-- Fires: AFTER INSERT OR DELETE ON likes
```
- INSERT like dengan `artwork_id` → `artworks.like_count` +1
- DELETE like dengan `artwork_id` → `artworks.like_count` -1

#### **2. Comment Like Counter**
```sql
-- Trigger: trigger_comment_like_count
-- Fires: AFTER INSERT OR DELETE ON likes
```
- INSERT like dengan `comment_id` → `comments.like_count` +1
- DELETE like dengan `comment_id` → `comments.like_count` -1

#### **3. Artwork Comment Counter**
```sql
-- Trigger: trigger_artwork_comment_count
-- Fires: AFTER INSERT OR DELETE OR UPDATE ON comments
```
- INSERT comment → `artworks.comment_count` +1
- DELETE comment → `artworks.comment_count` -1
- UPDATE comment (soft delete) → Counter adjust berdasarkan `is_deleted` flag

#### **4. Community Member Counter**
```sql
-- Trigger: trigger_community_member_count
-- Fires: AFTER INSERT OR DELETE ON community_members
```
- INSERT member → `communities.member_count` +1
- DELETE member → `communities.member_count` -1

---

## 🔐 Data Integrity & Constraints

### **Foreign Key Relationships**

```
users (1) ──< (N) galleries
users (1) ──< (N) artworks
galleries (1) ──< (N) artworks
artworks (1) ──< (N) comments
artworks (1) ──< (N) likes
comments (1) ──< (N) likes
users (1) ──< (N) favorites
artworks (1) ──< (N) favorites
```

### **Cascade Delete Behavior**

Semua foreign keys menggunakan `ON DELETE CASCADE`:
- Hapus user → Hapus semua galleries, artworks, comments, likes, favorites miliknya
- Hapus gallery → Hapus semua artworks di gallery
- Hapus artwork → Hapus semua comments, likes, favorites untuk artwork tersebut
- Hapus exhibition → Hapus relasi di exhibition_artworks

---

## 📊 Indexing Strategy

### **Performance Optimization**

**Primary Lookups:**
- Email & username lookups (login)
- User-specific data (favorites, comments)
- Foreign key lookups (relationships)

**Filtering & Sorting:**
- Category filters (galleries, artworks, exhibitions)
- Date-based sorting (created_at DESC)
- Popularity sorting (like_count, view_count)

**Composite Indexes:**
- `idx_artworks_popular` → Multi-column untuk trending/popular artworks
- `idx_comments_artwork_date` → Comments per artwork sorted by date
- `idx_exhibitions_status` → Active exhibitions filter

---

## 🎯 Data Flow & Sinkronisasi

### **Workflow Upload Gambar dari Frontend**

1. **Frontend Development:**
   - Frontend menyimpan gambar di `public/images/` atau folder local
   - Database artworks/galleries menggunakan **placeholder URLs** (e.g., `/images/artwork1.jpg`)

2. **Migration to Cloudinary:**
   ```sql
   -- Step 1: Upload batch images ke Cloudinary
   -- (Menggunakan Cloudinary API atau dashboard)
   
   -- Step 2: Update database URLs
   UPDATE artworks 
   SET image_url = 'https://res.cloudinary.com/[cloud]/artconnect/artworks/[filename]'
   WHERE id = '[artwork_id]';
   ```

3. **Data Integrity:**
   - Artwork ID tetap sama → Likes & comments tetap sinkron
   - Hanya `image_url` yang berubah
   - Counters (`like_count`, `comment_count`) tidak terpengaruh

4. **Batch Update Script:**
   ```javascript
   // Contoh script untuk batch update URLs
   const artworks = [
     { id: 'uuid1', oldUrl: '/images/art1.jpg', newUrl: 'cloudinary_url1' },
     { id: 'uuid2', oldUrl: '/images/art2.jpg', newUrl: 'cloudinary_url2' }
   ];
   
   for (const art of artworks) {
     await pool.query(
       'UPDATE artworks SET image_url = $1 WHERE id = $2',
       [art.newUrl, art.id]
     );
   }
   ```

---

## 🛠️ Database Setup & Migration

### **1. Create Database**
```bash
createdb artconnect_db
```

### **2. Run Schema**
```bash
psql -U postgres -d artconnect_db -f database/schema.sql
```

### **3. Seed Data (Optional)**
```bash
psql -U postgres -d artconnect_db -f database/seed.sql
# OR
npm run seed
```

### **4. Database Scripts**
```bash
# Migrate database
npm run migrate

# Seed sample data
npm run seed

# Reset database (drop all + recreate)
npm run reset-db

# Test connection
npm run test-db
```

---

## 📝 SQL Examples

### **Get User's Favorites with Artwork Details**
```sql
SELECT 
  a.id, a.title, a.image_url, a.like_count, a.comment_count,
  u.fullname as artist_name,
  f.created_at as favorited_at
FROM favorites f
JOIN artworks a ON f.artwork_id = a.id
JOIN users u ON a.artist_id = u.id
WHERE f.user_id = '[user_id]'
  AND a.is_deleted = false
ORDER BY f.created_at DESC;
```

### **Get Artwork with Comments & Like Status**
```sql
SELECT 
  a.*,
  u.fullname as artist_name,
  (SELECT COUNT(*) FROM comments WHERE artwork_id = a.id AND is_deleted = false) as total_comments,
  EXISTS(SELECT 1 FROM likes WHERE user_id = '[user_id]' AND artwork_id = a.id) as is_liked,
  EXISTS(SELECT 1 FROM favorites WHERE user_id = '[user_id]' AND artwork_id = a.id) as is_favorited
FROM artworks a
JOIN users u ON a.artist_id = u.id
WHERE a.id = '[artwork_id]' AND a.is_deleted = false;
```

### **Get Popular Artworks**
```sql
SELECT 
  a.*,
  u.fullname as artist_name,
  g.name as gallery_name
FROM artworks a
JOIN users u ON a.artist_id = u.id
JOIN galleries g ON a.gallery_id = g.id
WHERE a.is_deleted = false
ORDER BY a.like_count DESC, a.view_count DESC, a.created_at DESC
LIMIT 10;
```

---

## 🔍 Database Statistics

**Total Tables:** 12 (6 active + 6 inactive/removed)

**Total Indexes:** 30+

**Foreign Keys:** 20+

**Triggers:** 10 (6 timestamp + 4 counter)

**Constraints:**
- Primary Keys: 12
- Unique Constraints: 8
- Check Constraints: 2
- Foreign Keys: 20+

---

## 📚 ERD (Entity Relationship Diagram)

```
┌─────────────┐
│    USERS    │
└──────┬──────┘
       │
       ├──────────────┬──────────────┬──────────────┬──────────────┐
       │              │              │              │              │
       ▼              ▼              ▼              ▼              ▼
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│GALLERIES │   │ ARTWORKS │   │ COMMENTS │   │  LIKES   │   │FAVORITES │
└────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘   └──────────┘
     │              │              │              │
     └──────────────┴──────────────┴──────────────┘
```

---

## 🚨 Important Notes

1. **UUID Primary Keys** - Semua tabel menggunakan UUID untuk security & distributed systems
2. **Soft Delete** - Gunakan `is_deleted = true` bukan hard delete untuk audit trail
3. **Auto Counters** - JANGAN manual update `like_count` / `comment_count`, biarkan trigger handle
4. **Cascade Delete** - Hati-hati saat delete user/artwork, akan cascade ke related data
5. **Image URLs** - Saat ini bisa local URLs, nanti batch migrate ke Cloudinary
6. **Inactive Tables** - Communities tables preserved tapi tidak digunakan di API

---

## 📖 References

- Schema File: `database/schema.sql`
- Seed Data: `database/seed.sql`
- API Documentation: `documentation/api&database/API_DOCUMENTATION.md`
- Migration Scripts: `scripts/migrate.js`, `scripts/seed.js`, `scripts/reset-db.js`

---

**Last Updated:** December 8, 2025  
**Database Version:** 1.0  
**PostgreSQL Version:** 12+
