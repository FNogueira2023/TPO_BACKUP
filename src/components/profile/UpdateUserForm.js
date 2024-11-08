import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateUserForm.css';
import { useUser } from '../../userContext';

const UpdateUserForm = ({ onClose, fetchProfile }) => {
  const { user } = useUser();
  // Initialize form state with user data
  const [formData, setFormData] = useState({
    name: user.user.name || '',
    lastName: user.user.lastName || '',
    email: user.user.email || '',
    bio: user.user.bio || '',
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to update user by making an API call
  const updateUser = async () => {
    setIsSubmitting(true);

    try {
      // Sending the PUT request to the backend API with JSON body
      const response = await axios.put(
        `http://127.0.0.1:3001/users/update/${user.user.id}`,
        formData, // directly send the form data as JSON
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json', // Use JSON instead of multipart/form-data
          },
        }
      );

      setMessage(response.data.message || 'User updated successfully!');
          fetchProfile();
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Failed to update user information.');
    } finally {
      setIsSubmitting(false);
    }
  };


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
    // fetchProfile();
  };

  useEffect(() => {
    // Reset form data when user changes (optional, if dynamic user updates are needed)
    setFormData({
      name: user.user.name || '',
      lastName: user.user.lastName || '',
      email: user.user.email || '',
      bio: user.user.bio || '',
    });
  }, [user]);

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="update-user-form-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Update User Information</h2>
        <form onSubmit={handleSubmit} className="update-user-form">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly // Email is usually not updatable
            />
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default UpdateUserForm;
