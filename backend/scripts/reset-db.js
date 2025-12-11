require('dotenv').config()
const pool = require('../src/config/db')

const resetDatabase = async () => {
  try {
    console.log('⚠️  WARNING: This will delete ALL data from the database!')
    console.log('Starting database reset in 3 seconds...')

    // Wait 3 seconds to allow cancellation
    await new Promise(resolve => setTimeout(resolve, 3000))

    console.log('Dropping all tables...')

    // Drop all tables in reverse order (due to foreign keys)
    const dropQueries = [
      'DROP TABLE IF EXISTS notifications CASCADE',
      'DROP TABLE IF EXISTS community_gallery CASCADE',
      'DROP TABLE IF EXISTS community_members CASCADE',
      'DROP TABLE IF EXISTS communities CASCADE',
      'DROP TABLE IF EXISTS favorites CASCADE',
      'DROP TABLE IF EXISTS likes CASCADE',
      'DROP TABLE IF EXISTS comments CASCADE',
      'DROP TABLE IF EXISTS artworks CASCADE',
      'DROP TABLE IF EXISTS galleries CASCADE',
      'DROP TABLE IF EXISTS users CASCADE'
    ]

    for (const query of dropQueries) {
      await pool.query(query)
    }

    console.log('✅ All tables dropped successfully!')
    console.log('')
    console.log('To recreate the database structure, run:')
    console.log('  npm run migrate')

    process.exit(0)
  } catch (error) {
    console.error('❌ Reset failed:', error.message)
    console.error(error)
    process.exit(1)
  }
}

resetDatabase()
