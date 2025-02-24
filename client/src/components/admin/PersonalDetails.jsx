import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';

const PersonalDetails = ({ personalDetails, setPersonalDetails }) => {
  const validatePersonalDetails = () => {
    if (!personalDetails.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (personalDetails.name.trim().length < 2) {
      toast.error('Name must be at least 2 characters long');
      return false;
    }

    if (personalDetails.title && personalDetails.title.trim().length < 3) {
      toast.error('Title must be at least 3 characters long');
      return false;
    }

    if (!personalDetails.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(personalDetails.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (personalDetails.phone && !/^\+?[\d\s-()]+$/.test(personalDetails.phone)) {
      toast.error('Please enter a valid phone number');
      return false;
    }

    if (personalDetails.bio && personalDetails.bio.trim().length < 10) {
      toast.error('Bio must be at least 10 characters long');
      return false;
    }

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
};

PersonalDetails.propTypes = {
  personalDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string.isRequired,
    location: PropTypes.string,
    phone: PropTypes.string
  }).isRequired,
  setPersonalDetails: PropTypes.func.isRequired
};

export default PersonalDetails;