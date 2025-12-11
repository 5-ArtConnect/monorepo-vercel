const { Pool } = require('pg')

// Determine if we need SSL (for production/cloud databases)
const isProduction = process.env.NODE_ENV === 'production'
const isLocalhost = process.env.PGHOST === 'localhost' || process.env.PGHOST === '127.0.0.1'

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  // Only use SSL for production cloud databases, not for localhost
  ssl: (!isLocalhost && isProduction) ? { rejectUnauthorized: false } : false
})

module.exports = pool
