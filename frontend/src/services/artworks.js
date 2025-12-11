// src/services/artworks.js
// Artworks API calls (View-only for users)

import { get } from './api';

/**
 * Get all artworks with filters
 * @param {Object} params - { page, limit, category, artist_id, is_for_sale }
 * @returns {Promise<Object>} { data: [], total, page, limit }
 */
export async function getAllArtworks(params = {}) {
  const query = new URLSearchParams(params).toString();
  return await get(`/artworks?${query}`);
}

/**
 * Get artwork by ID
 * @param {string} artworkId - Artwork UUID
 * @returns {Promise<Object>} Artwork detail dengan like_count, comment_count, dll
 */
export async function getArtworkById(artworkId) {
  return await get(`/artworks/${artworkId}`);
}

/**
 * Get artworks by category
 * @param {string} category - Category name
 * @param {Object} params - { page, limit }
 * @returns {Promise<Object>} { data: [], total, page, limit }
 */
export async function getArtworksByCategory(category, params = {}) {
  const allParams = { ...params, category };
  return await getAllArtworks(allParams);
}

/**
 * Get artworks by artist
 * @param {string} artistId - Artist/User UUID
 * @param {Object} params - { page, limit }
 * @returns {Promise<Object>} { data: [], total, page, limit }
 */
export async function getArtworksByArtist(artistId, params = {}) {
  const allParams = { ...params, artist_id: artistId };
  return await getAllArtworks(allParams);
}
