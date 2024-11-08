import React, { useState } from 'react';
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { useUser } from '../userContext';
import { useNavigate } from 'react-router-dom';
import './Game.css';

const GameChart = ({
  game,
  variant,
  onSettingsClick,
  isFavorite,
  onAddToCart,
  onRemoveFromCart,
  isInCart,
  onAddToWishlist,
  onRemoveFromWishlist,
}) => {
  const [imageError, setImageError] = useState(false);
  const { user } = useUser();
  const dateStr = game?.createdAt;
  const date = new Date(dateStr);
  const formattedDate = isNaN(date.getTime()) ? 'Invalid date' : date.toISOString().split('T')[0];
  const navigate = useNavigate();

  // Construct the correct image URL with a fallback for missing `game` or `game.imageURL`
  const gameImage = game && game.imageURL
    ? `http://127.0.0.1:3001/gameImages/${game.imageURL}`
    : 'http://127.0.0.1:3001/defaultImage.jpg'; // Fallback/default image URL

  const handleImageClick = () => {
    if (game?.id) {
      navigate(`/product/${game.id}`);
    }
  };

  const handleImageError = () => {
    setImageError(true); // If there's an error, set imageError to true
  };

  const renderButtons = () => {
    if (variant === 'catalog') {
      return (
        user?.user.userType !== 'company' && (
          <button
            className="button"
            onClick={() => isInCart ? onRemoveFromCart(game) : onAddToCart(game)}
            disabled={!game} // Disable button if no `game` data is provided
          >
            {isInCart ? "Remove" : "Add"} <BsCart4 className="icon-right" />
          </button>
        )
      );
    } else if (variant === 'profile') {
      return (
        <button className="button">
          Rate! <AiFillStar className="icon-right" />
        </button>
      );
    } else if (variant === 'store') {
      return null;
    } else if (variant === 'cart') {
      return (
        <div className="button-group">
          <button
            className="button"
            onClick={() => onRemoveFromCart(game)}
            disabled={!game}
          >
            Remove <BsCart4 className="icon-right" />
          </button>
          <button
            className="favorite-button"
            onClick={() => isFavorite ? onRemoveFromWishlist(game) : onAddToWishlist(game)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>
      );
    }
  };

  return (
    <div className={`game-container ${variant === 'store' ? 'store-variant' : ''}`}>
      {variant === 'store' && (
        <button
          className="settings-button"
          onClick={onSettingsClick}
          aria-label="Settings"
        >
          <FiSettings />
        </button>
      )}

      <div className="image-container">
      <img
    src={imageError ? 'http://127.0.0.1:3001/defaultImage.jpg' : gameImage} // Fallback to default image if there's an error
    alt={game?.name || 'Game'}  // Provide alt text for accessibility
    className="game-image"
    onClick={handleImageClick}
    onError={handleImageError} // Set error handler on image load
  />

      </div>

      <div className="details-container">
        <h2 className="game-title">{game?.name || 'Unknown Game'}</h2>
        <p className="release-info">
          {formattedDate}
        </p>

        <div className="rating-container">
          <div className="stars-container">
            {Array.from({ length: game?.rating || 0 }, (_, index) => (
              <span key={index} className="star">⭐</span>
            ))}
          </div>
          <div className="price-container">
            <span className="price">
              {game?.price === 0 ? "Free" : `$${game?.price || 'N/A'}`}
            </span>
          </div>
        </div>

        <div className="platforms-container">
          <div className="platform-icons">
            {game?.os?.isApple && <FaApple className="platform-icon" />}
            {game?.os?.isMicrosoft && <FaWindows className="platform-icon" />}
            {game?.os?.isLinux && <FaLinux className="platform-icon" />}
          </div>
          {renderButtons()}
        </div>
      </div>
    </div>
  );
};

export default GameChart;
