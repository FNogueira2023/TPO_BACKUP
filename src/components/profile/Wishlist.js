import React from 'react';
import GameCardSm from '../GameCardSm';
import './Wishlist.css';



const Wishlist = ({
  games,
  cart,
  addToCart,
  removeFromCart,
  isInWishlist,
  isGameInCart,
  cartItems,
}
) => {


  return (
    <div className="highlights">
      <h2 className="highlights__title">♡ Wishlist</h2>


      <div className="highlights__games">
        {games.filter(game => isInWishlist(game.id)).length === 0 ? (
          <h4 className="highlights__phrase">You have no wishlist Items yet!</h4> 
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
  );
};

export default Wishlist;