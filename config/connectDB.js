import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const condb = await mongoose.connect(process.env.MONGO_URI, {
      /* useNewUrlParser: true,
      useUnifiedTopology: true, */
    });
    console.log('Connect to MongoDB successfully');
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};
