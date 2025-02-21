import express from 'express';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import PersonalDetails from '../models/PersonalDetails.js';

const router = express.Router();

// Project routes
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/projects', async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Skill routes
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ level: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/skills', async (req, res) => {
  const skill = new Skill(req.body);
  try {
    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Personal Details routes
router.get('/personal-details', async (req, res) => {
  try {
    const details = await PersonalDetails.findOne();
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/personal-details', async (req, res) => {
  const details = new PersonalDetails(req.body);
  try {
    const newDetails = await details.save();
    res.status(201).json(newDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/personal-details', async (req, res) => {
  try {
    const details = await PersonalDetails.findOne();
    if (!details) {
      return res.status(404).json({ msg: 'Personal details not found' });
    }
    
    const updatedDetails = await PersonalDetails.findOneAndUpdate(
      {},
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedDetails);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

export default router;