import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  fullName: {
    type: String,
    required: [true, 'Please fill in your fullname '],
  },
  email: {
    type: String,
    required: [true, 'Please fill in your email'],
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please fill in your phone number'],
    unique: true,
  },
  address: {
    type: String,
    required: [true, 'Please fill in your address'],
    minlength: [5, 'Please fill in your address with at least 10 characters'],
    maxlength: [200, 'Please fill in s no more 200 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please fill in your password'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  images: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'boss'],
    default: 'user',
  },
  likedProduct: [
    {
      _id: false,
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      size: {
        type: String,
      },
      color: {
        type: String,
      },
    },
  ],
});

export default mongoose.model('User', UserSchema);
