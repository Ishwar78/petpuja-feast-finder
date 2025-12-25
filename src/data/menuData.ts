export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'veg' | 'non-veg' | 'fast-food' | 'drinks' | 'combos';
  isVeg: boolean;
  rating: number;
  reviews: number;
  popular?: boolean;
  spicy?: 'mild' | 'medium' | 'hot';
}

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Butter Chicken',
    description: 'Tender chicken in rich, creamy tomato-butter sauce with aromatic spices',
    price: 320,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    category: 'non-veg',
    isVeg: false,
    rating: 4.8,
    reviews: 256,
    popular: true,
    spicy: 'mild'
  },
  {
    id: '2',
    name: 'Paneer Tikka Masala',
    description: 'Grilled cottage cheese cubes in spiced tomato gravy with bell peppers',
    price: 280,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    category: 'veg',
    isVeg: true,
    rating: 4.7,
    reviews: 189,
    popular: true,
    spicy: 'medium'
  },
  {
    id: '3',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice layered with tender chicken and fragrant spices',
    price: 350,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    category: 'non-veg',
    isVeg: false,
    rating: 4.9,
    reviews: 412,
    popular: true,
    spicy: 'medium'
  },
  {
    id: '4',
    name: 'Veg Biryani',
    description: 'Fragrant basmati rice with mixed vegetables and aromatic spices',
    price: 250,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop',
    category: 'veg',
    isVeg: true,
    rating: 4.5,
    reviews: 145,
    spicy: 'mild'
  },
  {
    id: '5',
    name: 'Crispy Burger',
    description: 'Juicy patty with fresh lettuce, tomatoes, and special sauce',
    price: 180,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'fast-food',
    isVeg: false,
    rating: 4.6,
    reviews: 298,
    popular: true
  },
  {
    id: '6',
    name: 'Cheese Pizza',
    description: 'Classic pizza with mozzarella cheese and italian herbs',
    price: 299,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    category: 'fast-food',
    isVeg: true,
    rating: 4.7,
    reviews: 367,
    popular: true
  },
  {
    id: '7',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato filling',
    price: 120,
    image: 'https://images.unsplash.com/photo-1668236543090-82eb5eaf701b?w=400&h=300&fit=crop',
    category: 'veg',
    isVeg: true,
    rating: 4.6,
    reviews: 234
  },
  {
    id: '8',
    name: 'Tandoori Chicken',
    description: 'Marinated chicken roasted in clay oven with indian spices',
    price: 380,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    category: 'non-veg',
    isVeg: false,
    rating: 4.8,
    reviews: 198,
    spicy: 'hot'
  },
  {
    id: '9',
    name: 'Mango Lassi',
    description: 'Refreshing yogurt drink blended with fresh mango pulp',
    price: 80,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=300&fit=crop',
    category: 'drinks',
    isVeg: true,
    rating: 4.9,
    reviews: 445,
    popular: true
  },
  {
    id: '10',
    name: 'Cold Coffee',
    description: 'Rich cold coffee blended with ice cream and chocolate',
    price: 120,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    category: 'drinks',
    isVeg: true,
    rating: 4.7,
    reviews: 312
  },
  {
    id: '11',
    name: 'Thali Combo',
    description: 'Complete meal with dal, sabzi, roti, rice, salad and dessert',
    price: 220,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    category: 'combos',
    isVeg: true,
    rating: 4.8,
    reviews: 567,
    popular: true
  },
  {
    id: '12',
    name: 'Non-Veg Thali',
    description: 'Complete meal with chicken curry, dal, roti, rice and raita',
    price: 320,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    category: 'combos',
    isVeg: false,
    rating: 4.7,
    reviews: 289
  },
  {
    id: '13',
    name: 'French Fries',
    description: 'Crispy golden fries with seasoning and dipping sauce',
    price: 99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    category: 'fast-food',
    isVeg: true,
    rating: 4.4,
    reviews: 456
  },
  {
    id: '14',
    name: 'Fresh Lime Soda',
    description: 'Refreshing lime drink with mint and soda water',
    price: 60,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&h=300&fit=crop',
    category: 'drinks',
    isVeg: true,
    rating: 4.5,
    reviews: 234
  },
  {
    id: '15',
    name: 'Family Combo',
    description: '2 Biryanis + 4 Rotis + Dal + Raita + 2 Cold Drinks',
    price: 699,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    category: 'combos',
    isVeg: false,
    rating: 4.9,
    reviews: 678,
    popular: true
  },
  {
    id: '16',
    name: 'Dal Makhani',
    description: 'Creamy black lentils slow-cooked with butter and cream',
    price: 180,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    category: 'veg',
    isVeg: true,
    rating: 4.6,
    reviews: 234,
    spicy: 'mild'
  }
];

export const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'veg', name: 'Veg', icon: '🥗' },
  { id: 'non-veg', name: 'Non-Veg', icon: '🍗' },
  { id: 'fast-food', name: 'Fast Food', icon: '🍔' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'combos', name: 'Combos', icon: '🍱' }
];

export const reviews = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Amazing food quality! The Butter Chicken was absolutely delicious. Will order again!',
    date: '2 days ago'
  },
  {
    id: '2',
    name: 'Rahul Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Fast delivery and hot food. The biryani was perfectly spiced. Highly recommended!',
    date: '1 week ago'
  },
  {
    id: '3',
    name: 'Anita Patel',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 4,
    comment: 'Great variety of options. Love the combo deals. Packaging was neat and clean.',
    date: '3 days ago'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Best food delivery service in town! Fresh ingredients and authentic taste.',
    date: '5 days ago'
  }
];
