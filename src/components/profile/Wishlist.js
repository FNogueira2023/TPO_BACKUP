import React from 'react';
import GameCardSm from '../GameCardSm';
import { useUser } from '../../userContext';
import './Wishlist.css';

const Wishlist = ({
  games,
  addToCart,
  removeFromCart,
  isInWishlist,
  isGameInCart,
}) => {
  const { user } = useUser();

  // Check if the user is a company
  const isCompany = user && user.user && user.user.userType === 'company';

  return (
    <div className="wishlist-container">
      {!isCompany ? (
        <div className="highlights">
          <h2 className="highlights__title">♡ Wishlist</h2>
          <div className="highlights__games">
            {games.filter(game => isInWishlist(game.id)).length === 0 ? (
              <h4 className="highlights__phrase">You have no wishlist items yet!</h4>
            ) : (
              games
                .filter(game => isInWishlist(game.id))
                .map(game => (
                  <GameCardSm
                    game={game}
                    key={game.id}
                    title={game.title}
                    image={game.image}
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
      ) : (
        null
      )}
    </div>
  );
};

export default Wishlist;
