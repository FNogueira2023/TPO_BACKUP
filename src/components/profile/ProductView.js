import React from 'react';
import GameChart from '../Game';
import './ProductView.css';


const ProductView = ({
  profile,
  ordersGames,
  games,
  companyGames
}) => {


  // Helper function to check if a game is in orderGames
  const isInGameOrders = (gameId) => {
    return ordersGames.includes(gameId);
  };

  // Helper function to check if a game is in companyGames
  const isInGameCompany = (gameId) => {
    return companyGames.includes(gameId);
  };

  return (
    <div className="product-view">
      {profile.userType === 'customer' ? (
        <>
          {ordersGames.length === 0 ? (
            <h2 className="highlights__title">No Purchases Yet</h2>
          ) : (
            <h2 className="highlights__title">My Purchases</h2>
          )}
        </>

      ) : profile.userType === 'company' ? (
        <h2 className="highlights__title">My Products</h2>
      ) : null}

      <button
        className="add-product-btn"
        // onClick={onAddProduct} // Trigger function to add a product
      >
        Add a new Product+
      </button>


      <div className="highlights__products_view">
        {profile.userType === 'customer' && (
          games
            .filter(game => isInGameOrders(game.id))
            .map((game, index) => (
              <GameChart
                key={index}
                game={game}
                variant='profile'
              />
            ))
        )}
        {profile.userType === 'company' && (
          games
            .filter(game => isInGameCompany(game.id))
            .map((game, index) => (
              <GameChart
                key={index}
                game={game}
                variant='store'
              />
            ))
        )}


      </div>
    </div>
  );
};

export default ProductView;