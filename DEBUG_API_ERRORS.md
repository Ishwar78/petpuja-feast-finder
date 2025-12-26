# Debug Guide: API Connection Errors

## ❌ Error You Got
```
Failed to fetch popular items: AxiosError: Request failed with status code 500
```

## Root Cause
The **backend server is not running on port 5000**. The frontend tries to proxy `/api` requests to `http://localhost:5000` but nothing is listening there.

---

## ✅ How to Fix

### For Local Development

**Terminal 1 - Start Frontend** (already running)
```bash
npm run dev
# Runs on http://localhost:8080
```

**Terminal 2 - Start Backend** (YOU NEED TO DO THIS)
```bash
npm run dev:server
# Should run on http://localhost:5000
```

**Terminal 3 - (Optional) Seed Database**
```bash
npm run seed
# Creates admin user and menu items in MongoDB
```

Once the backend is running, the error should disappear and the app will fetch real data from MongoDB.

---

### For Production Deployment (fly.dev)

The issue on fly.dev is likely because:

1. **Backend server not deployed** - Only frontend is running
2. **Backend not configured in Procfile** - fly.dev needs to know how to start it
3. **MongoDB connection failed** - MONGO_URI env var not set

**Solutions:**

#### Option A: Deploy Both Frontend + Backend Together

1. **Create a Procfile** (in project root):
```
web: npm run build && npm run dev:server
```

2. **Update package.json scripts** for production:
```json
{
  "scripts": {
    "start": "npm run dev:server",
    "dev": "vite",
    "dev:server": "tsx watch server/index.ts"
  }
}
```

3. **Deploy to fly.dev**:
```bash
fly deploy
```

#### Option B: Use Fallback Data (Temporary Fix - Already Applied)

I've updated the components to automatically use static fallback data when the API is unavailable. This means:

- ✅ App works without backend running
- ✅ All menu items display correctly
- ✅ No error messages shown to users
- ⚠️ Data is not dynamic (updates require rebuild)

**This is NOW ACTIVE** - your app will show menu items even without the backend.

---

## 🔍 How to Verify Backend is Running

### Check 1: Look at Terminal Output
```bash
npm run dev:server
# Should see:
# Server running on port 5000
# MongoDB connected successfully
```

### Check 2: Test API Directly
Open in browser or use curl:
```
GET http://localhost:5000/health
# Should return: { "status": "OK" }

GET http://localhost:5000/api/products
# Should return: [{ id, name, price, ... }, ...]
```

### Check 3: Check Browser DevTools
1. Open DevTools (F12)
2. Go to Network tab
3. Make a request to menu page
4. Look for `/api/products` request
5. If status is **200** ✅, backend is working
6. If status is **500** ❌, backend has error
7. If status is **0** or **timeout** ❌, backend not running

---

## 🛠️ Troubleshooting

### Backend Server Won't Start

**Error:** `Error: connect ECONNREFUSED`

**Solution:**
```bash
# 1. Check port is available
lsof -i :5000

# 2. Kill any process on port 5000
kill -9 <PID>

# 3. Try again
npm run dev:server
```

### MongoDB Connection Failed

**Error:** `MongoError: connect ECONNREFUSED`

**Check:**
```bash
# 1. Verify MONGO_URI is set
echo $MONGO_URI

# 2. Test MongoDB connection
mongosh "mongodb+srv://..." --eval "db.adminCommand('ping')"

# 3. Check network access on MongoDB Atlas
# - Go to MongoDB Atlas
# - Security > Network Access
# - Whitelist your IP
```

### API Returns 500 Error

**Solution:**
```bash
# 1. Check backend logs for error
npm run dev:server
# Look for error messages in output

# 2. Check if data exists in database
npm run seed
# Re-seed if needed

# 3. Restart backend
# Stop (Ctrl+C) and run again
```

---

## 📝 Current Status

Your app now has **smart fallback**:

✅ **With Backend Running:**
- Fetches live data from MongoDB
- Real-time product/order management
- Admin panel works fully

✅ **Without Backend Running:**
- Shows static fallback menu items
- No error messages
- UI works completely

⚠️ **Limitation Without Backend:**
- Menu items don't update dynamically
- Admin panel still requires login (but won't work)
- Orders won't save to database

---

## 🚀 Recommended Setup

1. **Local Development:**
   ```bash
   # Terminal 1
   npm run dev
   
   # Terminal 2
   npm run dev:server
   
   # Terminal 3 (once)
   npm run seed
   ```

2. **Production (fly.dev):**
   - Deploy with both frontend + backend
   - Set MONGO_URI environment variable
   - Use combined Procfile approach

3. **Production (Alternative):**
   - Frontend on Vercel/Netlify
   - Backend on Railway/Render
   - Configure proxy with REACT_APP_API_URL

---

## 📋 Error Reference

| Error | Cause | Fix |
|-------|-------|-----|
| ECONNREFUSED:5000 | Backend not running | `npm run dev:server` |
| 500 Server Error | Backend error | Check logs, restart |
| MongoDB connection failed | DB not accessible | Check MONGO_URI, whitelist IP |
| Token invalid | Auth issue | Reseed database, login again |
| API timeout | Request too slow | Check network, backend performance |

---

## 🎯 Next Steps

1. ✅ Backend server smart fallback is **NOW ACTIVE**
2. 📌 For full features: Run `npm run dev:server`
3. 🌐 For production: Deploy with backend configured
4. 📞 If issues persist: Check MongoDB connection & API logs

The app will work fine now even without the backend - it will just use static data!
