# Testing Guide for MongoDB + JWT Migration

## Quick Test Checklist

### ✅ 1. Start the Application

```bash
npm run dev
```

Visit: `http://localhost:3000`

### ✅ 2. Test Registration

1. Click "Get Started" or go to `/auth`
2. Click "Register" tab
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. Click "Create Account"
5. **Expected**: Redirect to `/dashboard` with success message

### ✅ 3. Test Logout

1. Click your profile picture/name in header
2. Click "Sign Out"
3. **Expected**: Redirect to home page

### ✅ 4. Test Login

1. Go to `/auth`
2. Enter credentials from step 2
3. Click "Sign In"
4. **Expected**: Redirect to `/dashboard`

### ✅ 5. Test Protected Routes

1. Logout if logged in
2. Try to visit `/dashboard` directly
3. **Expected**: Redirect to `/auth`

### ✅ 6. Test Interview Creation

1. Login
2. Go to "Create Interview"
3. Fill in job details
4. Generate questions
5. Save interview
6. **Expected**: Interview saved to MongoDB, redirect to interview page

### ✅ 7. Test Interview Access

1. Copy the interview link
2. Open in new tab/incognito
3. Enter your name
4. Join interview
5. **Expected**: Interview loads with questions

## MongoDB Verification

### Check Users Collection

```javascript
// In MongoDB Compass or Atlas
use voicevue
db.users.find()
```

You should see:

```javascript
{
  _id: ObjectId("..."),
  name: "Test User",
  email: "test@example.com",
  password: "$2a$10$..." // Hashed password
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

### Check Interviews Collection

```javascript
db.interviews.find();
```

You should see:

```javascript
{
  _id: ObjectId("..."),
  interview_id: "uuid-here",
  userId: "user-id-here",
  userEmail: "test@example.com",
  jobPosition: "...",
  jobDescription: "...",
  duration: "...",
  type: "...",
  questionList: [
    { question: "...", type: "General" }
  ],
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

## API Testing with Postman/Thunder Client

### 1. Register User

```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "API Test User",
  "email": "apitest@example.com",
  "password": "test123456"
}
```

**Expected Response:**

```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "API Test User",
    "email": "apitest@example.com"
  }
}
```

### 2. Login

```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "apitest@example.com",
  "password": "test123456"
}
```

**Expected Response:**

```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "API Test User",
    "email": "apitest@example.com",
    "picture": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Note**: Cookie `token` should be set automatically

### 3. Get Current User

```http
GET http://localhost:3000/api/auth/me
Cookie: token=<token-from-login>
```

**Expected Response:**

```json
{
  "user": {
    "id": "...",
    "name": "API Test User",
    "email": "apitest@example.com",
    "picture": null
  }
}
```

### 4. Create Interview (Requires Auth)

```http
POST http://localhost:3000/api/interviews
Content-Type: application/json
Cookie: token=<token-from-login>

{
  "interview_id": "test-uuid-123",
  "jobPosition": "Software Engineer",
  "jobDescription": "Full stack developer role",
  "duration": "30 minutes",
  "type": "Technical",
  "questionList": [
    { "question": "What is React?", "type": "General" },
    { "question": "Explain closures in JavaScript", "type": "Technical" }
  ]
}
```

**Expected Response:**

```json
{
  "success": true,
  "interview": {
    "id": "...",
    "interview_id": "test-uuid-123"
  }
}
```

### 5. Get Interview

```http
GET http://localhost:3000/api/interviews/test-uuid-123
```

**Expected Response:**

```json
{
  "success": true,
  "interview": {
    "_id": "...",
    "interview_id": "test-uuid-123",
    "jobPosition": "Software Engineer",
    "jobDescription": "Full stack developer role",
    "duration": "30 minutes",
    "type": "Technical",
    "questionList": [...]
  }
}
```

## Common Issues & Solutions

### Issue: "Unauthorized" error

**Solution**: Make sure you're logged in and the cookie is being sent with requests

### Issue: "Validation failed" error

**Solution**: Check that all required fields are provided and match the Zod schema

### Issue: MongoDB connection error

**Solution**:

1. Check `.env` has correct `MONGODB_URI`
2. Verify IP whitelist in MongoDB Atlas
3. Check database user credentials

### Issue: JWT verification failed

**Solution**:

1. Make sure `JWT_SECRET` is set in `.env`
2. Clear browser cookies
3. Login again

### Issue: Password doesn't work

**Solution**: Passwords are case-sensitive. Make sure you're entering the exact password used during registration.

## Browser DevTools Checks

### Check Cookies

1. Open DevTools (F12)
2. Go to Application > Cookies
3. Look for `token` cookie
4. Should be HTTP-only and Secure (in production)

### Check Network Requests

1. Open DevTools > Network
2. Filter by "Fetch/XHR"
3. Check requests to `/api/auth/*` and `/api/interviews/*`
4. Verify status codes (200, 201, 401, etc.)

### Check Console

1. Open DevTools > Console
2. Look for any error messages
3. Check authentication flow logs

## Success Criteria

✅ Can register new users
✅ Can login with email/password
✅ Can logout
✅ Protected routes redirect to `/auth`
✅ Can create interviews (saved to MongoDB)
✅ Can view interviews
✅ JWT tokens work correctly
✅ Passwords are hashed in database
✅ HTTP-only cookies are set

---

**If all tests pass, your migration is complete!** 🎉
