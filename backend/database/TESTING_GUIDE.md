# ArtConnect API - Testing Guide with Postman

## 📋 Prerequisite Setup

### 1. Database Setup
```bash
# Run migration to create tables
npm run migrate

# Load dummy data
psql -U postgres -d artconnect_db -f database/seed.sql
# OR using npm script (if you add it to package.json):
# npm run seed
```

### 2. Start Server
```bash
npm run dev
# Server runs on http://localhost:3000
```

---

## 🧪 Test Data Overview

### Users (Test Accounts)
All passwords are: `password123`

**Note:** All users are art enthusiasts (role: user). Galleries and artworks are managed by admin via separate admin FE.

| Email | Name | City |
|-------|------|------|
| john.doe@example.com | John Doe | Jakarta |
| sarah.smith@example.com | Sarah Smith | Bandung |
| mike.johnson@example.com | Mike Johnson | Surabaya |
| lisa.anderson@example.com | Lisa Anderson | Yogyakarta |
| david.chen@example.com | David Chen | Bali |
| emma.wilson@example.com | Emma Wilson | Semarang |

### Sample IDs for Testing

**User IDs:**
- John: `a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d`
- Sarah: `b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e`
- Mike: `c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f`

**Gallery IDs:**
- Modern Abstract Collection: `10000000-0000-0000-0000-000000000001`
- Digital Dreams: `10000000-0000-0000-0000-000000000002`
- Sculptural Visions: `10000000-0000-0000-0000-000000000003`

**Artwork IDs:**
- Cosmic Harmony: `20000000-0000-0000-0000-000000000001`
- Digital Sunrise: `20000000-0000-0000-0000-000000000003`
- The Thinker Redux: `20000000-0000-0000-0000-000000000005`
- Mount Bromo Sunrise: `20000000-0000-0000-0000-000000000008`

**Exhibition IDs:**
- Contemporary Visions 2025 (ongoing): `30000000-0000-0000-0000-000000000001`
- Sculpture Garden Festival (upcoming): `30000000-0000-0000-0000-000000000002`

---

## 🔐 Authentication Flow

### 1. Register New User (Optional)
```http
POST http://localhost:3000/api/users/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "fullname": "New User"
}
```

### 2. Login
```http
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "statusCode": 201,
  "message": "login is successful",
  "data": {
    "id": "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
    "email": "john.doe@example.com",
    "fullname": "John Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Copy the `token` and use it in subsequent requests!**

---

## 📝 Postman Testing Scenarios

### Scenario 1: Browse Galleries
```http
GET http://localhost:3000/api/galleries
# Optional query params: ?page=1&limit=10&category=Abstract
```

### Scenario 2: View Gallery Detail
```http
GET http://localhost:3000/api/galleries/10000000-0000-0000-0000-000000000001
```

### Scenario 3: Browse Artworks in Gallery
```http
GET http://localhost:3000/api/galleries/10000000-0000-0000-0000-000000000001/artworks
```

### Scenario 4: Browse All Artworks
```http
GET http://localhost:3000/api/artworks
# With filters: ?category=Photography&is_for_sale=true
```

### Scenario 5: View Artwork Detail
```http
GET http://localhost:3000/api/artworks/20000000-0000-0000-0000-000000000001
```

### Scenario 6: Browse Exhibitions
```http
GET http://localhost:3000/api/exhibitions
# Filter by status: ?status=ongoing
# Status options: upcoming, ongoing, past
```

### Scenario 7: View Exhibition Detail
```http
GET http://localhost:3000/api/exhibitions/30000000-0000-0000-0000-000000000001
```

### Scenario 8: View Exhibition Artworks
```http
GET http://localhost:3000/api/exhibitions/30000000-0000-0000-0000-000000000001/artworks
```

---

## 🔒 Protected Endpoints (Require Authentication)

**Add this header to all protected requests:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Scenario 9: Add Comment to Artwork
```http
POST http://localhost:3000/api/artworks/20000000-0000-0000-0000-000000000001/comments
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "text": "This is absolutely beautiful! Love the colors.",
  "rating": 5
}
```

### Scenario 10: Get Comments on Artwork
```http
GET http://localhost:3000/api/artworks/20000000-0000-0000-0000-000000000001/comments
Authorization: Bearer YOUR_TOKEN
```

### Scenario 11: Update Own Comment
```http
PUT http://localhost:3000/api/comments/40000000-0000-0000-0000-000000000001
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "text": "Updated: Still amazing after seeing it again!",
  "rating": 5
}
```

### Scenario 12: Delete Own Comment
```http
DELETE http://localhost:3000/api/comments/40000000-0000-0000-0000-000000000001
Authorization: Bearer YOUR_TOKEN
```

### Scenario 13: Like Artwork
```http
POST http://localhost:3000/api/artworks/20000000-0000-0000-0000-000000000001/like
Authorization: Bearer YOUR_TOKEN
```

### Scenario 14: Unlike Artwork
```http
DELETE http://localhost:3000/api/artworks/20000000-0000-0000-0000-000000000001/like
Authorization: Bearer YOUR_TOKEN
```

### Scenario 15: Like Comment
```http
POST http://localhost:3000/api/comments/40000000-0000-0000-0000-000000000001/like
Authorization: Bearer YOUR_TOKEN
```

### Scenario 16: Add to Favorites (My Gallery)
```http
POST http://localhost:3000/api/artworks/20000000-0000-0000-0000-000000000008/favorite
Authorization: Bearer YOUR_TOKEN
```

### Scenario 17: Remove from Favorites
```http
DELETE http://localhost:3000/api/artworks/20000000-0000-0000-0000-000000000008/favorite
Authorization: Bearer YOUR_TOKEN
```

### Scenario 18: View My Favorites
```http
GET http://localhost:3000/api/users/a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d/favorites
Authorization: Bearer YOUR_TOKEN
```

### Scenario 19: View User Profile
```http
GET http://localhost:3000/api/users/profile
Authorization: Bearer YOUR_TOKEN
```

### Scenario 20: Update Profile
```http
PUT http://localhost:3000/api/users/a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "city": "Bali",
  "gender": "Laki-Laki"
}
```

### Scenario 21: Get All Users
```http
GET http://localhost:3000/api/users
Authorization: Bearer YOUR_TOKEN
```

### Scenario 22: View User Profile by ID
```http
GET http://localhost:3000/api/users/d4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a
Authorization: Bearer YOUR_TOKEN
```

### Scenario 23: Get User's Galleries
```http
GET http://localhost:3000/api/users/d4e5f6a7-b8c9-4d5e-1f2a-3b4c5d6e7f8a/galleries
Authorization: Bearer YOUR_TOKEN
```

### Scenario 24: Get User's Exhibitions
```http
GET http://localhost:3000/api/users/f6a7b8c9-d0e1-4f5a-3b4c-5d6e7f8a9b0c/exhibitions
Authorization: Bearer YOUR_TOKEN
```

---

## 🎯 Test Workflows

### Workflow 1: Art Enthusiast Journey
1. Register/Login as John Doe
2. Browse galleries
3. Browse artworks with category filter
4. View artwork detail
5. Like the artwork
6. Add comment with rating
7. Add to favorites
8. View my favorites collection

### Workflow 2: Explore Exhibitions
1. Login
2. Browse all exhibitions
3. Filter exhibitions by status (ongoing)
4. View exhibition detail
5. View artworks in exhibition
6. Like artworks from exhibition

### Workflow 3: User Portfolio View
1. Login
2. Get all users
3. View specific user profile
4. Get user's galleries
5. Get user's exhibitions
6. Browse artworks from user's gallery

### Workflow 4: Social Interaction
1. Login
2. View artwork
3. Read existing comments
4. Add your comment
5. Like other users' comments
6. Update your comment
7. Like the artwork

---

## 🔧 Quick Test Script

Create a file `test-api.http` (for REST Client extension in VS Code):

```http
### Variables
@baseUrl = http://localhost:3000/api
@token = YOUR_TOKEN_HERE

### 1. Login
POST {{baseUrl}}/users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}

### 2. Browse Galleries
GET {{baseUrl}}/galleries

### 3. Browse Artworks
GET {{baseUrl}}/artworks?category=Photography

### 4. Like Artwork
POST {{baseUrl}}/artworks/20000000-0000-0000-0000-000000000008/like
Authorization: Bearer {{token}}

### 5. Add Comment
POST {{baseUrl}}/artworks/20000000-0000-0000-0000-000000000008/comments
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "text": "Beautiful photograph!",
  "rating": 5
}

### 6. Add to Favorites
POST {{baseUrl}}/artworks/20000000-0000-0000-0000-000000000008/favorite
Authorization: Bearer {{token}}
```

---

## 📊 Expected Response Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (register, login, create) |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Email already used, invalid credentials |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error |

---

## 💡 Tips for Testing

1. **Save the token** - After login, save the token in Postman environment variable
2. **Test pagination** - Try different `page` and `limit` values
3. **Test filters** - Use category filters on galleries, artworks, exhibitions
4. **Test edge cases** - Try invalid IDs, missing required fields
5. **Test permissions** - Try to edit/delete others' comments (should fail)
6. **Check counts** - After like/comment, verify counts increase

---

## 🐛 Common Issues

**Issue: 401 Unauthorized**
- Solution: Make sure you included `Authorization: Bearer TOKEN` header

**Issue: 403 Email already used**
- Solution: Use different email or login with existing account

**Issue: 404 Not Found**
- Solution: Check if ID exists in database (use IDs from seed data)

**Issue: Token expired**
- Solution: Login again to get new token

---

## 📚 Additional Resources

- API Documentation: `documentation/api&database/API_DOCUMENTATION.md`
- Postman Collection: `documentation/postman/ArtConnect_API.postman_collection.json`
- Database Schema: `database/schema.sql`
- Seed Data: `database/seed.sql`
