import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import PersonalDetails from './admin/PersonalDetails';
import Skills from './admin/Skills';
import Projects from './admin/Projects';

// Configure axios defaults
axios.defaults.withCredentials = true;

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
  const [projects, setProjects] = useState([]);
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

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalDetails personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} />;
      case 'skills':
        return <Skills skills={skills} setSkills={setSkills} />;
      case 'projects':
        return <Projects projects={projects} setProjects={setProjects} />;
      default:
        return <PersonalDetails personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <div className="md:w-64 bg-white rounded-lg shadow-lg p-4 h-fit">
            <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveSection('personal')}
                className={`w-full text-left px-4 py-2 rounded ${activeSection === 'personal' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
              >
                Personal Details
              </button>
              <button
                onClick={() => setActiveSection('skills')}
                className={`w-full text-left px-4 py-2 rounded ${activeSection === 'skills' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
              >
                Skills
              </button>
              <button
                onClick={() => setActiveSection('projects')}
                className={`w-full text-left px-4 py-2 rounded ${activeSection === 'projects' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
              >
                Projects
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;