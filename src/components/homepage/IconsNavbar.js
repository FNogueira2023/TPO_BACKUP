import React from 'react';
import { FaHome, FaFileAlt, FaShoppingBag, FaHeart, FaShoppingCart } from "react-icons/fa";
import './IconsNavbar.css';  // Ensure you create this file for styling
import { useUser } from '../../userContext'; // Import User context

const NavBar = () => {
  const { user, logout } = useUser();
  return (
    <nav className="iconsnavbar">
      <div className="nav-item">
        <FaHome className="icon" />
        <span className="active">Home</span>
      </div>
      <div className="nav-item">
        <FaFileAlt className="icon" />
        <span>Catalog</span>
      </div>
      <div className="nav-item">
        <FaShoppingBag className="icon" />
        <span>Purchases</span>
      </div>
      <div className="nav-item">
        <FaHeart className="icon" />
        <span>Wishlist</span>
      </div>
      <div className="nav-item">
        <FaShoppingCart className="icon" />
        <span>Cart</span>
      </div>
    </nav>
  );
};

export default NavBar;
