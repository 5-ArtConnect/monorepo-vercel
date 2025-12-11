const pool = require('../config/db')

const create = (data) => {
  const { artwork_id, author_id, text, rating } = data
  return pool.query(
    `INSERT INTO comments (artwork_id, author_id, text, rating) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [artwork_id, author_id, text, rating]
  )
}

const findByArtworkId = (artwork_id, limit = 10, offset = 0) => {
  return pool.query(
    `SELECT c.*, 
     u.fullname as author_name, 
     u.profile_picture as author_avatar
     FROM comments c
     LEFT JOIN users u ON c.author_id = u.id
     WHERE c.artwork_id = $1 AND c.is_deleted = false
     ORDER BY c.created_at DESC
     LIMIT $2 OFFSET $3`,
    [artwork_id, limit, offset]
  )
}

const findById = (id) => {
  return pool.query(
    `SELECT c.*, 
     u.fullname as author_name, 
     u.profile_picture as author_avatar
     FROM comments c
     LEFT JOIN users u ON c.author_id = u.id
     WHERE c.id = $1 AND c.is_deleted = false`,
    [id]
  )
}

const update = (id, data) => {
  const { text, rating } = data
  return pool.query(
    `UPDATE comments 
     SET text = COALESCE($1, text),
         rating = COALESCE($2, rating),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $3 AND is_deleted = false
     RETURNING *`,
    [text, rating, id]
  )
}

const deleteComment = (id) => {
  return pool.query(
    'UPDATE comments SET is_deleted = true WHERE id = $1 RETURNING *',
    [id]
  )
}

// Note: like_count is auto-updated by database trigger, this function is kept for manual sync if needed
const updateLikeCount = (id) => {
  return pool.query(
    `UPDATE comments 
     SET like_count = (SELECT COUNT(*) FROM likes WHERE comment_id = $1)
     WHERE id = $1
     RETURNING like_count`,
    [id]
  )
}

const getAverageRating = (artwork_id) => {
  return pool.query(
    `SELECT AVG(rating) as average_rating, COUNT(*) as rating_count
     FROM comments
     WHERE artwork_id = $1 AND rating IS NOT NULL AND is_deleted = false`,
    [artwork_id]
  )
}

module.exports = {
  create,
  findByArtworkId,
  findById,
  update,
  deleteComment,
  updateLikeCount,
  getAverageRating
}
