import React from 'react';
import './GameCardSm.css';

const GameCardSm = ({ title, price, rating, onAddToCart, onRemoveFromCart, isInCart, game }) => {
  // Add defensive check for game and game.imageURL
  const gameImage = game && game.imageURL 
    ? `http://127.0.0.1:3001/gameImages/${game.imageURL}` 
    : 'http://127.0.0.1:3001/gameImages/default_ghost.jpg'; // Fallback/default image URL

  return (
    <div className="game-card-sm">
      <div className="game-card-sm__image-container">
        <img src={gameImage} alt={title || 'Game'} className="game-card-sm__image" />
      </div>
      <div className="game-card-sm__content">
        <h3 className="game-card-sm__title">{title || 'Unknown Title'}</h3>
        <div className="game-card-sm__footer">
          <div className="game-card-sm__price-rating">
            <span className="game-card-sm__price">${price ? price.toFixed(2) : 'N/A'}</span>
            <span className="game-card-sm__rating">/ {rating || 'N/A'}</span>
          </div>
          <button
            className="game-card-sm__cart-button"
            onClick={() => isInCart ? onRemoveFromCart(game) : onAddToCart(game)}
            disabled={!game} // Disable button if no game is provided
          >
            {isInCart ? "Remove" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCardSm;
