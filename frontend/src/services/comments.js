// src/services/comments.js
// Comments API calls

import { get, post, put, del } from './api';

/**
 * Get comments for an artwork
 * @param {string} artworkId - Artwork UUID
 * @param {Object} params - { page, limit }
 * @returns {Promise<Object>} { data: [], total, page, limit }
 */
export async function getArtworkComments(artworkId, params = {}) {
  const query = new URLSearchParams(params).toString();
  return await get(`/artworks/${artworkId}/comments?${query}`);
}

/**
 * Create comment on artwork
 * @param {string} artworkId - Artwork UUID
 * @param {Object} data - { text, rating }
 * @returns {Promise<Object>} Created comment
 */
export async function createComment(artworkId, data) {
  return await post(`/artworks/${artworkId}/comments`, data);
}

/**
 * Update own comment
 * @param {string} commentId - Comment UUID
 * @param {Object} data - { text, rating }
 * @returns {Promise<Object>} Updated comment
 */
export async function updateComment(commentId, data) {
  return await put(`/comments/${commentId}`, data);
}

/**
 * Delete own comment
 * @param {string} commentId - Comment UUID
 * @returns {Promise<Object>} Success message
 */
export async function deleteComment(commentId) {
  return await del(`/comments/${commentId}`);
}
