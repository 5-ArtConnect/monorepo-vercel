// src/services/likes.js
// Likes API calls (for artworks & comments)

import { post, del } from './api';

/**
 * Like an artwork
 * @param {string} artworkId - Artwork UUID
 * @returns {Promise<Object>} Success message
 */
export async function likeArtwork(artworkId) {
  return await post(`/artworks/${artworkId}/like`, {});
}

/**
 * Unlike an artwork
 * @param {string} artworkId - Artwork UUID
 * @returns {Promise<Object>} Success message
 */
export async function unlikeArtwork(artworkId) {
  return await del(`/artworks/${artworkId}/like`);
}

/**
 * Like a comment
 * @param {string} commentId - Comment UUID
 * @returns {Promise<Object>} Success message
 */
export async function likeComment(commentId) {
  return await post(`/comments/${commentId}/like`, {});
}

/**
 * Unlike a comment
 * @param {string} commentId - Comment UUID
 * @returns {Promise<Object>} Success message
 */
export async function unlikeComment(commentId) {
  return await del(`/comments/${commentId}/like`);
}
