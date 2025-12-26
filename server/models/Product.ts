import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
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
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    id: { type: String, required: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ['veg', 'non-veg', 'fast-food', 'drinks', 'combos'],
      required: true,
    },
    isVeg: { type: Boolean, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviews: { type: Number, required: true, default: 0 },
    popular: { type: Boolean, default: false },
    spicy: { type: String, enum: ['mild', 'medium', 'hot'] },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
