# 🚀 Admin Panel Setup - Quick Start

## Your Admin Credentials Are Ready!

✅ **Email:** `petpuja12@gmail.com`  
✅ **Password:** `petpuja1234567`

---

## Setup Steps (Run These Commands)

### Step 1: Seed the Database (Creates Admin User)
```bash
npm run seed
```
**Expected Output:**
```
✅ Admin user created: petpuja12@gmail.com
✅ Successfully inserted X products
```

### Step 2: Start Backend Server (New Terminal)
```bash
npm run dev:server
```
**Expected Output:**
```
Server running on port 5000
MongoDB connected successfully
```

### Step 3: Access Admin Panel
The frontend is already running on `http://localhost:8080`

**Navigate to:** `http://localhost:8080/admin`

**Login with:**
- Email: `petpuja12@gmail.com`
- Password: `petpuja1234567`

---

## What's Now Working

✅ Admin login page at `/admin`  
✅ JWT token-based authentication  
✅ Protected admin dashboard (`/admin/dashboard`)  
✅ Protected admin pages:
  - Products management (`/admin/products`)
  - Orders management (`/admin/orders`)
  - Categories (`/admin/categories`)
  - Settings (`/admin/settings`)
✅ Admin logout with user profile display  
✅ Session persistence (tokens saved to localStorage)  

---

## File Structure

```
Your app now has:

Frontend:
├── src/context/AdminAuthContext.tsx    # Authentication state management
├── src/components/ProtectedAdminRoute.tsx  # Route protection
├── src/pages/admin/AdminLogin.tsx      # Login page (updated)
└── src/components/admin/AdminLayout.tsx # Layout with user info (updated)

Backend:
├── server/api/auth.ts                  # Login & verify endpoints
├── server/models/User.ts               # Updated with password hashing
└── server/seed.ts                      # Updated to create admin

Documentation:
├── ADMIN_AUTH_SETUP.md                 # Full technical guide
└── ADMIN_SETUP_QUICK_START.md          # This file
```

---

## API Endpoints

```
POST /api/auth/login
  Request: { email: string, password: string }
  Response: { token: string, user: User }

POST /api/auth/verify
  Header: Authorization: Bearer <token>
  Response: { user: User }
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid email or password" | Run `npm run seed` first |
| Can't connect to backend | Make sure `npm run dev:server` is running |
| Token expired | Login again (tokens expire after 7 days) |
| Admin pages show login | Clear localStorage and login again |

---

## Next Steps

1. ✅ Run `npm run seed` 
2. ✅ Run `npm run dev:server` (in new terminal)
3. ✅ Login at `http://localhost:8080/admin`
4. 📝 Customize admin dashboard pages
5. 🔐 Change admin password for production
6. 🚀 Deploy to production with JWT_SECRET env var

---

## Security Notes

- Passwords are hashed with bcrypt
- Tokens expire after 7 days
- Admin pages are protected with authentication
- Tokens stored in localStorage (clear on logout)
- Change JWT_SECRET in production!

For complete documentation, see **ADMIN_AUTH_SETUP.md**
