require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('../src/config/db');

const runSeed = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Read seed file
    const seedPath = path.join(__dirname, '../database/seed.sql');
    const seedData = fs.readFileSync(seedPath, 'utf8');
    
    // Execute seed
    await pool.query(seedData);
    
    console.log('✅ Seed completed successfully!');
    console.log('');
    console.log('📊 Dummy Data Summary:');
    console.log('  - 6 Users (all art enthusiasts - role: user)');
    console.log('  - 5 Galleries (managed by admin, view-only)');
    console.log('  - 11 Artworks (managed by admin, view-only)');
    console.log('  - 9 Comments');
    console.log('  - 8 Artwork Likes');
    console.log('  - 4 Comment Likes');
    console.log('  - 7 Favorites (My Gallery feature)');
    console.log('');
    console.log('🔐 Test Login Credentials:');
    console.log('  Email: john.doe@example.com');
    console.log('  Password: password123');
    console.log('');
    console.log('📖 See database/TESTING_GUIDE.md for complete testing guide');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    console.error(error);
    process.exit(1);
  }
};

runSeed();
