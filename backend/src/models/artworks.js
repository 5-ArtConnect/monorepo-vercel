const pool = require('../config/db')

const create = (data) => {
  const { gallery_id, artist_id, title, description, image_url, category, medium, dimensions, price, is_for_sale } = data
  return pool.query(
    `INSERT INTO artworks (gallery_id, artist_id, title, description, image_url, category, medium, dimensions, price, is_for_sale) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [gallery_id, artist_id, title, description, image_url, category, medium, dimensions, price, is_for_sale]
  )
}

const findAll = (limit = 10, offset = 0, filters = {}) => {
  let query = `SELECT a.*, 
               u.fullname as artist_name, 
               u.profile_picture as artist_avatar,
               g.name as gallery_name,
               EXISTS(SELECT 1 FROM likes WHERE artwork_id = a.id AND user_id = $1) as is_liked,
               EXISTS(SELECT 1 FROM favorites WHERE artwork_id = a.id AND user_id = $1) as is_favorited
               FROM artworks a
               LEFT JOIN users u ON a.artist_id = u.id
               LEFT JOIN galleries g ON a.gallery_id = g.id
               WHERE a.is_deleted = false`

  const params = [filters.user_id || null]
  let paramCount = 2

  if (filters.category) {
    query += ` AND a.category = $${paramCount}`
    params.push(filters.category)
    paramCount++
  }

  if (filters.artist_id) {
    query += ` AND a.artist_id = $${paramCount}`
    params.push(filters.artist_id)
    paramCount++
  }

  if (filters.is_for_sale !== undefined) {
    query += ` AND a.is_for_sale = $${paramCount}`
    params.push(filters.is_for_sale)
    paramCount++
  }

  query += ` ORDER BY a.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`
  params.push(limit, offset)

  return pool.query(query, params)
}

const findById = (id, user_id = null) => {
  return pool.query(
    `SELECT a.*, 
     u.fullname as artist_name, 
     u.profile_picture as artist_avatar,
     u.bio as artist_bio,
     g.name as gallery_name,
     EXISTS(SELECT 1 FROM likes WHERE artwork_id = a.id AND user_id = $2) as is_liked,
     EXISTS(SELECT 1 FROM favorites WHERE artwork_id = a.id AND user_id = $2) as is_favorited
     FROM artworks a
     LEFT JOIN users u ON a.artist_id = u.id
     LEFT JOIN galleries g ON a.gallery_id = g.id
     WHERE a.id = $1 AND a.is_deleted = false`,
    [id, user_id]
  )
}

const update = (id, data) => {
  const { title, description, category, medium, dimensions, price, is_for_sale } = data
  return pool.query(
    `UPDATE artworks 
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         category = COALESCE($3, category),
         medium = COALESCE($4, medium),
         dimensions = COALESCE($5, dimensions),
         price = COALESCE($6, price),
         is_for_sale = COALESCE($7, is_for_sale),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $8 AND is_deleted = false
     RETURNING *`,
    [title, description, category, medium, dimensions, price, is_for_sale, id]
  )
}

const deleteArtwork = (id) => {
  return pool.query(
    'UPDATE artworks SET is_deleted = true WHERE id = $1 RETURNING *',
    [id]
  )
}

const incrementViewCount = (id) => {
  return pool.query(
    'UPDATE artworks SET view_count = view_count + 1 WHERE id = $1 RETURNING view_count',
    [id]
  )
}

// Note: like_count is auto-updated by database trigger, this function is kept for manual sync if needed
const updateLikeCount = (id) => {
  return pool.query(
    `UPDATE artworks 
     SET like_count = (SELECT COUNT(*) FROM likes WHERE artwork_id = $1)
     WHERE id = $1
     RETURNING like_count`,
    [id]
  )
}

// Note: comment_count is auto-updated by database trigger, this function is kept for manual sync if needed
const updateCommentCount = (id) => {
  return pool.query(
    `UPDATE artworks 
     SET comment_count = (SELECT COUNT(*) FROM comments WHERE artwork_id = $1 AND is_deleted = false)
     WHERE id = $1
     RETURNING comment_count`,
    [id]
  )
}

const getTrending = (limit = 10) => {
  return pool.query(
    `SELECT a.*, 
     u.fullname as artist_name, 
     u.profile_picture as artist_avatar,
     g.name as gallery_name,
     (a.like_count * 0.5 + a.view_count * 0.3 + a.comment_count * 0.2) as trending_score
     FROM artworks a
     LEFT JOIN users u ON a.artist_id = u.id
     LEFT JOIN galleries g ON a.gallery_id = g.id
     WHERE a.is_deleted = false
     ORDER BY trending_score DESC, a.created_at DESC
     LIMIT $1`,
    [limit]
  )
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteArtwork,
  incrementViewCount,
  updateLikeCount,
  updateCommentCount,
  getTrending
}
