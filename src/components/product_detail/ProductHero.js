import React from 'react';
import './ProductHero.css';
import { BsCart4 } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useUser } from '../../userContext';

const ProductHero = ({
    game,
    onAddToCart,
    onRemoveFromCart,
    onAddToWishlist,
    onRemoveFromWishlist,
    isInCart,
    isFavorite
}) => {
    const { user } = useUser();
    const gameImage = `http://127.0.0.1:3001/gameImages/${game.imageURL}`;

    return (
        <div className="product-hero">
            <img className="product-hero-image" src={gameImage} alt={game.name} />
            <div className="product-hero-content">
                <h1 className="product-title">{game.name}</h1>
                <p className="product-description">{game.description}</p>
                <div className="price-section">
                    <span className="price">${game.price.toFixed(2)}</span>

                    {/* Conditionally render hero buttons */}
                    {user?.user?.userType !== 'company' && (
                        <div className="hero-buttons">
                            <button
                                className="btn btn-primary"
                                onClick={() => isInCart ? onRemoveFromCart(game) : onAddToCart(game)}
                            >
                                {isInCart ? "Remove" : "Add"} <BsCart4 className="icon-right" />
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={() => isFavorite ? onRemoveFromWishlist(game) : onAddToWishlist(game)}
                                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                                {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductHero;
