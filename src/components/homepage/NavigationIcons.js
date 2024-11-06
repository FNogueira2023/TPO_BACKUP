import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavigationIcons.css';

import homeIcon from '../../images/icons/home.png';
import catalogIcon from '../../images/icons/catalog.png';
import purchasesIcon from '../../images/icons/shopping-bag.png';
import wishlistIcon from '../../images/icons/wishlist.png';
import cartIcon from '../../images/icons/shopping-cart.png';
import { useUser } from '../../userContext';

const NavigationIcons = () => {
  const location = useLocation();
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const { user } = useUser();

  const icons = [
    { name: 'Home', path: '/', icon: homeIcon },
    { name: 'Catalog', path: '/catalog', icon: catalogIcon },

    , ...(user?.user.userType === 'company' ? [
      { name: 'My sales', path: '/profile', icon: purchasesIcon },      
    ] : []), 

    ...(user?.user.userType === 'customer' ? [
      { name: 'Wishlist', path: '/profile', icon: wishlistIcon },
      { name: 'Cart', path: '/cart', icon: cartIcon },
      { name: 'Purchases', path: '/profile', icon: purchasesIcon },
    ] : []),
  ];

  return (
    <div className="navigationIcons-icons">
      {icons.map(({ name, path, icon }) => (
        <Link
          key={name}
          to={path}
          className={`navigationIcons-icon ${location.pathname === path ? 'active' : ''} ${hoveredIcon === name ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredIcon(name)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <img src={icon} alt={name} className="navigationIcons-icon" />
          <span className="navigationIcons-icon-label">{name}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavigationIcons;