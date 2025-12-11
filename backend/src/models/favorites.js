const db = require('../config/db')

const addFavorite = (user_id, artwork_id) => {
  return db.query(
    `INSERT INTO favorites (user_id, artwork_id) 
     VALUES ($1, $2) 
     ON CONFLICT (user_id, artwork_id) DO NOTHING
     RETURNING *`,
    [user_id, artwork_id]
  )
}

const removeFavorite = (user_id, artwork_id) => {
  return db.query(
    `DELETE FROM favorites 
     WHERE user_id = $1 AND artwork_id = $2 
     RETURNING *`,
    [user_id, artwork_id]
  )
}

const getUserFavorites = (user_id, limit, offset) => {
  return db.query(
    `SELECT 
      a.id,
      a.title,
      a.description,
      a.image_url,
      a.category,
      a.medium,
      a.price,
      a.is_for_sale,
      a.view_count,
      a.created_at,
      u.id as artist_id,
      u.fullname as artist_name,
      u.profile_picture as artist_picture,
      g.id as gallery_id,
      g.name as gallery_name,
      COUNT(DISTINCT l.id) as like_count,
      COUNT(DISTINCT c.id) as comment_count,
      f.created_at as favorited_at
    FROM favorites f
    JOIN artworks a ON f.artwork_id = a.id
    JOIN users u ON a.artist_id = u.id
    LEFT JOIN galleries g ON a.gallery_id = g.id
    LEFT JOIN likes l ON a.id = l.artwork_id
    LEFT JOIN comments c ON a.id = c.artwork_id
    WHERE f.user_id = $1
    GROUP BY a.id, u.id, u.fullname, u.profile_picture, g.id, g.name, f.created_at
    ORDER BY f.created_at DESC
    LIMIT $2 OFFSET $3`,
    [user_id, limit, offset]
  )
}

const checkFavorite = (user_id, artwork_id) => {
  return db.query(
    `SELECT * FROM favorites 
     WHERE user_id = $1 AND artwork_id = $2`,
    [user_id, artwork_id]
  )
}

module.exports = {
  addFavorite,
  removeFavorite,
  getUserFavorites,
  checkFavorite
}
