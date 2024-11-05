import React, { useState } from 'react';
import './Register.css';

const RegistrationComponent = ({ isOpen, onClose, openLoginModal }) => {
  // State for form inputs
  const [activeForm, setActiveForm] = useState('user');
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: '',
    userType: '',
  });
  
  // State for error or success messages
  const [message, setMessage] = useState(null);

  if (!isOpen) return null;

  // Handle input change for user registration
  const handleUserInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit handler for user registration
  const handleUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:3001/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('User registration successful!');
        setUserData({ name: '', lastName: '', birthDate: '', email: '', password: '' }); // Reset form
      } else {
        setMessage(result.error || 'User registration failed');
      }
    } catch (error) {
      setMessage('Error occurred during user registration');
      console.log(error);  
    }
  };

  const handleLoginLinkClick = () => {
    onClose(); // Cierra el modal de registro
    openLoginModal(); // Abre el modal de login
  };

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="registrationContainer">
        <div
          className={`formSection ${activeForm === 'user' ? 'active' : 'inactiveUser'}`}
          onClick={() => {
            setActiveForm('user');
            setUserData((userData) => ({
              ...userData,
              userType: 'customer' 
            }));             
          }}
        >
          <h2 className="formTitle">User Sign Up</h2>
          <form className="form" onSubmit={handleUserSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userData.name}
              onChange={handleUserInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={userData.lastName}
              onChange={handleUserInputChange}
              required
            />
            <input
              type="date"
              name="birthDate"
              placeholder="Birth date"
              value={userData.birthDate}
              onChange={handleUserInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleUserInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleUserInputChange}
              required
            />
            <button type="submit" className="submitButton">Register</button>
            {message && <p className="message">{message}</p>}
            <a onClick={handleLoginLinkClick} href="#" className="loginLink">Log in</a>
          </form>
        </div>

        {/* Store registration section */}
        <div
          className={`formSection ${activeForm === 'store' ? 'activeStore' : 'inactiveStore'}`}
          onClick={() => {
            setActiveForm('store');
            setUserData((userData) => ({
              ...userData,
              userType: 'company' 
            }));             
          }}
        >
          <button className="close-btn" onClick={onClose}>×</button>

          <h2
            className="formTitle"
            style={{
              color: activeForm === 'store' ? '#1c0020' : '#cccccc',
              borderBottom: activeForm === 'store' ? '2px solid #1c0020' : '2px solid #cccccc'
            }}
          >
            Store Registration
          </h2>
          <form className="form" onSubmit={handleUserSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Store name"
              value={userData.name}
              onChange={handleUserInputChange}
              required
            />            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleUserInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleUserInputChange}
              required
            />
            <button type="submit" className="submitButton">Start selling!</button>
            {message && <p className="message">{message}</p>}
            <a onClick={handleLoginLinkClick} href="#" className="loginLink" style={{ color: '#1c0020', fontWeight: 'bold' }}>Log in</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationComponent;
