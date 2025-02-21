import mongoose from 'mongoose';

const personalDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('PersonalDetails', personalDetailsSchema);