const pool = require('../config/db')

const likeArtwork = (user_id, artwork_id) => {
  return pool.query(
    `INSERT INTO likes (user_id, artwork_id) 
     VALUES ($1, $2) 
     ON CONFLICT (user_id, artwork_id) DO NOTHING
     RETURNING *`,
    [user_id, artwork_id]
  )
}

const unlikeArtwork = (user_id, artwork_id) => {
  return pool.query(
    'DELETE FROM likes WHERE user_id = $1 AND artwork_id = $2 RETURNING *',
    [user_id, artwork_id]
  )
}

const likeComment = (user_id, comment_id) => {
  return pool.query(
    `INSERT INTO likes (user_id, comment_id) 
     VALUES ($1, $2) 
     ON CONFLICT (user_id, comment_id) DO NOTHING
     RETURNING *`,
    [user_id, comment_id]
  )
}

const unlikeComment = (user_id, comment_id) => {
  return pool.query(
    'DELETE FROM likes WHERE user_id = $1 AND comment_id = $2 RETURNING *',
    [user_id, comment_id]
  )
}

const checkArtworkLike = (user_id, artwork_id) => {
  return pool.query(
    'SELECT * FROM likes WHERE user_id = $1 AND artwork_id = $2',
    [user_id, artwork_id]
  )
}

const checkCommentLike = (user_id, comment_id) => {
  return pool.query(
    'SELECT * FROM likes WHERE user_id = $1 AND comment_id = $2',
    [user_id, comment_id]
  )
}

module.exports = {
  likeArtwork,
  unlikeArtwork,
  likeComment,
  unlikeComment,
  checkArtworkLike,
  checkCommentLike
}
