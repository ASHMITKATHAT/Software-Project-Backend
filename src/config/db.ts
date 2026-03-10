import mongoose from 'mongoose';

const DB_PREFIX = '7b83_';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/softwareProjectDB');
    console.log('MongoDB Connected...');
    console.log(`Database prefix: ${DB_PREFIX}`);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
// Added connection retry logic
