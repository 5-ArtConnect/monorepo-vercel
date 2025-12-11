# 📤 Cloudinary Upload Script

Script otomatis untuk upload semua asset ke Cloudinary.

## 📋 Prerequisites

1. **Cloudinary Account**
   - Sign up di [cloudinary.com](https://cloudinary.com)
   - Get credentials: Cloud Name, API Key, API Secret

2. **Backend .env configured**
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Dependencies installed**
   ```bash
   cd "for-backend - Copy"
   npm install cloudinary dotenv
   ```

## 🚀 Cara Pakai

### 1. Jalankan Upload Script

```bash
cd "F:\03_Kakak\PROGRAM\project\ArtConnect\for-backend - Copy"
node scripts/upload-cloudinary.js
```

### 2. Output

Script akan:
- ✅ Upload 65 files ke Cloudinary (struktur folder rapi)
- 💾 Generate `cloudinary-upload-results.json` (hasil upload)
- 📝 Generate `update-cloudinary-urls.sql` (SQL untuk update database)

### 3. Check Results

File `cloudinary-upload-results.json` berisi:
```json
{
  "success": [
    {
      "filename": "imp1.jpg",
      "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234/artconnect/artworks/impressionisme/imp1.jpg",
      "public_id": "artconnect/artworks/impressionisme/imp1"
    }
  ],
  "failed": [],
  "skipped": []
}
```

## 📊 Struktur Folder di Cloudinary

```
artconnect/
├── artworks/
│   ├── impressionisme/
│   │   ├── imp1.jpg
│   │   ├── imp2.jpg
│   │   └── imp3.jpg
│   ├── abstrakt/
│   │   ├── abs1.jpg
│   │   ├── abs2.jpg
│   │   ├── abs3.jpg
│   │   └── abs4.jpg
│   ├── ekspressionisme/
│   │   ├── eks1.jpg
│   │   ├── eks2.jpg
│   │   └── eks3.jpg
│   ├── street-art/
│   │   ├── st1.jpg
│   │   ├── st2.jpg
│   │   └── st3.jpg
│   ├── visual-art/
│   │   ├── vis1.png
│   │   ├── vis2.png
│   │   ├── vis3.png
│   │   └── vis4.png
│   └── others/
│       └── (18 files)
├── artists/
│   └── (9 files)
├── galleries/
│   └── (4 files)
├── hero/
│   └── (8 files)
├── ui/
│   └── (6 files)
└── community/
    └── (3 files)
```

## 🗄️ Update Database

Setelah upload selesai, update database dengan URL Cloudinary:

### Opsi 1: Manual Update (Recommended)

```sql
-- Update specific artworks
UPDATE artworks 
SET image_url = 'https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1234/artconnect/artworks/impressionisme/imp1.jpg' 
WHERE title = 'Impression, soleil levant';

UPDATE artworks 
SET image_url = 'https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1234/artconnect/artworks/impressionisme/imp2.jpg' 
WHERE title = 'The Starry Night';

-- ... (continue for all artworks)
```

### Opsi 2: Bulk Update Script

Saya buatkan script untuk generate SQL update otomatis:

```bash
node scripts/generate-update-sql.js
```

## ⚠️ Troubleshooting

### Error: "File not found"
- Pastikan path assets benar: `for-frontend - Copy/src/assets`
- Check apakah semua file ada di folder tersebut

### Error: "Invalid credentials"
- Verify `.env` file di backend
- Check Cloud Name, API Key, API Secret di Cloudinary dashboard

### Error: "Rate limit exceeded"
- Script sudah punya delay 500ms per upload
- Kalau masih error, increase delay di line 177:
  ```javascript
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second
  ```

### Upload Success tapi gambar tidak tampil
- Check URL di console browser (F12)
- Pastikan URL match dengan yang di database
- Clear browser cache

## 📝 Notes

### Free Tier Limits (Cloudinary)
- ✅ 25 GB storage
- ✅ 25 GB bandwidth/month
- ✅ 25 credits/month (transformasi)
- ✅ Unlimited images

Project kita: ~65 files, total ~50-100MB ✅ Aman!

### Image Optimization (Otomatis)
Cloudinary otomatis optimize:
- Format conversion (WebP untuk browser modern)
- Compression
- Lazy loading support
- Responsive images

### URL Format
```
https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{public_id}.{format}
```

### On-the-fly Transformations
Bisa resize/crop image langsung di URL:
```
https://res.cloudinary.com/your-cloud/image/upload/w_400,h_300,c_fill/artconnect/artworks/imp1.jpg
```

## ✅ Checklist

- [ ] Install dependencies (`npm install cloudinary dotenv`)
- [ ] Configure `.env` dengan Cloudinary credentials
- [ ] Check semua files exist di `src/assets`
- [ ] Run upload script: `node scripts/upload-cloudinary.js`
- [ ] Check `cloudinary-upload-results.json`
- [ ] Update database dengan URL baru
- [ ] Test di browser - images should load dari Cloudinary
- [ ] Delete dummy URLs dari seed.sql

## 🎯 Next Steps After Upload

1. **Update seed.sql** dengan URL Cloudinary yang real
2. **Re-seed database**: `psql -U postgres -d artconnect_db -f database/seed.sql`
3. **Test frontend** - semua gambar harusnya load dari CDN
4. **Commit changes** - Update seed.sql ke git
5. **Production ready!** ✨

---

**Script created by:** GitHub Copilot  
**Date:** December 11, 2025
