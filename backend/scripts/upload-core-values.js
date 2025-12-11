// Script untuk upload core values images ke Cloudinary
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

// Buat folder temp jika belum ada
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

const coreValuesImages = [
  {
    name: 'creativity',
    url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop&q=80'
  },
  {
    name: 'relation',
    url: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=400&h=400&fit=crop&q=80'
  },
  {
    name: 'inclusivity',
    url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=400&fit=crop&q=80'
  },
  {
    name: 'innovation',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop&q=80'
  },
  {
    name: 'appreciation',
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&q=80'
  }
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

async function uploadToCloudinary(filepath, publicId) {
  return await cloudinary.uploader.upload(filepath, {
    folder: 'artconnect/core-values',
    public_id: publicId,
    overwrite: true,
    resource_type: 'image'
  });
}

async function processImages() {
  console.log('🚀 Starting upload process for Core Values images...\n');
  const results = [];

  for (const image of coreValuesImages) {
    try {
      const tempFile = path.join(TEMP_DIR, `${image.name}.jpg`);
      
      console.log(`📥 Downloading ${image.name}...`);
      await downloadImage(image.url, tempFile);
      console.log(`✅ Downloaded ${image.name}`);
      
      console.log(`📤 Uploading ${image.name} to Cloudinary...`);
      const result = await uploadToCloudinary(tempFile, image.name);
      console.log(`✅ Uploaded ${image.name}`);
      console.log(`   URL: ${result.secure_url}\n`);
      
      results.push({
        name: image.name,
        url: result.secure_url
      });
      
      // Hapus file temporary
      fs.unlinkSync(tempFile);
      
    } catch (error) {
      console.error(`❌ Error processing ${image.name}:`, error.message);
    }
  }

  console.log('\n📋 All Cloudinary URLs:');
  console.log('=====================================');
  results.forEach(r => {
    console.log(`${r.name}: ${r.url}`);
  });
  
  console.log('\n🧹 Cleaning up...');
  // Hapus folder temp jika kosong
  try {
    fs.rmdirSync(TEMP_DIR);
    console.log('✅ Cleanup complete!');
  } catch (e) {
    // Folder tidak kosong atau tidak ada
  }
}

processImages().catch(console.error);
