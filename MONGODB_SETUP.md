# MongoDB Integration Setup Guide

## Overview
Your PetPuja food delivery app has been successfully migrated from Supabase to MongoDB! Here's what was changed and how to use it.

## What Was Changed

### ✅ Removed
- **Supabase** - Complete Supabase integration removed
  - Removed `@supabase/supabase-js` dependency
  - Deleted `supabase/` folder and configuration
  - Deleted `src/integrations/supabase/` folder

### ✅ Added
- **MongoDB** - Full MongoDB integration with Mongoose
  - Backend Express server with MongoDB connection
  - RESTful API endpoints for products and orders
  - Database models for Products, Orders, and Users
  - Frontend API client using Axios
  - Seed script to populate initial data

## File Structure

```
code/
├── server/
│   ├── index.ts          # Express server entry point
│   ├── db.ts             # MongoDB connection utility
│   ├── seed.ts           # Seed script for initial data
│   ├── api/
│   │   ├── products.ts   # Product routes (GET, POST, PUT, DELETE)
│   │   └── orders.ts     # Order routes (GET, POST, PATCH, DELETE)
│   └── models/
│       ├── Product.ts    # Product schema
│       ├── Order.ts      # Order schema
│       └── User.ts       # User schema
├── src/
│   ├── lib/
│   │   └── api.ts        # Frontend API client
│   └── pages/
│       └── Menu.tsx      # Updated to fetch from MongoDB
│   └── components/
│       └── FeaturedSection.tsx # Updated to fetch popular items
└── package.json          # Updated with new dependencies
```

## Environment Variables

The MongoDB connection string is already configured:
```
MONGO_URI="mongodb+srv://sharmaishwar970:ISHWAR123@cluster0.b73q6ph.mongodb.net/petpuja"
```

This is set in the environment and will be used by the backend server.

## Getting Started

### 1. Install Dependencies (Already Done)
```bash
npm install
```

This installs:
- `mongoose` - MongoDB ODM
- `express` - Backend framework
- `axios` - HTTP client for frontend
- `cors` - Cross-Origin Resource Sharing
- `tsx` - TypeScript executor for Node.js

### 2. Start the Backend Server

Open a new terminal and run:
```bash
npm run dev:server
```

The server will:
- Connect to MongoDB using the provided connection string
- Start listening on `http://localhost:5000`
- Expose API endpoints at `/api/products` and `/api/orders`

### 3. Start the Frontend Dev Server

The frontend is already configured with a Vite proxy that forwards `/api` requests to the backend server.

```bash
npm run dev
```

The frontend will:
- Start on `http://localhost:8080`
- Automatically proxy API requests to `http://localhost:5000`

### 4. Seed Initial Data

To populate MongoDB with the menu items, run:
```bash
npm run seed
```

This will insert all the food items into the MongoDB database.

## API Endpoints

### Products API

- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get product by ID
- **GET** `/api/products/category/:category` - Get products by category
- **POST** `/api/products` - Create new product (admin)
- **PUT** `/api/products/:id` - Update product (admin)
- **DELETE** `/api/products/:id` - Delete product (admin)

### Orders API

- **GET** `/api/orders` - Get all orders (admin)
- **GET** `/api/orders/:id` - Get order by ID
- **GET** `/api/orders/user/:userId` - Get user's orders
- **POST** `/api/orders` - Create new order
- **PATCH** `/api/orders/:id/status` - Update order status
- **PUT** `/api/orders/:id` - Update order details
- **DELETE** `/api/orders/:id` - Delete order

## Database Models

### Product
```typescript
{
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'veg' | 'non-veg' | 'fast-food' | 'drinks' | 'combos'
  isVeg: boolean
  rating: number
  reviews: number
  popular?: boolean
  spicy?: 'mild' | 'medium' | 'hot'
  createdAt: Date
  updatedAt: Date
}
```

### Order
```typescript
{
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled'
  deliveryAddress: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  notes?: string
  estimatedDeliveryTime?: Date
  createdAt: Date
  updatedAt: Date
}
```

### User
```typescript
{
  name: string
  email: string
  phone: string
  password?: string
  role: 'customer' | 'admin' | 'delivery'
  addresses: string[]
  favoriteItems: string[]
  loyaltyPoints: number
  createdAt: Date
  updatedAt: Date
}
```

## Frontend Integration

### Using the API Client

The `src/lib/api.ts` file provides convenient methods:

```typescript
import { productsAPI, ordersAPI } from '@/lib/api';

// Get all products
const response = await productsAPI.getAll();
const products = response.data;

// Get product by ID
const product = await productsAPI.getById('product-id');

// Create order
const order = await ordersAPI.create({
  userId: 'user-123',
  items: [...],
  totalAmount: 500,
  // ... other fields
});

// Update order status
await ordersAPI.updateStatus('order-id', 'delivered');
```

### Updated Components

The following components now fetch from MongoDB:
- **Menu.tsx** - Fetches all products with filtering and search
- **FeaturedSection.tsx** - Fetches popular products for homepage

## Development Workflow

### Run Both Frontend & Backend Simultaneously

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run dev:server
```

Both will run on their respective ports with hot-reload enabled.

### Production Build

```bash
npm run build
```

This builds the frontend. For production deployment, you'll need to:
1. Deploy the frontend (Vite build output)
2. Deploy the backend Express server
3. Ensure MongoDB connection string is configured

## Troubleshooting

### API Calls Failing
- Ensure backend server is running (`npm run dev:server`)
- Check that MongoDB URI is correct in environment
- Verify the Vite proxy is configured (it should forward `/api` to `http://localhost:5000`)

### Database Connection Issues
- Verify MONGO_URI is set correctly
- Check your MongoDB Atlas network access (IP whitelist)
- Ensure your MongoDB project is active

### Seed Script Issues
- Run `npm run seed` to populate initial data
- Ensure backend server is NOT running during seeding

## Next Steps

1. Customize the MongoDB models for your additional data needs
2. Add authentication middleware to your API routes
3. Implement admin dashboard using the admin products/orders endpoints
4. Add payment integration for order processing
5. Deploy to production (e.g., Vercel for frontend, Railway/Render for backend)

## Support

For issues or questions:
- Check MongoDB Atlas console for data
- Review server logs: `npm run dev:server`
- Check browser DevTools Network tab for API errors
