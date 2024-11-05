import React from 'react';
import './PurchaseTotal.css';

const PurchaseTotal = ({
  productCount,
  productTotal,
  discount = 0.00,
  createOrder,
  cart,
  cartItems
}) => {
  // Ensure productTotal and discount are numbers
  const total = (typeof productTotal === 'number' ? productTotal : 0) - (typeof discount === 'number' ? discount : 0);

  return (
    <div className="purchase-total-card">
      <h4>PURCHASE TOTAL</h4>

      <div className="details">
        <div className="detail-item">
          <span>Products ({productCount})</span>
          {productTotal !== undefined && productTotal !== 0 ? (
            <span className="amount">${productTotal.toFixed(2)}</span>
          ) : (
            <span className="amount">No cart items</span>
          )}
        </div>
        <div className="detail-item">
          <span>Discount</span>
          <span className="amount">-${(typeof discount === 'number' ? discount : 0).toFixed(2)}</span>
        </div>
      </div>

      <hr />

      <div className="total-section">
        <span>Total</span>
        <span className="amount">${total.toFixed(2)}</span>
      </div>

      <button className="buy-now-button" onClick={createOrder}>Buy Now</button>
    </div>
  );
};

export default PurchaseTotal;
