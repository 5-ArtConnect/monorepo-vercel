  -- ArtConnect Database Schema
  -- PostgreSQL Database
  -- Version 1.0
  -- Created: December 2025

  -- Note: Database schema kept in full for backward compatibility
  -- Inactive tables (communities, favorites) are preserved but not used in API
  -- See documentation/api&database/USER_ROLE_CHANGES.md for details

  -- Drop existing tables if exists (for clean setup)
  DROP TABLE IF EXISTS notifications CASCADE;
  DROP TABLE IF EXISTS community_gallery CASCADE;
  DROP TABLE IF EXISTS community_members CASCADE;
  DROP TABLE IF EXISTS communities CASCADE;
  DROP TABLE IF EXISTS favorites CASCADE;
  DROP TABLE IF EXISTS likes CASCADE;
  DROP TABLE IF EXISTS comments CASCADE;
  DROP TABLE IF EXISTS artworks CASCADE;
  DROP TABLE IF EXISTS galleries CASCADE;
  DROP TABLE IF EXISTS users CASCADE;

  -- Enable UUID extension
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  -- 1. USERS Table
  -- User Profile Fields:
  -- Display: id, email, fullname, city, gender, role, timestamps, is_active, is_verified
  -- Editable: city, gender only (email and fullname are permanent)
  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE,
    bio TEXT,
    profile_picture VARCHAR(500),
    phone VARCHAR(20),
    city VARCHAR(100),
    gender VARCHAR(50),
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    verification_token VARCHAR(255)
  );

  CREATE INDEX idx_users_email ON users(email);
  CREATE INDEX idx_users_username ON users(username);
  CREATE INDEX idx_users_is_active ON users(is_active);

  -- 2. GALLERIES Table
  -- View-only for users (browse galleries only)
  -- Create/update/delete restricted to admin/system
  CREATE TABLE galleries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    cover_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false
  );

  CREATE INDEX idx_galleries_owner_id ON galleries(owner_id);
  CREATE INDEX idx_galleries_category ON galleries(category);
  CREATE INDEX idx_galleries_created_at ON galleries(created_at DESC);

  -- 3. ARTWORKS Table
  -- Users can CRUD their own artworks
  CREATE TABLE artworks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gallery_id UUID NOT NULL REFERENCES galleries(id) ON DELETE CASCADE,
    artist_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    category VARCHAR(100),
    medium VARCHAR(100),
    dimensions VARCHAR(100),
    price DECIMAL(15, 2),
    is_for_sale BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false,
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0
  );

  CREATE INDEX idx_artworks_gallery_id ON artworks(gallery_id);
  CREATE INDEX idx_artworks_artist_id ON artworks(artist_id);
  CREATE INDEX idx_artworks_category ON artworks(category);
  CREATE INDEX idx_artworks_created_at ON artworks(created_at DESC);
  CREATE INDEX idx_artworks_like_count ON artworks(like_count DESC);
  CREATE INDEX idx_artworks_popular ON artworks(like_count DESC, view_count DESC, created_at DESC);

  -- 4. COMMENTS Table
  -- Users can comment on artworks for feedback (CRUD own comments)
  CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false,
    like_count INT DEFAULT 0
  );

  CREATE INDEX idx_comments_artwork_id ON comments(artwork_id);
  CREATE INDEX idx_comments_author_id ON comments(author_id);
  CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
  CREATE INDEX idx_comments_artwork_date ON comments(artwork_id, created_at DESC);

  -- 5. LIKES Table
  -- Like/unlike artworks and comments for feedback
  CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE,
    comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, artwork_id),
    UNIQUE(user_id, comment_id),
    CHECK ((artwork_id IS NOT NULL) OR (comment_id IS NOT NULL))
  );

  CREATE INDEX idx_likes_user_id ON likes(user_id);
  CREATE INDEX idx_likes_artwork_id ON likes(artwork_id);
  CREATE INDEX idx_likes_comment_id ON likes(comment_id);

  -- 6. FAVORITES Table
  -- User's favorite artworks - "My Gallery" feature in profile
  -- Users can save artworks to their personal collection
  CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, artwork_id)
  );

  CREATE INDEX idx_favorites_user_id ON favorites(user_id);
  CREATE INDEX idx_favorites_artwork_id ON favorites(artwork_id);

  -- 7. COMMUNITIES Table
  -- INACTIVE - Removed completely
  -- Kept for backward compatibility
  CREATE TABLE communities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    founder_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image_url VARCHAR(500),
    privacy VARCHAR(20) DEFAULT 'public',
    member_count INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false
  );

  CREATE INDEX idx_communities_founder_id ON communities(founder_id);
  CREATE INDEX idx_communities_category ON communities(category);
  CREATE INDEX idx_communities_privacy ON communities(privacy);
  CREATE INDEX idx_communities_created_at ON communities(created_at DESC);

  -- 8. COMMUNITY_MEMBERS Table
  -- INACTIVE - Removed with communities
  CREATE TABLE community_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    community_id UUID NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(community_id, user_id)
  );

  CREATE INDEX idx_community_members_community_id ON community_members(community_id);
  CREATE INDEX idx_community_members_user_id ON community_members(user_id);
  CREATE INDEX idx_community_members_role ON community_members(role);

  -- 9. COMMUNITY_GALLERY Table
  -- INACTIVE - Removed with communities
  CREATE TABLE community_gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    community_id UUID NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
    artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
    added_by_id UUID NOT NULL REFERENCES users(id),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(community_id, artwork_id)
  );

  CREATE INDEX idx_community_gallery_community_id ON community_gallery(community_id);
  CREATE INDEX idx_community_gallery_artwork_id ON community_gallery(artwork_id);

  -- 10. NOTIFICATIONS Table
  -- Optional - Not currently implemented
  CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50),
    related_user_id UUID REFERENCES users(id),
    related_artwork_id UUID REFERENCES artworks(id),
    related_community_id UUID REFERENCES communities(id),
    message TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX idx_notifications_user_id ON notifications(user_id);
  CREATE INDEX idx_notifications_is_read ON notifications(is_read);
  CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

  -- Triggers for auto-updating updated_at
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
  END;
  $$ language 'plpgsql';

  CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  CREATE TRIGGER update_galleries_updated_at BEFORE UPDATE ON galleries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  CREATE TRIGGER update_artworks_updated_at BEFORE UPDATE ON artworks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  CREATE TRIGGER update_communities_updated_at BEFORE UPDATE ON communities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  -- Triggers for auto-updating counter fields

  -- Trigger to update artwork like_count when like is added
  CREATE OR REPLACE FUNCTION update_artwork_like_count()
  RETURNS TRIGGER AS $$
  BEGIN
    IF TG_OP = 'INSERT' AND NEW.artwork_id IS NOT NULL THEN
      UPDATE artworks SET like_count = like_count + 1 WHERE id = NEW.artwork_id;
    ELSIF TG_OP = 'DELETE' AND OLD.artwork_id IS NOT NULL THEN
      UPDATE artworks SET like_count = like_count - 1 WHERE id = OLD.artwork_id;
    END IF;
    RETURN NULL;
  END;
  $$ language 'plpgsql';

  CREATE TRIGGER trigger_artwork_like_count
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW
  EXECUTE FUNCTION update_artwork_like_count();

  -- Trigger to update comment like_count when like is added
  CREATE OR REPLACE FUNCTION update_comment_like_count()
  RETURNS TRIGGER AS $$
  BEGIN
    IF TG_OP = 'INSERT' AND NEW.comment_id IS NOT NULL THEN
      UPDATE comments SET like_count = like_count + 1 WHERE id = NEW.comment_id;
    ELSIF TG_OP = 'DELETE' AND OLD.comment_id IS NOT NULL THEN
      UPDATE comments SET like_count = like_count - 1 WHERE id = OLD.comment_id;
    END IF;
    RETURN NULL;
  END;
  $$ language 'plpgsql';

  CREATE TRIGGER trigger_comment_like_count
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_like_count();

  -- Trigger to update artwork comment_count when comment is added/deleted
  CREATE OR REPLACE FUNCTION update_artwork_comment_count()
  RETURNS TRIGGER AS $$
  BEGIN
    IF TG_OP = 'INSERT' THEN
      UPDATE artworks SET comment_count = comment_count + 1 WHERE id = NEW.artwork_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE artworks SET comment_count = comment_count - 1 WHERE id = OLD.artwork_id;
    ELSIF TG_OP = 'UPDATE' THEN
      -- When comment is soft deleted
      IF NEW.is_deleted = true AND OLD.is_deleted = false THEN
        UPDATE artworks SET comment_count = comment_count - 1 WHERE id = NEW.artwork_id;
      ELSIF NEW.is_deleted = false AND OLD.is_deleted = true THEN
        UPDATE artworks SET comment_count = comment_count + 1 WHERE id = NEW.artwork_id;
      END IF;
    END IF;
    RETURN NULL;
  END;
  $$ language 'plpgsql';

  CREATE TRIGGER trigger_artwork_comment_count
  AFTER INSERT OR DELETE OR UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_artwork_comment_count();