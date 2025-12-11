// Script untuk upload hero image Contact page ke Cloudinary
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const https = require('https');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const TEMP_DIR = path.join(__dirname, '../temp');
const IMAGE_URL = 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=400&fit=crop&q=80';
const TEMP_FILE = path.join(TEMP_DIR, 'hero-contact.jpg');

// Buat folder temp jika belum ada
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

console.log('📥 Downloading hero image...');

// Download gambar
const file = fs.createWriteStream(TEMP_FILE);
https.get(IMAGE_URL, (response) => {
  response.pipe(file);
  
  file.on('finish', () => {
    file.close();
    console.log('✅ Download complete!');
    
    // Upload ke Cloudinary
    console.log('\n📤 Uploading to Cloudinary...');
    cloudinary.uploader.upload(TEMP_FILE, {
      folder: 'artconnect/hero',
      public_id: 'contact-hero',
      overwrite: true,
      resource_type: 'image'
    })
    .then(result => {
      console.log('✅ Upload successful!');
      console.log('\n🔗 Cloudinary URL:', result.secure_url);
      console.log('\n📋 Update your Contact.jsx with this URL:');
      console.log(`   ${result.secure_url}`);
      
      // Hapus file temporary
      fs.unlinkSync(TEMP_FILE);
      console.log('\n🧹 Cleaned up temporary files');
    })
    .catch(error => {
      console.error('❌ Upload error:', error);
      // Hapus file temporary
      if (fs.existsSync(TEMP_FILE)) {
        fs.unlinkSync(TEMP_FILE);
      }
    });
  });
}).on('error', (err) => {
  console.error('❌ Download error:', err);
  fs.unlinkSync(TEMP_FILE);
});
