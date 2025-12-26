import { connectDB } from './db';
import { Product } from './models/Product';
import { User } from './models/User';
import mongoose from 'mongoose';

const adminUser = {
  name: 'PetPuja Admin',
  email: 'petpuja12@gmail.com',
  phone: '9999999999',
  password: 'petpuja1234567',
  role: 'admin' as const,
  addresses: [],
  favoriteItems: [],
  loyaltyPoints: 0,
};

const menuItems = [
  {
    name: 'Butter Chicken',
    description: 'Tender chicken in rich, creamy tomato-butter sauce with aromatic spices',
    price: 320,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    category: 'non-veg' as const,
    isVeg: false,
    rating: 4.8,
    reviews: 256,
    popular: true,
    spicy: 'mild' as const,
  },
  {
    name: 'Paneer Tikka Masala',
    description: 'Grilled cottage cheese cubes in spiced tomato gravy with bell peppers',
    price: 280,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    category: 'veg' as const,
    isVeg: true,
    rating: 4.7,
    reviews: 189,
    popular: true,
    spicy: 'medium' as const,
  },
  {
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice layered with tender chicken and fragrant spices',
    price: 350,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    category: 'non-veg' as const,
    isVeg: false,
    rating: 4.9,
    reviews: 412,
    popular: true,
    spicy: 'medium' as const,
  },
  {
    name: 'Veg Biryani',
    description: 'Fragrant basmati rice with mixed vegetables and aromatic spices',
    price: 250,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop',
    category: 'veg' as const,
    isVeg: true,
    rating: 4.5,
    reviews: 145,
    spicy: 'mild' as const,
  },
  {
    name: 'Crispy Burger',
    description: 'Juicy patty with fresh lettuce, tomatoes, and special sauce',
    price: 180,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'fast-food' as const,
    isVeg: false,
    rating: 4.6,
    reviews: 298,
    popular: true,
  },
  {
    name: 'Cheese Pizza',
    description: 'Classic pizza with mozzarella cheese and italian herbs',
    price: 299,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    category: 'fast-food' as const,
    isVeg: true,
    rating: 4.7,
    reviews: 367,
    popular: true,
  },
  {
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato filling',
    price: 120,
    image: 'https://images.unsplash.com/photo-1668236543090-82eb5eaf701b?w=400&h=300&fit=crop',
    category: 'veg' as const,
    isVeg: true,
    rating: 4.6,
    reviews: 234,
  },
];

async function seed() {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({ role: 'admin' });
    console.log('Cleared existing products and admin users');

    // Create admin user
    const existingAdmin = await User.findOne({ email: adminUser.email });
    if (!existingAdmin) {
      const admin = new User(adminUser);
      await admin.save();
      console.log(`✅ Admin user created: ${adminUser.email}`);
    } else {
      console.log(`✓ Admin user already exists: ${adminUser.email}`);
    }

    // Insert menu items
    const insertedProducts = await Product.insertMany(menuItems);
    console.log(`✅ Successfully inserted ${insertedProducts.length} products`);

    console.log('\n=== Seed Complete ===');
    console.log(`Admin Email: ${adminUser.email}`);
    console.log(`Admin Password: ${adminUser.password}`);
    console.log('===================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
