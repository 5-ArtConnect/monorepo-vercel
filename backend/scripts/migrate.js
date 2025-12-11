require('dotenv').config()
const fs = require('fs')
const path = require('path')
const pool = require('../src/config/db')

const runMigration = async () => {
  try {
    console.log('Starting database migration...')

    // Read schema file
    const schemaPath = path.join(__dirname, '../database/schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')

    // Execute schema
    await pool.query(schema)

    console.log('✅ Migration completed successfully!')
    console.log('Database tables created:')
    console.log('  - users')
    console.log('  - galleries')
    console.log('  - artworks')
    console.log('  - comments')
    console.log('  - likes')
    console.log('  - favorites')
    console.log('  - communities (inactive)')
    console.log('  - community_members (inactive)')
    console.log('  - community_gallery (inactive)')

    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    console.error(error)
    process.exit(1)
  }
}

runMigration()
