const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const { findEmail, create, findById, update, deleteUser } = require('../models/users')
const CommonHelper = require('../helper/common')
const authHelper = require('../helper/auth')

const UserController = {
  register: async (req, res, next) => {
    try {
      const { email, password, fullname, username } = req.body
      const { rowCount } = await findEmail(email)

      if (rowCount) {
        return next(createError(403, 'Email is already used'))
      }

      const salt = bcrypt.genSaltSync(10)
      const passwordHash = bcrypt.hashSync(password, salt)

      const data = {
        id: uuidv4(),
        email,
        passwordHash,
        fullname,
        username: username || null,
        role: 'user'
      }

      const result = await create(data)
      const newUser = result.rows[0]
      delete newUser.password

      // Generate token for auto-login after registration
      const payload = {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
      }
      newUser.token = authHelper.generateToken(payload)
      newUser.refreshToken = authHelper.generateRefreshToken(payload)

      CommonHelper.response(res, newUser, 201, 'User registered successfully')
    } catch (error) {
      next(createError(500, 'Internal server error'))
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const { rows: [user] } = await findEmail(email)
      if (!user) {
        return CommonHelper.response(res, null, 403, 'Email is invalid')
      }
      const isValidPassword = bcrypt.compareSync(password, user.password)

      if (!isValidPassword) {
        return CommonHelper.response(res, null, 403, 'Password is invalid')
      }
      delete user.password
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role
      }
      user.token = authHelper.generateToken(payload)
      user.refreshToken = authHelper.generateRefreshToken(payload)

      CommonHelper.response(res, user, 201, 'login is successful')
    } catch (error) {
      next(createError(500, 'Internal server error'))
    }
  },
  profile: async (req, res, next) => {
    const email = req.payload.email
    const { rows: [user] } = await findEmail(email)
    delete user.password
    CommonHelper.response(res, user, 200)
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT)
    const payload = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    }
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload)
    }
    CommonHelper.response(res, result, 200)
  },
  logout: async (req, res, next) => {
    try {
      // Untuk JWT, logout di-handle di client side dengan menghapus token
      // Endpoint ini hanya konfirmasi bahwa user sudah logout
      CommonHelper.response(res, null, 200, 'Logout successful')
    } catch (error) {
      next(createError(500, 'Internal server error'))
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const offset = (page - 1) * limit

      const getAllUsersModel = require('../models/users').getAllUsers
      const { rows: users } = await getAllUsersModel(limit, offset)

      const pagination = {
        page,
        limit,
        totalCount: users.length,
        totalPages: Math.ceil(users.length / limit)
      }

      CommonHelper.response(res, users, 200, 'Users retrieved successfully', pagination)
    } catch (error) {
      next(createError(500, 'Internal server error'))
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params
      const { rows: [user] } = await findById(id)

      if (!user) {
        return CommonHelper.response(res, null, 404, 'User not found')
      }

      CommonHelper.response(res, user, 200, 'User retrieved successfully')
    } catch (error) {
      next(createError(500, 'Internal server error'))
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params
      // Only allow editing: city, gender
      // Email, fullname are NOT editable (paten)
      const { city, gender } = req.body

      // Check if user exists
      const { rows: [user] } = await findById(id)
      if (!user) {
        return CommonHelper.response(res, null, 404, 'User not found')
      }

      const data = {
        city: city || user.city,
        gender: gender || user.gender
      }

      // Update profile (only editable fields)
      const { rows: [updatedUser] } = await update(id, data)

      CommonHelper.response(res, updatedUser, 200, 'User profile updated successfully')
    } catch (error) {
      next(createError(500, 'Internal server error'))
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params

      // Check if user exists
      const { rows: [user] } = await findById(id)
      if (!user) {
        return CommonHelper.response(res, null, 404, 'User not found')
      }

      await deleteUser(id)
      CommonHelper.response(res, null, 200, 'User deactivated successfully')
    } catch (error) {
      next(createError(500, 'Internal server error'))
    }
  },
  getUserGalleries: async (req, res, next) => {
    try {
      const { id } = req.params
      const galleryModel = require('../models/galleries')

      const { rows: galleries } = await galleryModel.findByOwnerId(id)
      CommonHelper.response(res, galleries, 200, 'User galleries retrieved successfully')
    } catch (error) {
      next(createError(500, 'Internal server error'))
    }
  }
  // getUserCommunities - REMOVED (communities feature disabled)
  // getUserExhibitions - REMOVED (exhibitions feature disabled)
}

module.exports = {
  register: UserController.register,
  login: UserController.login,
  profile: UserController.profile,
  refreshToken: UserController.refreshToken,
  logout: UserController.logout,
  getAllUsers: UserController.getAllUsers,
  getUserById: UserController.getUserById,
  updateUser: UserController.updateUser,
  deleteUser: UserController.deleteUser,
  getUserGalleries: UserController.getUserGalleries
}
