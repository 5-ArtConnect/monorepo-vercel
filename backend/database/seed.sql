-- ArtConnect Database - Seed Data (Dummy Data)
-- PostgreSQL Database
-- Version 1.0
-- Created: December 7, 2025

-- Clear existing data before seeding
TRUNCATE TABLE likes, comments, favorites, artworks, galleries, users CASCADE;

-- ============================================================
-- 1. USERS (Art Enthusiasts Only - View Only)
-- ============================================================
-- Note: Galleries, artworks are managed by admin/system
-- Users can only browse, like, comment, and save to favorites

-- Password for all users: "password123"
-- Hash: $2a$10$4fKBYC.agltevlzz0C1hgu/YKn.Oeq5i/x2JbQ8XPqJj8znmiN2Va

INSERT INTO users (id, email, password, fullname, username, bio, phone, city, gender, role, is_active, is_verified) VALUES
-- Art Enthusiasts (Regular Users)
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'john.doe@example.com', '$2a$10$4fKBYC.agltevlzz0C1hgu/YKn.Oeq5i/x2JbQ8XPqJj8znmiN2Va', 'John Doe', 'johndoe', 'Art lover and collector from Jakarta', '081234567890', 'Jakarta', 'Laki-Laki', 'user', true, true),
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'sarah.smith@example.com', '$2a$10$4fKBYC.agltevlzz0C1hgu/YKn.Oeq5i/x2JbQ8XPqJj8znmiN2Va', 'Sarah Smith', 'sarahsmith', 'Passionate about contemporary art', '081234567891', 'Bandung', 'Perempuan', 'user', true, true),
('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', 'mike.johnson@example.com', '$2a$10$4fKBYC.agltevlzz0C1hgu/YKn.Oeq5i/x2JbQ8XPqJj8znmiN2Va', 'Mike Johnson', 'mikej', 'Photography enthusiast', '081234567892', 'Surabaya', 'Laki-Laki', 'user', true, true),
('d4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', 'mario.silva@example.com', '$2a$10$4fKBYC.agltevlzz0C1hgu/YKn.Oeq5i/x2JbQ8XPqJj8znmiN2Va', 'Mario Silva', 'mariosilva', 'Contemporary artist specializing in abstract and digital art', '081234567893', 'Yogyakarta', 'Laki-Laki', 'user', true, true),
('e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b', 'hanna.kim@example.com', '$2a$10$4fKBYC.agltevlzz0C1hgu/YKn.Oeq5i/x2JbQ8XPqJj8znmiN2Va', 'Hanna Kim', 'hannakim', 'Sculpture and 3D art specialist from Seoul', '081234567894', 'Bali', 'Perempuan', 'user', true, true),
('f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', 'kim.sejeong@example.com', '$2a$10$4fKBYC.agltevlzz0C1hgu/YKn.Oeq5i/x2JbQ8XPqJj8znmiN2Va', 'Kim Sejeong', 'kimsejeong', 'Professional photographer capturing Indonesia beauty', '081234567895', 'Semarang', 'Perempuan', 'user', true, true);

-- ============================================================
-- 2. GALLERIES (Managed by Admin/System)
-- ============================================================
-- Note: Users cannot create galleries - these are created by admin
-- Galleries have owner_id for display purposes only

INSERT INTO galleries (id, owner_id, name, description, category, cover_image_url, is_deleted) VALUES
-- Abstract & Digital Galleries
('10000000-0000-0000-0000-000000000001', 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', 'Modern Abstract Collection', 'A curated collection of contemporary abstract artworks', 'Abstrakt', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469956/artconnect/galleries/pameran1.jpg', false),
('10000000-0000-0000-0000-000000000002', 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', 'Digital Dreams', 'Exploring the digital art frontier', 'Impressionisme', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469958/artconnect/galleries/pameran2.jpg', false),

-- Hanna Kim's Gallery
('10000000-0000-0000-0000-000000000003', 'e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b', 'Sculptural Visions', 'Three-dimensional art in various materials', 'Ekspressionisme', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469959/artconnect/galleries/pameran3.jpg', false),

-- Kim Sejeong's Gallery
('10000000-0000-0000-0000-000000000004', 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', 'Nature Through Lens', 'Capturing the beauty of natural landscapes', 'Impressionisme', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469961/artconnect/galleries/gallerysee.png', false),
('10000000-0000-0000-0000-000000000005', 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', 'Urban Stories', 'Street photography from Indonesian cities', 'Ekspressionisme', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469956/artconnect/galleries/pameran1.jpg', false);

-- ============================================================
-- 3. ARTWORKS (Managed by Admin/System)
-- ============================================================
-- Note: Users cannot upload artworks - these are created by admin via separate admin FE
-- artist_id field exists but users only view artworks, not create them

INSERT INTO artworks (id, gallery_id, artist_id, title, description, image_url, category, medium, dimensions, price, is_for_sale, view_count, like_count, comment_count, is_deleted) VALUES
-- Abstract & Digital Artworks
('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', 'Cosmic Harmony', 'An exploration of color and form in abstract space', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469873/artconnect/artworks/abstrakt/abs1.jpg', 'Abstrakt', 'Acrylic on Canvas', '120x90 cm', 15000000.00, true, 245, 42, 8, false),
('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', 'Flowing Emotions', 'Abstract representation of human feelings', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469874/artconnect/artworks/abstrakt/abs2.jpg', 'Abstrakt', 'Mixed Media', '100x100 cm', 12000000.00, true, 189, 35, 6, false),
('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', 'Digital Sunrise', 'Computer-generated art inspired by nature', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469892/artconnect/artworks/visual-art/vis1.png', 'Impressionisme', 'Digital Art', 'NFT 4K', 8000000.00, true, 312, 58, 12, false),
('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002', 'd4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a', 'Cyber Garden', 'Where technology meets organic forms', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469895/artconnect/artworks/visual-art/vis2.png', 'Impressionisme', 'Digital Art', 'NFT 4K', 10000000.00, false, 278, 51, 9, false),

-- Hanna Kim's Artworks (Sculpture)
('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000003', 'e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b', 'The Thinker Redux', 'Modern interpretation of classical sculpture', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469876/artconnect/artworks/abstrakt/abs3.jpg', 'Ekspressionisme', 'Bronze', '180x60x60 cm', 45000000.00, true, 421, 67, 15, false),
('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000003', 'e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b', 'Twisted Reality', 'Abstract form exploring perception', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469877/artconnect/artworks/abstrakt/abs4.jpg', 'Ekspressionisme', 'Steel & Glass', '150x80x80 cm', 38000000.00, true, 356, 49, 11, false),
('20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000003', 'e5f6a7b8-c9d0-4e5f-2a3b-4c5d6e7f8a9b', 'Balance', 'Minimalist sculpture about equilibrium', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469879/artconnect/artworks/ekspressionisme/eks1.jpg', 'Ekspressionisme', 'Marble', '120x40x40 cm', 28000000.00, false, 294, 41, 7, false),

-- Kim Sejeong's Artworks (Photography)
('20000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000004', 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', 'Mount Bromo Sunrise', 'Golden hour at Indonesia''s most iconic volcano', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469935/artconnect/artworks/others/br1.jpg', 'Abstrakt', 'Fine Art Print', '90x60 cm', 5000000.00, true, 567, 89, 18, false),
('20000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000004', 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', 'Rice Terraces', 'The beauty of traditional Balinese agriculture', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469867/artconnect/artworks/impressionisme/imp1.jpg', 'Impressionisme', 'Fine Art Print', '90x60 cm', 4500000.00, true, 489, 76, 14, false),
('20000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000005', 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', 'Jakarta After Dark', 'Urban nightlife in the capital city', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469887/artconnect/artworks/street-art/st1.jpg', 'Ekspressionisme', 'Fine Art Print', '120x80 cm', 6000000.00, true, 634, 102, 21, false),
('20000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000005', 'f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c', 'Street Vendor', 'Portraits of everyday heroes', 'https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469888/artconnect/artworks/street-art/st2.jpg', 'Ekspressionisme', 'Fine Art Print', '70x50 cm', 3500000.00, false, 401, 68, 13, false);

-- ============================================================
-- 4. COMMENTS (User feedback on artworks)
-- ============================================================

INSERT INTO comments (id, artwork_id, author_id, text, rating, like_count, is_deleted) VALUES
-- Comments on "Cosmic Harmony"
('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Absolutely stunning! The use of color is magnificent.', 5, 3, false),
('40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'This piece really speaks to me. Love the energy!', 5, 2, false),

-- Comments on "Digital Sunrise"
('40000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000003', 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', 'Beautiful blend of nature and technology!', 4, 1, false),
('40000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000003', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Impressive digital work. Would love to see more!', 5, 4, false),

-- Comments on "The Thinker Redux"
('40000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000005', 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'A masterpiece! The detail is incredible.', 5, 5, false),
('40000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000005', 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', 'Modern take on a classic. Very impressive!', 4, 2, false),

-- Comments on "Mount Bromo Sunrise"
('40000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000008', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'This takes me back to my trip to Bromo. Amazing shot!', 5, 6, false),
('40000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000008', 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'The colors are breathtaking. Professional work!', 5, 4, false),

-- Comments on "Jakarta After Dark"
('40000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000010', 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', 'Love the urban vibe! Great composition.', 4, 3, false);

-- ============================================================
-- 5. LIKES (User likes on artworks)
-- ============================================================

INSERT INTO likes (user_id, artwork_id) VALUES
-- John likes several artworks
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '20000000-0000-0000-0000-000000000001'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '20000000-0000-0000-0000-000000000003'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '20000000-0000-0000-0000-000000000008'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '20000000-0000-0000-0000-000000000010'),

-- Sarah likes artworks
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', '20000000-0000-0000-0000-000000000001'),
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', '20000000-0000-0000-0000-000000000005'),
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', '20000000-0000-0000-0000-000000000008'),
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', '20000000-0000-0000-0000-000000000009'),

-- Mike likes artworks
('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', '20000000-0000-0000-0000-000000000003'),
('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', '20000000-0000-0000-0000-000000000005'),
('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', '20000000-0000-0000-0000-000000000010');

-- ============================================================
-- 5. LIKES (User likes on comments)
-- ============================================================

INSERT INTO likes (user_id, comment_id) VALUES
-- Likes on comments
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '40000000-0000-0000-0000-000000000001'),
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', '40000000-0000-0000-0000-000000000001'),
('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', '40000000-0000-0000-0000-000000000005'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '40000000-0000-0000-0000-000000000007');

-- ============================================================
-- 5. FAVORITES (User's favorite artworks - My Gallery)
-- ============================================================

INSERT INTO favorites (user_id, artwork_id) VALUES
-- John's favorite artworks
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '20000000-0000-0000-0000-000000000001'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '20000000-0000-0000-0000-000000000008'),
('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', '20000000-0000-0000-0000-000000000005'),

-- Sarah's favorites
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', '20000000-0000-0000-0000-000000000003'),
('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', '20000000-0000-0000-0000-000000000009'),

-- Mike's favorites
('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', '20000000-0000-0000-0000-000000000010'),
('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', '20000000-0000-0000-0000-000000000006');

-- ============================================================
-- SEED DATA SUMMARY
-- ============================================================
-- 6 Users (all art enthusiasts - role: user)
--   - John Doe, Sarah Smith, Mike Johnson (regular users)
--   - Mario Silva (Abstract & Digital Artist)
--   - Hanna Kim (Sculpture Artist)
--   - Kim Sejeong (Photographer)
-- 5 Galleries (managed by admin, view-only for users)
-- 11 Artworks (managed by admin, view-only for users)
-- 9 Comments (users can CRUD their own comments)
-- Likes & Favorites (users can like/favorite artworks)
-- 8 Artwork Likes (users can like/unlike)
-- 4 Comment Likes
-- 7 Favorites (users' saved artworks - My Gallery feature)
-- ============================================================
