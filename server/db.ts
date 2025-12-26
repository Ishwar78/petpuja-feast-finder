import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://sharmaishwar970:ISHWAR123@cluster0.b73q6ph.mongodb.net/petpuja';

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('MongoDB connected successfully');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export default mongoose;
