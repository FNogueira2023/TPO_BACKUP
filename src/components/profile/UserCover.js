import React, { useEffect, useState } from 'react';
import './UserCover.css';
import UpdateUserForm from './UpdateUserForm'; // Adjust the path if needed
import image from '../../images/default_user.jpg';

const UserCover = ({ profile}) => {
  const [imageUrl, setImageUrl] = useState(image);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const birthDate = profile.birthDate ? new Date(profile.birthDate).toISOString().split('T')[0] : 'Date not available';

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="cover-container">
      <div className="image-container">
        <img src={imageUrl} alt="User Logo" className="profile-image" />
        <div className="button-container">
          <label htmlFor="logo-upload" className="upload-button">
            <svg
              viewBox="0 0 24 24"
              className="camera-icon"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <input
              id="logo-upload"
              type="file"
              className="hidden-input"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      <div className="text-container">
        <h1 className="title">{profile.name}</h1>
        {profile.userType === 'customer' ? (
          <>
            <p className="description">Birth date: {birthDate}</p>
            <p className="description">Email: {profile.email}</p>
          </>
        ) : profile.userType === 'company' ? (
          <p className="description">{profile.bio}</p>
        ) : null}
        <button onClick={toggleModal} className="edit-profile-button">
          Edit Profile
        </button>
      </div>

      {isModalOpen && <UpdateUserForm onClose={toggleModal}/>}
    </div>
  );
};

export default UserCover;
