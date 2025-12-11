// src/services/favorites.js
// Favorites/My Gallery API calls

import { get, post, del } from './api';
import { getCurrentUser } from './auth';

/**
 * Get user's favorite artworks (My Gallery)
 * @param {Object} params - { page, limit }
 * @returns {Promise<Object>} { data: [], total, page, limit }
 */
export async function getFavorites(params = {}) {
  const user = getCurrentUser();
  if (!user || !user.id) {
    throw new Error('User not authenticated');
  }
  
  const query = new URLSearchParams(params).toString();
  return await get(`/users/${user.id}/favorites?${query}`);
}

/**
 * Add artwork to favorites
 * @param {string} artworkId - Artwork UUID
 * @returns {Promise<Object>} Success message dengan favorite_id
 */
export async function addToFavorites(artworkId) {
  return await post(`/artworks/${artworkId}/favorite`, {});
}

/**
 * Remove artwork from favorites
 * @param {string} artworkId - Artwork UUID
 * @returns {Promise<Object>} Success message
 */
export async function removeFromFavorites(artworkId) {
  return await del(`/artworks/${artworkId}/favorite`);
}

/**
 * Check if artwork is in favorites
 * @param {string} artworkId - Artwork UUID
 * @returns {Promise<boolean>}
 */
export async function isFavorite(artworkId) {
  try {
    const favorites = await getFavorites();
    return favorites.data?.some(fav => fav.artwork_id === artworkId) || false;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
}
