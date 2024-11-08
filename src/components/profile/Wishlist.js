import React from 'react';
import GameCardSm from '../GameCardSm';
import { useUser } from '../../userContext';
import './Wishlist.css';

const Wishlist = ({
  games,
  addToCart,
  removeFromCart,
  isGameInCart,
  isInWishlist
}) => {
  const { user } = useUser();

  // Check if the user is a company
  const isCompany = user && user.user && user.user.userType === 'company';

  // Filter the games that are in the wishlist
  const wishlistGames = games.filter(game => isInWishlist(game.id)); 

  return (
    <div className="wishlist-container">
      {!isCompany ? (
        <div className="highlights">
          <h2 className="highlights__title">♡ Wishlist</h2>
          <div className="highlights__games">
            {wishlistGames.length === 0 ? (
              <h4 className="highlights__phrase">You have no wishlist items yet!</h4>
            ) : (
              wishlistGames.map(game => (
                <GameCardSm
                  game={game}
                  key={game.id}
                  title={game.name}            
                  price={game.price}
                  rating={game.rating}
                  onAddToCart={addToCart}
                  onRemoveFromCart={removeFromCart}
                  isInCart={isGameInCart(game.id)}
                />
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Wishlist;
