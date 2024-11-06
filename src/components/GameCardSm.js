import React from 'react';
import './GameCardSm.css';


const GameCardSm = ({ title, price, rating,
  onAddToCart, onRemoveFromCart, isInCart, game }) => {

    const gameImage = game ? `${process.env.PUBLIC_URL}/gameImages/${game.imageUrl}` : '';
  return (
    <div className="game-card-sm">
      <div className="game-card-sm__image-container">
        <img src={gameImage} alt={title} className="game-card-sm__image" />
      </div>
      <div className="game-card-sm__content">
        <h3 className="game-card-sm__title">{title}</h3>
        <div className="game-card-sm__footer">
          <div className="game-card-sm__price-rating">
            <span className="game-card-sm__price">${price.toFixed(2)}</span>
            <span className="game-card-sm__rating">/ {rating}</span>
          </div>
          <button
            className="game-card-sm__cart-button"
            onClick={() => isInCart ? onRemoveFromCart(game) : onAddToCart(game)}

          >
            {isInCart ? "Remove" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCardSm;