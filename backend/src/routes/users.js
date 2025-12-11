const express = require('express')
const router = express.Router()
const { register, login, profile, refreshToken, logout, getAllUsers, getUserById, updateUser, deleteUser, getUserGalleries } = require('../controller/users')
const { protect } = require('../helper/auth')

router
  .post('/register', register)
  .post('/login', login)
  .post('/refresh-token', refreshToken)
  .post('/logout', protect, logout)
  .get('/', protect, getAllUsers)
  .get('/profile', protect, profile)
  .get('/:id', protect, getUserById)
  .get('/:id/galleries', protect, getUserGalleries)
  .put('/:id', protect, updateUser)
  .delete('/:id', protect, deleteUser)

module.exports = router
