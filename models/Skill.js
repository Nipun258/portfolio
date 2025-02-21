import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

skillSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Skill', skillSchema);