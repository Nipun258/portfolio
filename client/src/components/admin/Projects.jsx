import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';

const Projects = ({ projects, setProjects }) => {
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    imageUrl: '',
    liveUrl: '',
    githubUrl: ''
  });

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
      const response = await axios.post('/api/projects', newProject);
      setProjects([...projects, response.data]);
      setNewProject({
        title: '',
        description: '',
        technologies: '',
        imageUrl: '',
        liveUrl: '',
        githubUrl: ''
      });
      toast.success('Project added successfully!');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error adding project');
      console.error('Error adding project:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`/api/projects/${projectId}`);
      setProjects(projects.filter(project => project._id !== projectId));
      toast.success('Project deleted successfully!');
    } catch (error) {
      toast.error('Error deleting project');
      console.error('Error deleting project:', error);
    }
  };

  const handleEditProject = async (e) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const response = await axios.put(`/api/projects/${editingProject._id}`, editingProject);
      setProjects(projects.map(project => 
        project._id === editingProject._id ? response.data : project
      ));
      setEditingProject(null);
      toast.success('Project updated successfully!');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error updating project');
      console.error('Error updating project:', error);
    }
  };

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
            {project.imageUrl && (
              <figure className="relative pt-[56.25%]">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x450?text=No+Image';
                    e.target.onerror = null;
                  }}
                />
              </figure>
            )}
            {editingProject && editingProject._id === project._id ? (
              <div className="card-body">
                <form onSubmit={handleEditProject} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Project title"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="input input-bordered w-full"
                  />
                  <textarea
                    placeholder="Project description"
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="textarea textarea-bordered w-full h-32"
                  />
                  <input
                    type="text"
                    placeholder="Technologies (comma-separated)"
                    value={editingProject.technologies}
                    onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={editingProject.imageUrl}
                    onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    placeholder="Live URL"
                    value={editingProject.liveUrl}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    placeholder="GitHub URL"
                    value={editingProject.githubUrl}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="input input-bordered w-full"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="btn btn-primary btn-sm">Save</button>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="btn btn-ghost btn-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="card-body">
                <h3 className="card-title">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.split(',').map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      GitHub
                    </a>
                  )}
                  <button
                    onClick={() => setEditingProject(project)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      technologies: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      liveUrl: PropTypes.string.isRequired,
      githubUrl: PropTypes.string.isRequired
    })
  ).isRequired,
  setProjects: PropTypes.func.isRequired
};

export default Projects;