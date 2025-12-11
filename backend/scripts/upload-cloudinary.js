// scripts/upload-cloudinary.js
// Script untuk upload semua asset ke Cloudinary secara otomatis

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Base path ke frontend assets
const ASSETS_PATH = path.join(__dirname, '../../for-frontend - Copy/src/assets');

// Mapping file ke folder Cloudinary dengan public_id
const uploadMapping = {
  // ===== ARTWORKS - IMPRESSIONISME =====
  'imp1.jpg': { folder: 'artconnect/artworks/impressionisme', public_id: 'imp1' },
  'imp2.jpg': { folder: 'artconnect/artworks/impressionisme', public_id: 'imp2' },
  'imp3.jpg': { folder: 'artconnect/artworks/impressionisme', public_id: 'imp3' },

  // ===== ARTWORKS - ABSTRAKT =====
  'abs1.jpg': { folder: 'artconnect/artworks/abstrakt', public_id: 'abs1' },
  'abs2.jpg': { folder: 'artconnect/artworks/abstrakt', public_id: 'abs2' },
  'abs3.jpg': { folder: 'artconnect/artworks/abstrakt', public_id: 'abs3' },
  'abs4.jpg': { folder: 'artconnect/artworks/abstrakt', public_id: 'abs4' },

  // ===== ARTWORKS - EKSPRESSIONISME =====
  'eks1.jpg': { folder: 'artconnect/artworks/ekspressionisme', public_id: 'eks1' },
  'eks2.jpg': { folder: 'artconnect/artworks/ekspressionisme', public_id: 'eks2' },
  'eks3.jpg': { folder: 'artconnect/artworks/ekspressionisme', public_id: 'eks3' },

  // ===== ARTWORKS - STREET ART =====
  'st1.jpg': { folder: 'artconnect/artworks/street-art', public_id: 'st1' },
  'st2.jpg': { folder: 'artconnect/artworks/street-art', public_id: 'st2' },
  'st3.jpg': { folder: 'artconnect/artworks/street-art', public_id: 'st3' },

  // ===== ARTWORKS - VISUAL ART =====
  'vis1.png': { folder: 'artconnect/artworks/visual-art', public_id: 'vis1' },
  'vis2.png': { folder: 'artconnect/artworks/visual-art', public_id: 'vis2' },
  'vis3.png': { folder: 'artconnect/artworks/visual-art', public_id: 'vis3' },
  'vis4.png': { folder: 'artconnect/artworks/visual-art', public_id: 'vis4' },

  // ===== ARTWORKS - OTHERS =====
  'monalisa.jpg': { folder: 'artconnect/artworks/others', public_id: 'monalisa' },
  'matahari.jpg': { folder: 'artconnect/artworks/others', public_id: 'matahari' },
  'pelangi.jpg': { folder: 'artconnect/artworks/others', public_id: 'pelangi' },
  'mukabanyak.jpg': { folder: 'artconnect/artworks/others', public_id: 'mukabanyak' },
  'canvascircle.jpg': { folder: 'artconnect/artworks/others', public_id: 'canvascircle' },
  'Bunga.jpg': { folder: 'artconnect/artworks/others', public_id: 'bunga' },
  'Sketsa1.jpg': { folder: 'artconnect/artworks/others', public_id: 'sketsa1' },
  'tumpukan.jpg': { folder: 'artconnect/artworks/others', public_id: 'tumpukan' },
  'look.png': { folder: 'artconnect/artworks/others', public_id: 'look' },
  'layer1.png': { folder: 'artconnect/artworks/others', public_id: 'layer1' },
  'layer2.png': { folder: 'artconnect/artworks/others', public_id: 'layer2' },
  '1.png': { folder: 'artconnect/artworks/others', public_id: 'artwork1' },
  '2.png': { folder: 'artconnect/artworks/others', public_id: 'artwork2' },
  '3.png': { folder: 'artconnect/artworks/others', public_id: 'artwork3' },
  '4.png': { folder: 'artconnect/artworks/others', public_id: 'artwork4' },
  'br1.jpg': { folder: 'artconnect/artworks/others', public_id: 'br1' },
  'br2.jpg': { folder: 'artconnect/artworks/others', public_id: 'br2' },
  'br3.jpg': { folder: 'artconnect/artworks/others', public_id: 'br3' },

  // ===== ARTISTS =====
  'artist-rose.png': { folder: 'artconnect/artists', public_id: 'rose' },
  'artist-marco.png': { folder: 'artconnect/artists', public_id: 'marco' },
  'artist-ayla.png': { folder: 'artconnect/artists', public_id: 'ayla' },
  'artist-kim.png': { folder: 'artconnect/artists', public_id: 'kim' },
  'mario.jpg': { folder: 'artconnect/artists', public_id: 'mario' },
  'hanna.jpg': { folder: 'artconnect/artists', public_id: 'hanna' },
  'sejong.jpg': { folder: 'artconnect/artists', public_id: 'sejong' },
  'artist-digital.png': { folder: 'artconnect/artists', public_id: 'digital' },
  'artist-illustration.png': { folder: 'artconnect/artists', public_id: 'illustration' },
  'artist-fineart.png': { folder: 'artconnect/artists', public_id: 'fineart' },

  // ===== GALLERIES =====
  'pameran1.jpg': { folder: 'artconnect/galleries', public_id: 'pameran1' },
  'pameran2.jpg': { folder: 'artconnect/galleries', public_id: 'pameran2' },
  'pameran3.jpg': { folder: 'artconnect/galleries', public_id: 'pameran3' },
  'gallerysee.png': { folder: 'artconnect/galleries', public_id: 'gallerysee' },

  // ===== HERO/LANDING =====
  'hero.jpg': { folder: 'artconnect/hero', public_id: 'hero-main' },
  'hero-bg.png': { folder: 'artconnect/hero', public_id: 'hero-bg' },
  'hero-main.png': { folder: 'artconnect/hero', public_id: 'hero-main-overlay' },
  'hero1.png': { folder: 'artconnect/hero', public_id: 'hero1' },
  'hero2.png': { folder: 'artconnect/hero', public_id: 'hero2' },
  'hero3.png': { folder: 'artconnect/hero', public_id: 'hero3' },
  'hero4.png': { folder: 'artconnect/hero', public_id: 'hero4' },
  'hero5.png': { folder: 'artconnect/hero', public_id: 'hero5' },
  'home-hero-before.png': { folder: 'artconnect/hero', public_id: 'home-hero-before' },

  // ===== UI ELEMENTS =====
  'bg.png': { folder: 'artconnect/ui', public_id: 'background' },
  'artcollect.png': { folder: 'artconnect/ui', public_id: 'artcollect' },
  'footer1.png': { folder: 'artconnect/ui', public_id: 'footer1' },
  'footer2.png': { folder: 'artconnect/ui', public_id: 'footer2' },
  'footer3.png': { folder: 'artconnect/ui', public_id: 'footer3' },
  'footer4.png': { folder: 'artconnect/ui', public_id: 'footer4' },

  // ===== COMMUNITY =====
  'community.jpg': { folder: 'artconnect/community', public_id: 'community-main' },
  'artis.jpg': { folder: 'artconnect/community', public_id: 'artis' },
  'pelukis.jpg': { folder: 'artconnect/community', public_id: 'pelukis' },
};

// Upload results storage
const uploadResults = {
  success: [],
  failed: [],
  skipped: []
};

/**
 * Upload single file to Cloudinary
 */
async function uploadFile(filename, config) {
  const filePath = path.join(ASSETS_PATH, filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filename}`);
    uploadResults.skipped.push({ filename, reason: 'File not found' });
    return null;
  }

  try {
    console.log(`📤 Uploading ${filename}...`);

    const result = await cloudinary.uploader.upload(filePath, {
      folder: config.folder,
      public_id: config.public_id,
      overwrite: true,
      resource_type: 'auto'
    });

    console.log(`✅ Success: ${filename} → ${result.secure_url}`);
    uploadResults.success.push({
      filename,
      url: result.secure_url,
      public_id: `${config.folder}/${config.public_id}`
    });

    return result;
  } catch (error) {
    console.error(`❌ Failed: ${filename}`, error.message);
    uploadResults.failed.push({
      filename,
      error: error.message
    });
    return null;
  }
}

/**
 * Upload all files
 */
async function uploadAll() {
  console.log('🚀 Starting Cloudinary upload...\n');
  console.log(`📁 Assets path: ${ASSETS_PATH}\n`);
  console.log(`☁️  Cloud name: ${process.env.CLOUDINARY_CLOUD_NAME}\n`);

  const files = Object.keys(uploadMapping);
  console.log(`📦 Total files to upload: ${files.length}\n`);
  console.log('─'.repeat(60));

  for (const [index, filename] of files.entries()) {
    console.log(`\n[${index + 1}/${files.length}]`);
    await uploadFile(filename, uploadMapping[filename]);
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n' + '─'.repeat(60));
  console.log('\n📊 Upload Summary:\n');
  console.log(`✅ Success: ${uploadResults.success.length}`);
  console.log(`❌ Failed: ${uploadResults.failed.length}`);
  console.log(`⚠️  Skipped: ${uploadResults.skipped.length}`);

  // Save results to JSON file
  const resultsPath = path.join(__dirname, 'cloudinary-upload-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(uploadResults, null, 2));
  console.log(`\n💾 Results saved to: ${resultsPath}`);

  // Generate SQL update statements
  if (uploadResults.success.length > 0) {
    generateSQLUpdates();
  }
}

/**
 * Generate SQL UPDATE statements untuk database
 */
function generateSQLUpdates() {
  console.log('\n📝 Generating SQL UPDATE statements...\n');

  const sqlStatements = [];

  // Group by category
  const categories = {
    impressionisme: [],
    abstrakt: [],
    ekspressionisme: [],
    'street-art': [],
    'visual-art': [],
    others: []
  };

  uploadResults.success.forEach(item => {
    if (item.public_id.includes('/artworks/')) {
      const category = item.public_id.split('/artworks/')[1].split('/')[0];
      if (categories[category]) {
        categories[category].push(item);
      }
    }
  });

  sqlStatements.push('-- Update Artworks Image URLs');
  sqlStatements.push('-- Generated by upload-cloudinary.js');
  sqlStatements.push('-- Run this in PostgreSQL after successful upload\n');

  // Generate UPDATE statements (you'll need to match with actual artwork titles)
  sqlStatements.push('-- Example updates - adjust WHERE clause to match your data:');
  uploadResults.success.forEach(item => {
    if (item.public_id.includes('/artworks/')) {
      sqlStatements.push(
        `-- UPDATE artworks SET image_url = '${item.url}' WHERE title = 'ARTWORK_TITLE_HERE';`
      );
    }
  });

  sqlStatements.push('\n-- Update Galleries Cover Images:');
  uploadResults.success.forEach(item => {
    if (item.public_id.includes('/galleries/')) {
      sqlStatements.push(
        `-- UPDATE galleries SET cover_image_url = '${item.url}' WHERE name = 'GALLERY_NAME_HERE';`
      );
    }
  });

  const sqlPath = path.join(__dirname, 'update-cloudinary-urls.sql');
  fs.writeFileSync(sqlPath, sqlStatements.join('\n'));
  console.log(`💾 SQL file saved to: ${sqlPath}\n`);
}

// Run the upload
uploadAll()
  .then(() => {
    console.log('\n✨ Upload completed!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Upload failed:', error);
    process.exit(1);
  });
