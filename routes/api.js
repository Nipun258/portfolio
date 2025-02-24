import express from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js';
import { getPersonalDetails, createPersonalDetails, updatePersonalDetails } from '../controllers/personalDetailsController.js';

const router = express.Router();

// Project routes
router.get('/projects', getProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Skill routes
router.get('/skills', getSkills);
router.post('/skills', createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

// Personal Details routes
router.get('/personal-details', getPersonalDetails);
router.post('/personal-details', createPersonalDetails);
router.put('/personal-details', updatePersonalDetails);

export default router;