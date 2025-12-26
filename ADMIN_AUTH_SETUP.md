# Admin Panel Authentication Setup Guide

## Overview
Your PetPuja admin panel now has full JWT-based authentication with MongoDB user management!

## What Was Added

### ✅ Backend Authentication
- **JWT Token-based Authentication** - Secure token generation and verification
- **Password Hashing** - Bcrypt for secure password storage
- **Auth API Routes** - `/api/auth/login` and `/api/auth/verify` endpoints
- **User Model** - Extended with password hashing and comparison methods
- **Admin User** - Pre-configured admin account created during seed

### ✅ Frontend Authentication
- **Admin Auth Context** - Global state management for admin authentication
- **Protected Routes** - All admin pages are protected and require login
- **Login Page** - Professional login UI with error handling
- **Session Persistence** - Auth tokens saved to localStorage
- **Auto-logout** - Logout with admin profile display

### ✅ Files Created/Modified

**Backend:**
- `server/models/User.ts` - Updated with password hashing
- `server/api/auth.ts` - New authentication API routes
- `server/index.ts` - Added auth routes to Express server
- `server/seed.ts` - Updated to create admin user

**Frontend:**
- `src/context/AdminAuthContext.tsx` - Authentication context
- `src/components/ProtectedAdminRoute.tsx` - Route protection
- `src/pages/admin/AdminLogin.tsx` - Updated with real auth
- `src/components/admin/AdminLayout.tsx` - Added user info & logout
- `src/App.tsx` - Added auth provider and protected routes

**Dependencies:**
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token handling
- `@types/bcryptjs` - TypeScript definitions
- `@types/jsonwebtoken` - TypeScript definitions

## Admin Credentials

**Email:** `petpuja12@gmail.com`  
**Password:** `petpuja1234567`

These credentials are set up in the database during the seed process.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed the Database (Creates Admin User)

**IMPORTANT:** Run this command BEFORE starting the backend server.

```bash
npm run seed
```

Output should show:
```
✅ Admin user created: petpuja12@gmail.com
✅ Successfully inserted X products
=== Seed Complete ===
Admin Email: petpuja12@gmail.com
Admin Password: petpuja1234567
===================
```

### 3. Start the Backend Server
```bash
npm run dev:server
```

Server should connect to MongoDB and listen on `http://localhost:5000`

### 4. Start the Frontend Dev Server (in another terminal)
```bash
npm run dev
```

Frontend will run on `http://localhost:8080` with API proxy configured

### 5. Access Admin Panel

- Navigate to: `http://localhost:8080/admin`
- Enter credentials:
  - Email: `petpuja12@gmail.com`
  - Password: `petpuja1234567`
- Click "Login to Dashboard"

## How Authentication Works

### Login Flow
1. **User enters credentials** on login page
2. **Frontend sends request** to `/api/auth/login`
3. **Backend verifies** email and password against MongoDB
4. **JWT token is generated** with user info
5. **Token stored** in localStorage (7-day expiration)
6. **User redirected** to admin dashboard

### Protected Route Flow
1. **User tries to access** `/admin/dashboard` or other admin pages
2. **ProtectedAdminRoute component checks** if user is authenticated
3. **If not authenticated**, user is redirected to login page
4. **If authenticated**, user can access the admin page

### Token Verification
- Tokens are verified automatically when checking authentication
- Expired tokens trigger logout and redirect to login
- Invalid tokens are rejected with 401 error

## API Endpoints

### Authentication Endpoints

**POST** `/api/auth/login`
```json
Request:
{
  "email": "petpuja12@gmail.com",
  "password": "petpuja1234567"
}

Response (Success):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "PetPuja Admin",
    "email": "petpuja12@gmail.com",
    "role": "admin"
  }
}

Response (Error):
{
  "error": "Invalid email or password"
}
```

**POST** `/api/auth/verify`
```
Headers:
Authorization: Bearer <token>

Response (Success):
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "PetPuja Admin",
    "email": "petpuja12@gmail.com",
    "role": "admin"
  }
}

Response (Error):
{
  "error": "Invalid token"
}
```

## Using Admin Auth in Components

### Access Auth Context
```typescript
import { useAdminAuth } from '@/context/AdminAuthContext';

function MyComponent() {
  const { user, token, isAuthenticated, login, logout } = useAdminAuth();
  
  return (
    <div>
      {isAuthenticated && <p>Logged in as {user?.name}</p>}
    </div>
  );
}
```

### Protected Routes
```typescript
<Route path="/admin/dashboard" element={
  <ProtectedAdminRoute>
    <AdminDashboard />
  </ProtectedAdminRoute>
} />
```

## Security Features

✅ **Password Hashing** - Bcrypt with salt rounds  
✅ **JWT Tokens** - Secure token-based authentication  
✅ **Token Expiration** - 7-day expiration  
✅ **Route Protection** - Admin pages require authentication  
✅ **Error Handling** - Generic error messages prevent user enumeration  
✅ **Session Persistence** - Tokens stored securely in localStorage  
✅ **Auto-logout** - Invalid tokens trigger automatic logout  

## Changing Admin Password

To change the admin password, you can:

1. **Create a password reset endpoint** (future enhancement)
2. **Direct database update** (for development):
   ```javascript
   const user = await User.findOne({ email: 'petpuja12@gmail.com' });
   user.password = 'newpassword123';
   await user.save(); // Password gets hashed automatically
   ```

## Troubleshooting

### "Invalid email or password" Error
- Verify admin was created with `npm run seed`
- Check MongoDB connection is working
- Ensure backend server is running on port 5000

### Token Expired Error
- Tokens expire after 7 days
- User needs to login again
- Tokens are automatically removed from localStorage

### "Not authorized as admin" Error
- Only users with `role: 'admin'` can login to admin panel
- Check the user's role in MongoDB

### Can't Access Admin Dashboard
- Ensure you're logged in (check browser DevTools > Application > localStorage)
- Check that backend server is running
- Verify `/admin/login` is working first

## Production Considerations

Before deploying to production:

1. **Change JWT_SECRET** - Set `JWT_SECRET` environment variable
   ```bash
   export JWT_SECRET="your-super-secret-key-here"
   ```

2. **Change Admin Password** - Update password in production
   ```bash
   # Update directly in production database
   ```

3. **Enable HTTPS** - All auth requests should be over HTTPS

4. **Set Secure Cookies** - If using cookies instead of localStorage

5. **Add Rate Limiting** - Prevent brute force attacks on login endpoint

6. **Add Audit Logging** - Log all admin actions

7. **Enable CORS Properly** - Restrict CORS to your domain

## Testing Authentication

### Using cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"petpuja12@gmail.com","password":"petpuja1234567"}'

# Verify Token
curl -X POST http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Browser DevTools
1. Open DevTools (F12)
2. Go to Application > LocalStorage
3. Look for `adminToken` and `adminUser` keys
4. Verify token structure in Network tab requests

## Next Steps

1. ✅ Run `npm run seed` to create admin user
2. ✅ Start backend server: `npm run dev:server`
3. ✅ Start frontend: `npm run dev`
4. ✅ Login at `/admin` with credentials
5. ✅ Implement admin functionality (products, orders management)
6. ✅ Add more admin users if needed
7. ✅ Set up password reset flow
8. ✅ Deploy to production with proper security

## Support

For issues:
- Check backend logs: `npm run dev:server`
- Check browser console for frontend errors
- Verify MongoDB connection in backend logs
- Ensure all dependencies are installed: `npm install`
