import Skill from '../models/Skill.js';

// Get all skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ level: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new skill
export const createSkill = async (req, res) => {
  const skill = new Skill(req.body);
  try {
    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};