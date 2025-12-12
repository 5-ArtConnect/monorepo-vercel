# 🐘 Neon Database Setup Guide
## Panduan Lengkap Setup PostgreSQL Database untuk ArtConnect

---

## 📋 Table of Contents
1. [Create Neon Database](#1-create-neon-database)
2. [Get Connection String](#2-get-connection-string)
3. [Setup Environment Variables](#3-setup-environment-variables)
4. [Run Database Migration](#4-run-database-migration)
5. [Seed Database (Optional)](#5-seed-database-optional)
6. [Verify Setup](#6-verify-setup)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Create Neon Database

### Step 1.1: Sign Up / Login to Neon
- Buka https://neon.tech
- Sign up dengan GitHub/Google atau email
- Atau login jika sudah punya akun

### Step 1.2: Create New Project (dari Vercel)
Saat deploy di Vercel dan pilih "Add Database", Anda akan diminta:

```
Database Name: artconnect-prod
Region: Singapore (Southeast) - sin1
Auth: ❌ FALSE (jangan aktifkan!)
Plan: Free Tier
```

**⚠️ PENTING:** 
- **Database Name:** Boleh nama apa saja, recommend: `artconnect-prod` atau `artconnect_db`
- **Auth:** HARUS **FALSE** karena kita pakai custom authentication
- **Region:** Pilih Singapore untuk latency terbaik (Asia)

### Step 1.3: Konfirmasi Create
- Klik **"Create Database"**
- Tunggu beberapa detik sampai database ready
- Database PostgreSQL Anda siap! 🎉

---

## 2. Get Connection String

### Step 2.1: Akses Neon Dashboard
Setelah database dibuat:
1. Buka [Neon Console](https://console.neon.tech)
2. Pilih project Anda: `artconnect-prod`
3. Klik tab **"Connection Details"** atau **"Dashboard"**

### Step 2.2: Copy Connection String
Anda akan melihat connection details seperti ini:

```
Host: ep-cool-darkness-123456.ap-southeast-1.aws.neon.tech
Database: artconnect-prod
User: artconnect-prod_owner
Password: npg_xxxxxxxxxxxxxxxxxxx
Port: 5432
```

### Step 2.3: Connection String Format
Neon menyediakan 2 format:

**Format 1: PostgreSQL URL (untuk DATABASE_URL)**
```bash
postgresql://username:password@host/database?sslmode=require
```

**Format 2: Individual Parameters (untuk PGHOST, PGUSER, dll)**
```
PGHOST=ep-cool-darkness-123456.ap-southeast-1.aws.neon.tech
PGDATABASE=artconnect-prod
PGUSER=artconnect-prod_owner
PGPASSWORD=npg_xxxxxxxxxxxxxxxxxxx
PGPORT=5432
```

---

## 3. Setup Environment Variables

### Step 3.1: Setup di Vercel (untuk Production)

1. Buka project di Vercel Dashboard
2. Pergi ke **Settings** → **Environment Variables**
3. Tambahkan variables berikut:

```env
# ============================================================
# NEON DATABASE CONFIGURATION (Production)
# ============================================================

PGHOST=ep-cool-darkness-123456.ap-southeast-1.aws.neon.tech
PGDATABASE=artconnect-prod
PGUSER=artconnect-prod_owner
PGPASSWORD=npg_xxxxxxxxxxxxxxxxxxx
PGPORT=5432

# ============================================================
# OTHER REQUIRED VARIABLES
# ============================================================

NODE_ENV=production
PORT=3000
SECRETE_KEY_JWT=your_secure_random_string_here

# Cloudinary (jika sudah setup)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**✅ Tips:**
- Set environment untuk **Production**, **Preview**, dan **Development**
- Untuk Preview/Development bisa pakai database yang sama atau terpisah
- Pastikan `NODE_ENV=production` agar SSL aktif

### Step 3.2: Setup di Local (untuk testing)

Buat file `.env` di folder `backend/`:

```env
# ============================================================
# NEON DATABASE CONFIGURATION (Testing/Local)
# ============================================================

PGHOST=ep-cool-darkness-123456.ap-southeast-1.aws.neon.tech
PGDATABASE=artconnect-prod
PGUSER=artconnect-prod_owner
PGPASSWORD=npg_xxxxxxxxxxxxxxxxxxx
PGPORT=5432

NODE_ENV=production
PORT=3000
SECRETE_KEY_JWT=your_secure_random_string_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 4. Run Database Migration

### Step 4.1: Install PostgreSQL Client (jika belum punya)

**Windows:**
```bash
# Install via Chocolatey
choco install postgresql

# Atau download dari https://www.postgresql.org/download/windows/
```

**Mac:**
```bash
brew install postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql-client
```

### Step 4.2: Connect to Neon Database

```bash
# Format: psql -h HOST -U USER -d DATABASE
psql -h ep-cool-darkness-123456.ap-southeast-1.aws.neon.tech \
     -U artconnect-prod_owner \
     -d artconnect-prod
```

Masukkan password saat diminta (copy dari Neon dashboard).

### Step 4.3: Run Schema Migration

**Opsi A: Langsung dari psql**
```bash
# Connect dan run file
psql -h ep-cool-darkness-123456.ap-southeast-1.aws.neon.tech \
     -U artconnect-prod_owner \
     -d artconnect-prod \
     -f backend/database/schema.sql
```

**Opsi B: Copy-paste manual**
1. Connect ke database (Step 4.2)
2. Copy isi file `backend/database/schema.sql`
3. Paste di psql terminal
4. Tekan Enter

**Opsi C: Via Neon SQL Editor (Recommended for beginners)**
1. Buka Neon Console → Your Project
2. Klik tab **"SQL Editor"**
3. Copy isi `backend/database/schema.sql`
4. Paste ke editor
5. Klik **"Run"**

### Step 4.4: Verify Tables Created

```sql
-- Check semua tables
\dt

-- Expected output:
-- users
-- galleries
-- artworks
-- comments
-- likes
-- favorites (optional)
-- communities (optional)
```

---

## 5. Seed Database (Optional)

### Step 5.1: Using Seed Script

```bash
# Di folder backend/
cd backend

# Install dependencies (jika belum)
npm install

# Run seed script
node scripts/seed.js
```

### Step 5.2: Manual Seed via SQL

```bash
# Via psql
psql -h ep-cool-darkness-123456.ap-southeast-1.aws.neon.tech \
     -U artconnect-prod_owner \
     -d artconnect-prod \
     -f backend/database/seed.sql
```

### Step 5.3: Upload Cloudinary Images (jika perlu)

```bash
# Di folder backend/
node scripts/upload-cloudinary.js
```

---

## 6. Verify Setup

### Step 6.1: Test Connection dari Backend

```bash
# Di folder backend/
cd backend

# Test connection
node -e "const pool = require('./src/config/db'); pool.query('SELECT NOW()', (err, res) => { console.log(err || res.rows); pool.end(); })"
```

Expected output:
```
[ { now: 2025-12-12T10:30:45.123Z } ]
```

### Step 6.2: Test API Endpoints

```bash
# Test health check
curl https://your-backend.vercel.app/

# Test users endpoint
curl https://your-backend.vercel.app/api/users
```

### Step 6.3: Test dari Frontend

1. Deploy backend ke Vercel
2. Update `VITE_API_URL` di frontend dengan backend URL
3. Deploy frontend
4. Test login/register functionality

---

## 7. Troubleshooting

### ❌ Error: "password authentication failed"

**Penyebab:** Password salah atau tidak di-copy dengan benar

**Solusi:**
```bash
# Re-copy password dari Neon dashboard
# Pastikan tidak ada spasi atau karakter tambahan
```

### ❌ Error: "SSL connection is required"

**Penyebab:** Neon memerlukan SSL connection

**Solusi:**
Pastikan di `backend/src/config/db.js` ada:
```javascript
ssl: { rejectUnauthorized: false }
```

### ❌ Error: "role does not exist"

**Penyebab:** Username salah

**Solusi:**
```bash
# Check username di Neon Console → Connection Details
# Copy exact username (biasanya: databasename_owner)
```

### ❌ Error: "too many connections"

**Penyebab:** Free tier Neon punya limit connections

**Solusi:**
```javascript
// Di backend/src/config/db.js
const pool = new Pool({
  // ... existing config
  max: 3, // Reduce pool size untuk free tier
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
```

### ❌ Error: "Connection timeout"

**Penyebab:** Network issue atau host salah

**Solusi:**
1. Verify host dari Neon Console
2. Check internet connection
3. Try ping host:
```bash
ping ep-cool-darkness-123456.ap-southeast-1.aws.neon.tech
```

### ❌ Database kosong setelah migration

**Penyebab:** Migration tidak jalan atau error silent

**Solusi:**
```bash
# Check logs saat run migration
psql ... -f schema.sql 2>&1 | tee migration.log

# Atau lihat di Neon SQL Editor untuk error messages
```

---

## 📝 Quick Reference

### Neon Connection Template

```env
PGHOST=ep-xxxxxx.region.aws.neon.tech
PGDATABASE=your_database_name
PGUSER=your_database_name_owner
PGPASSWORD=npg_xxxxxxxxxxxxx
PGPORT=5432
```

### Common psql Commands

```sql
-- List databases
\l

-- List tables
\dt

-- Describe table structure
\d users

-- Check table row count
SELECT COUNT(*) FROM users;

-- Quit psql
\q
```

### Connection String Examples

**URL Format:**
```
postgresql://user:password@host:5432/database?sslmode=require
```

**Connection Test:**
```bash
psql "postgresql://user:password@host:5432/database?sslmode=require"
```

---

## 🎯 Checklist

Pastikan semua langkah ini sudah selesai:

- [ ] ✅ Neon database created
- [ ] ✅ Connection string copied
- [ ] ✅ Environment variables set di Vercel
- [ ] ✅ Schema migration completed (tables created)
- [ ] ✅ Seed data loaded (optional)
- [ ] ✅ Connection test successful
- [ ] ✅ Backend deployed to Vercel
- [ ] ✅ Frontend connected to backend
- [ ] ✅ Test registration/login works

---

## 🔗 Useful Links

- [Neon Console](https://console.neon.tech)
- [Neon Documentation](https://neon.tech/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

## 💡 Tips & Best Practices

1. **Backup Database:**
   ```bash
   # Backup schema + data
   pg_dump -h HOST -U USER -d DATABASE > backup.sql
   ```

2. **Monitor Usage:**
   - Check Neon dashboard untuk storage dan compute usage
   - Free tier: 512MB storage, 120 compute hours/month

3. **Connection Pooling:**
   - Vercel serverless perlu connection pooling
   - Neon sudah built-in pooling, tapi bisa optimize di code

4. **Security:**
   - ❌ Jangan commit `.env` ke Git
   - ✅ Use environment variables di Vercel
   - ✅ Rotate password secara berkala

5. **Performance:**
   - Index penting untuk search/filter queries
   - Monitor slow queries di Neon dashboard
   - Use prepared statements untuk query optimization

---

**🎉 Setup Complete!** Database Neon Anda siap digunakan untuk production!

Jika ada error atau pertanyaan, refer ke section [Troubleshooting](#7-troubleshooting) di atas.
