const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: '1h',
    issuer: 'tokoku'
  }
  const token = jwt.sign(payload, process.env.SECRETE_KEY_JWT, verifyOpts)
  return token
}

const generateRefreshToken = (payload) => {
  const verifyOpts = { expiresIn: '1 day' }
  const token = jwt.sign(payload, process.env.SECRETE_KEY_JWT, verifyOpts)
  return token
}

const protect = (req, res, next) => {
  try {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return next(createError(401, 'Not authorized, token required'))
    }

    const decoded = jwt.verify(token, process.env.SECRETE_KEY_JWT)
    req.payload = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(createError(401, 'Token expired'))
    }
    return next(createError(401, 'Not authorized, invalid token'))
  }
}

// Optional auth - tidak error jika tidak ada token, tapi tetap decode jika ada
const optionalAuth = (req, res, next) => {
  try {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]

      try {
        const decoded = jwt.verify(token, process.env.SECRETE_KEY_JWT)
        req.payload = decoded
      } catch (error) {
        // Ignore error, just don't set payload
        req.payload = null
      }
    }

    next()
  } catch (error) {
    next()
  }
}

module.exports = { generateToken, generateRefreshToken, protect, optionalAuth }
