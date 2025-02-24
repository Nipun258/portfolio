import PersonalDetails from '../models/PersonalDetails.js';

// Get personal details
export const getPersonalDetails = async (req, res) => {
  try {
    const details = await PersonalDetails.findOne();
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create personal details
export const createPersonalDetails = async (req, res) => {
  const details = new PersonalDetails(req.body);
  try {
    const newDetails = await details.save();
    res.status(201).json(newDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update personal details
export const updatePersonalDetails = async (req, res) => {
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
};