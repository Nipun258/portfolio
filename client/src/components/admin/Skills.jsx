import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';

const Skills = ({ skills, setSkills }) => {
  const [newSkill, setNewSkill] = useState({ name: '', level: '' });
  const [editingSkill, setEditingSkill] = useState(null);

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
      const response = await axios.post('/api/skills', newSkill);
      setSkills([...skills, response.data]);
      setNewSkill({ name: '', level: '' });
      toast.success('Skill added successfully!');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error adding skill');
      console.error('Error adding skill:', error);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await axios.delete(`/api/skills/${skillId}`);
      setSkills(skills.filter(skill => skill._id !== skillId));
      toast.success('Skill deleted successfully!');
    } catch (error) {
      toast.error('Error deleting skill');
      console.error('Error deleting skill:', error);
    }
  };

  const handleEditSkill = async (e) => {
    e.preventDefault();
    if (!editingSkill) return;

    try {
      const response = await axios.put(`/api/skills/${editingSkill._id}`, {
        name: editingSkill.name,
        level: editingSkill.level
      });
      setSkills(skills.map(skill => 
        skill._id === editingSkill._id ? response.data : skill
      ));
      setEditingSkill(null);
      toast.success('Skill updated successfully!');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error updating skill');
      console.error('Error updating skill:', error);
    }
  };

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
};

Skills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired
    })
  ).isRequired,
  setSkills: PropTypes.func.isRequired
};

export default Skills;