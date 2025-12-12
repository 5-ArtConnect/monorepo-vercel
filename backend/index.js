require('dotenv').config()
const express = require('express')
const createError = require('http-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mainRouter = require('./src/routes/index')
const PORT = process.env.PORT || 3000

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'http://localhost:3000',
  'https://artconnect.vercel.app', // Update with your actual frontend URL
  process.env.FRONTEND_URL // Add this env var in Vercel
].filter(Boolean)

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))
app.use(morgan('dev'))

// Root route for health check
app.get('/', (req, res) => {
  res.json({
    message: 'ArtConnect API is running',
    status: 'success',
    endpoints: {
      users: '/api/users',
      artworks: '/api/artworks',
      galleries: '/api/galleries',
      comments: '/api/comments',
      likes: '/api/likes',
      favorites: '/api/favorites'
    }
  })
})

app.use('/api', mainRouter)
app.use('/img', express.static('src/upload'))
app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})
app.use((err, req, res, next) => {
  const messageError = err.message || 'internal server error'
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messageError
  })
})

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Listen port at http://localhost:${PORT}`)
  })
}

// Export for Vercel serverless
module.exports = app
