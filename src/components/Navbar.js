import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import homeIcon from '../images/icons/home.png';
import cartIcon from '../images/icons/cart.png';
import fantasmita from '../images/default_user.jpg';

import { useUser } from '../userContext'; // Import User context

const Navbar = ({ openLoginModal, openRegisterModal }) => {
  const { user, logout } = useUser();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li>
            <Link to="/">
              {/* <img src={homeIcon} alt="Home" className="icon" /> */}
              Home
            </Link>
          </li>
          
          <li><Link to="/catalog">Catalog</Link></li>
          {user?.user.userType === 'company' && <li><Link to="/profile">My sales</Link></li>}
          {user?.user.userType === 'customer' && <li><Link to="/profile">Purchases</Link></li>}
          {user?.user.userType === 'customer' && <li><Link to="/profile">Wishlist</Link></li>}
        </ul>
        <div className="navbar-cart">
          <Link to="/cart">
            <img src={cartIcon} alt="Cart" className="icon" />
          </Link>
        </div>
        {/* Check if the user is logged in */}
        {user ? (
          <div className="navbar-auth">
            <div className="vertical-line"></div>
            {/* When logged in, show just the "Sign Out" button */}
            <button onClick={logout} className="logout-btn">
              Sign Out
            </button>
            <img
              src={user.avatar || fantasmita} // Fallback to a default avatar if user.avatar is not available
              alt="Avatar"
              className="avatar"
            />
          </div>
        ) : (
          <div className="navbar-auth">
            <div className="vertical-line"></div>
            <Link to="/register" className="register-btn" onClick={openRegisterModal}>Register</Link>
            <Link to="/login" className="login-btn" onClick={openLoginModal}>Log in</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;