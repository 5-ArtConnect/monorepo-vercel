const pool = require('../config/db')

const create = (data) => {
  const { owner_id, name, description, category, cover_image_url } = data
  return pool.query(
    `INSERT INTO galleries (owner_id, name, description, category, cover_image_url) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [owner_id, name, description, category, cover_image_url]
  )
}

const findAll = (limit = 10, offset = 0, category = null, owner_id = null) => {
  let query = `SELECT g.*, u.fullname as owner_name, u.profile_picture as owner_avatar,
               COUNT(DISTINCT a.id) as artwork_count
               FROM galleries g
               LEFT JOIN users u ON g.owner_id = u.id
               LEFT JOIN artworks a ON g.id = a.gallery_id AND a.is_deleted = false
               WHERE g.is_deleted = false`
  const params = []
  let paramCount = 1

  if (category) {
    query += ` AND g.category = $${paramCount}`
    params.push(category)
    paramCount++
  }

  if (owner_id) {
    query += ` AND g.owner_id = $${paramCount}`
    params.push(owner_id)
    paramCount++
  }

  query += ` GROUP BY g.id, u.fullname, u.profile_picture
             ORDER BY g.created_at DESC
             LIMIT $${paramCount} OFFSET $${paramCount + 1}`
  params.push(limit, offset)

  return pool.query(query, params)
}

const findById = (id) => {
  return pool.query(
    `SELECT g.*, u.fullname as owner_name, u.profile_picture as owner_avatar, u.bio as owner_bio,
     COUNT(DISTINCT a.id) as artwork_count
     FROM galleries g
     LEFT JOIN users u ON g.owner_id = u.id
     LEFT JOIN artworks a ON g.id = a.gallery_id AND a.is_deleted = false
     WHERE g.id = $1 AND g.is_deleted = false
     GROUP BY g.id, u.fullname, u.profile_picture, u.bio`,
    [id]
  )
}

const findByOwnerId = (owner_id) => {
  return pool.query(
    `SELECT g.*, COUNT(DISTINCT a.id) as artwork_count
     FROM galleries g
     LEFT JOIN artworks a ON g.id = a.gallery_id AND a.is_deleted = false
     WHERE g.owner_id = $1 AND g.is_deleted = false
     GROUP BY g.id
     ORDER BY g.created_at DESC`,
    [owner_id]
  )
}

const update = (id, data) => {
  const { name, description, category, cover_image_url } = data
  return pool.query(
    `UPDATE galleries 
     SET name = COALESCE($1, name),
         description = COALESCE($2, description),
         category = COALESCE($3, category),
         cover_image_url = COALESCE($4, cover_image_url),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $5 AND is_deleted = false
     RETURNING *`,
    [name, description, category, cover_image_url, id]
  )
}

const deleteGallery = (id) => {
  return pool.query(
    'UPDATE galleries SET is_deleted = true WHERE id = $1 RETURNING *',
    [id]
  )
}

const getArtworksByGalleryId = (gallery_id, limit = 10, offset = 0) => {
  return pool.query(
    `SELECT a.*, u.fullname as artist_name, u.profile_picture as artist_avatar
     FROM artworks a
     LEFT JOIN users u ON a.artist_id = u.id
     WHERE a.gallery_id = $1 AND a.is_deleted = false
     ORDER BY a.created_at DESC
     LIMIT $2 OFFSET $3`,
    [gallery_id, limit, offset]
  )
}

module.exports = {
  create,
  findAll,
  findById,
  findByOwnerId,
  update,
  deleteGallery,
  getArtworksByGalleryId
}
