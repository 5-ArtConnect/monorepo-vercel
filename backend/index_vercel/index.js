require('dotenv').config()
const express = require('express')
const createError = require('http-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mainRouter = require('../src/routes/index')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
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

module.exports = app
// Untuk Vercel, jangan pakai app.listen
// Untuk local development, gunakan file index.js utama dengan app.listen
