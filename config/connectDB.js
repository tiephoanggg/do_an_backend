import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const condb = await mongoose.connect('mongodb://127.0.0.1:27017/caniva', {
      /* useNewUrlParser: true,
      useUnifiedTopology: true, */
    });
    console.log('Connect to MongoDB successfully');
  } catch (error) {
    console.log(`Errorxxxx : ${error.message}`);
    process.exit(1);
  }
};
