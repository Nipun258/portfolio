import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: String, required: true },
  imageUrl: { type: String, required: true },
  liveUrl: { type: String, required: true },
  githubUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Project', projectSchema);