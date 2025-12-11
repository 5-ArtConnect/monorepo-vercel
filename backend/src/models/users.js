const pool = require('../config/db')

const findEmail = (email) => {
  return pool.query('SELECT * FROM users WHERE email = $1', [email])
}

const create = (data) => {
  const { id, email, passwordHash, fullname, username, role } = data
  return pool.query(
    `INSERT INTO users (id, email, password, fullname, username, role) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [id, email, passwordHash, fullname, username || null, role]
  )
}

const findById = (id) => {
  return pool.query(
    'SELECT id, email, fullname, city, gender, role, created_at, updated_at, is_active, is_verified FROM users WHERE id = $1',
    [id]
  )
}

const getAllUsers = (limit = 10, offset = 0) => {
  return pool.query(
    `SELECT id, email, fullname, city, gender, role, created_at, is_active 
     FROM users 
     WHERE is_active = true
     ORDER BY created_at DESC 
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  )
}

const update = (id, data) => {
  const { city, gender } = data
  return pool.query(
    `UPDATE users 
     SET city = $1,
         gender = $2,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING id, email, fullname, city, gender, role, updated_at`,
    [city, gender, id]
  )
}

const updatePassword = (id, passwordHash) => {
  return pool.query(
    `UPDATE users 
     SET password = $1, updated_at = CURRENT_TIMESTAMP 
     WHERE id = $2 
     RETURNING id, email, fullname`,
    [passwordHash, id]
  )
}

const softDeleteUser = (id) => {
  return pool.query(
    'UPDATE users SET is_active = false WHERE id = $1 RETURNING *',
    [id]
  )
}

const verifyUser = (id) => {
  return pool.query(
    `UPDATE users 
     SET is_verified = true, verification_token = NULL, updated_at = CURRENT_TIMESTAMP 
     WHERE id = $1 
     RETURNING id, email, is_verified`,
    [id]
  )
}

module.exports = {
  findEmail,
  create,
  findById,
  getAllUsers,
  update,
  updatePassword,
  deleteUser: softDeleteUser,
  verifyUser
}
