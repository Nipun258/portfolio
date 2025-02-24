import express from 'express';
import { getProjects, createProject } from '../controllers/projectController.js';
import { getSkills, createSkill } from '../controllers/skillController.js';
import { getPersonalDetails, createPersonalDetails, updatePersonalDetails } from '../controllers/personalDetailsController.js';

const router = express.Router();

// Project routes
router.get('/projects', getProjects);
router.post('/projects', createProject);

// Skill routes
router.get('/skills', getSkills);
router.post('/skills', createSkill);

// Personal Details routes
router.get('/personal-details', getPersonalDetails);
router.post('/personal-details', createPersonalDetails);
router.put('/personal-details', updatePersonalDetails);

export default router;