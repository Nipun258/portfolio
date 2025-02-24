import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// Configure axios defaults
axios.defaults.withCredentials = true;
// Remove baseURL since we're using Vite's proxy
// axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminPanel = () => {
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    location: '',
    phone: ''
  });

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', level: '' });
  const [editingSkill, setEditingSkill] = useState(null);

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    imageUrl: '',
    liveUrl: '',
    githubUrl: ''
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [detailsRes, skillsRes, projectsRes] = await Promise.all([
        axios.get('/api/personal-details'),
        axios.get('/api/skills'),
        axios.get('/api/projects')
      ]);

      setPersonalDetails(detailsRes.data);
      setSkills(skillsRes.data);
      setProjects(projectsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const validatePersonalDetails = () => {
    // Validate name
    if (!personalDetails.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (personalDetails.name.trim().length < 2) {
      toast.error('Name must be at least 2 characters long');
      return false;
    }

    // Validate title
    if (personalDetails.title && personalDetails.title.trim().length < 3) {
      toast.error('Title must be at least 3 characters long');
      return false;
    }

    // Validate email
    if (!personalDetails.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(personalDetails.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Validate phone
    if (personalDetails.phone && !/^\+?[\d\s-()]+$/.test(personalDetails.phone)) {
      toast.error('Please enter a valid phone number');
      return false;
    }

    // Validate bio
    if (personalDetails.bio && personalDetails.bio.trim().length < 10) {
      toast.error('Bio must be at least 10 characters long');
      return false;
    }

    // Validate location
    if (personalDetails.location && personalDetails.location.trim().length < 2) {
      toast.error('Location must be at least 2 characters long');
      return false;
    }

    return true;
  };

  const handlePersonalDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!validatePersonalDetails()) return;

    try {
      const response = await axios.put('/api/personal-details', personalDetails);
      if (response.data) {
        setPersonalDetails(response.data);
        toast.success('Personal details updated successfully!');
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Error updating personal details';
      toast.error(errorMessage);
      console.error('Error updating personal details:', error);
    }
  };

  const validateSkill = () => {
    if (!newSkill.name.trim()) {
      toast.error('Skill name is required');
      return false;
    }
    if (!newSkill.level.trim()) {
      toast.error('Skill level is required');
      return false;
    }
    const level = parseInt(newSkill.level);
    if (isNaN(level) || level < 0 || level > 100) {
      toast.error('Skill level must be a number between 0 and 100');
      return false;
    }
    return true;
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!validateSkill()) return;

    try {
      await axios.post('/api/skills', newSkill);
      setNewSkill({ name: '', level: '' });
      toast.success('Skill added successfully!');
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error adding skill');
      console.error('Error adding skill:', error);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await axios.delete(`/api/skills/${skillId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const handleEditSkill = async (e) => {
    e.preventDefault();
    if (!editingSkill) return;

    try {
      await axios.put(`/api/skills/${editingSkill._id}`, {
        name: editingSkill.name,
        level: editingSkill.level
      });
      setEditingSkill(null);
      toast.success('Skill updated successfully!');
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error updating skill');
      console.error('Error updating skill:', error);
    }
  };

  const validateProject = () => {
    if (!newProject.title.trim()) {
      toast.error('Project title is required');
      return false;
    }
    if (!newProject.description.trim()) {
      toast.error('Project description is required');
      return false;
    }
    if (!newProject.technologies.trim()) {
      toast.error('Technologies are required');
      return false;
    }
    if (newProject.imageUrl && !/^https?:\/\/.+/.test(newProject.imageUrl)) {
      toast.error('Please enter a valid image URL');
      return false;
    }
    if (newProject.liveUrl && !/^https?:\/\/.+/.test(newProject.liveUrl)) {
      toast.error('Please enter a valid live demo URL');
      return false;
    }
    if (newProject.githubUrl && !/^https?:\/\/(www\.)?github\.com\/.+/.test(newProject.githubUrl)) {
      toast.error('Please enter a valid GitHub URL');
      return false;
    }
    return true;
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!validateProject()) return;

    try {
      await axios.post('/api/projects', newProject);
      setNewProject({
        title: '',
        description: '',
        technologies: '',
        imageUrl: '',
        liveUrl: '',
        githubUrl: ''
      });
      toast.success('Project added successfully!');
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error adding project');
      console.error('Error adding project:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`/api/projects/${projectId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
            <form onSubmit={handlePersonalDetailsSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={personalDetails.name}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={personalDetails.title}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, title: e.target.value })}
                  className="input input-bordered w-full"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={personalDetails.email}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={personalDetails.location}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, location: e.target.value })}
                  className="input input-bordered w-full"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={personalDetails.phone}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                  className="input input-bordered w-full"
                />
              </div>
              <textarea
                placeholder="Bio"
                value={personalDetails.bio}
                onChange={(e) => setPersonalDetails({ ...personalDetails, bio: e.target.value })}
                className="textarea textarea-bordered w-full h-32"
              />
              <button type="submit" className="btn btn-primary">Update Personal Details</button>
            </form>
          </section>
        );
      case 'skills':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <form onSubmit={handleAddSkill} className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Skill name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Skill level (0-100)"
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn btn-primary">Add Skill</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill._id} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    {editingSkill && editingSkill._id === skill._id ? (
                      <form onSubmit={handleEditSkill} className="space-y-2">
                        <input
                          type="text"
                          value={editingSkill.name}
                          onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          className="input input-bordered w-full"
                        />
                        <input
                          type="text"
                          value={editingSkill.level}
                          onChange={(e) => setEditingSkill({ ...editingSkill, level: e.target.value })}
                          className="input input-bordered w-full"
                        />
                        <div className="flex gap-2">
                          <button type="submit" className="btn btn-primary btn-sm">Save</button>
                          <button
                            type="button"
                            onClick={() => setEditingSkill(null)}
                            className="btn btn-ghost btn-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <h3 className="card-title">{skill.name}</h3>
                        <p>Level: {skill.level}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingSkill(skill)}
                            className="btn btn-primary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill._id)}
                            className="btn btn-error btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'projects':
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <form onSubmit={handleAddProject} className="space-y-4 mb-8">
              <input
                type="text"
                placeholder="Project title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Project description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="textarea textarea-bordered w-full h-32"
              />
              <input
                type="text"
                placeholder="Technologies (comma-separated)"
                value={newProject.technologies}
                onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newProject.imageUrl}
                onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Live URL"
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="GitHub URL"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn btn-primary">Add Project</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="card bg-base-100 shadow-xl">
                  <figure><img src={project.imageUrl} alt={project.title} /></figure>
                  <div className="card-body">
                    <h3 className="card-title">{project.title}</h3>
                    <p>{project.description}</p>
                    <p className="text-sm">Technologies: {project.technologies}</p>
                    <div className="card-actions justify-end">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Live Demo</a>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">GitHub</a>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Sidebar */}
      <aside className={`w-64 bg-black text-white shadow-lg transform transition-transform duration-300 fixed h-full z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6 text-white">Admin Dashboard</h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection('personal')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'personal' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
            >
              Personal Details
            </button>
            <button
              onClick={() => setActiveSection('skills')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'skills' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveSection('projects')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'projects' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
            >
              Projects
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:ml-64">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Content */}
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPanel;