import React, { useState } from 'react';
import GameChart from '../Game';
import './ProductView.css';
import CreateGameForm from '../CreateGameForm';

// Modal Component
const Modal = ({ onClose, onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ productName, productDescription });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add a New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-input-group">
            <label htmlFor="productName">Product Name</label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="modal-input-group">
            <label htmlFor="productDescription">Product Description</label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductView = ({
  profile,
  ordersGames,
  games,
  companyGames
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function to check if a game is in orderGames
  const isInGameOrders = (gameId) => {
    return ordersGames.includes(gameId);
  };

  // Helper function to check if a game is in companyGames
  const isInGameCompany = (gameId) => {
    return companyGames.includes(gameId);
  };

  // Function to handle adding a new product (open modal)
  const onAddProduct = () => {
    setIsModalOpen(true);
  };

  // Function to handle submitting the new product
  const handleProductSubmit = (product) => {
    console.log('New Product Added:', product);
    // You would usually make an API request here to save the product
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
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
        <>
          <h2 className="highlights__title">My Products</h2>
          <button
            className="add-product-btn"
            onClick={onAddProduct} // Trigger function to add a product
          >
            Add a New Product+
          </button>
        </>
      ) : null}

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          onSubmit={handleProductSubmit}
        />
      )}

      {isModalOpen && <CreateGameForm onClose={closeModal} />}

      {/* <div className="highlights__products_view">
        {profile.userType === 'customer' && (
          games
            .filter(game => isInGameOrders(game.id))
            .map((game, index) => (
              <GameChart
                key={index}
                game={game}
                variant="profile"
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
                variant="store"
              />
            ))
        )}
      </div> */}
    </div>
  );
};

export default ProductView;
