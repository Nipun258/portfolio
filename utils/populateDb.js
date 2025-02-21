import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { samplePersonalDetails, sampleSkills, sampleProjects } from './sampleData.js';
import PersonalDetails from '../models/PersonalDetails.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';

dotenv.config();

const populateDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      PersonalDetails.deleteMany({}),
      Skill.deleteMany({}),
      Project.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Insert new data
    await PersonalDetails.create(samplePersonalDetails);
    await Skill.insertMany(sampleSkills);
    await Project.insertMany(sampleProjects);

    console.log('Sample data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
};

populateDatabase();