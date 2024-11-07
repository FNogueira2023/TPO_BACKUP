import React from 'react';
import './ProductDetail.css';
 import image from '../../images/polyphony.png'

const ProductDetail = ({game}) => {
  const detail = {
    image: image,
    company: "Polyphony Digital Inc.",
    productDescription: "Gran Turismo 7 features the return of the single player campaign, GT Simulation Mode. Other returning features are the return of traditional racing tracks and vehicles, Special Events, Championships, Driving School, Tuning Parts Shop, Used Cars dealership, and GT Auto while still retaining the new GT Sport Mode, Brand Central, and Discover (now labelled Showcase) that were introduced in Gran Turismo Sport.",
    mode: "Multiplayer video game, Single-player video game",
    language: "English (text)",
    system: "Windows, Linux",
    requirements: {
      processor: "Intel Core i5-2500K or AMD FX-6300.",
      graphics: "NVIDIA GeForce GTX 970 or AMD Radeon RX 570.",
      storage: "100 GB available space.",
      soundCard: "DirectX compatible soundcard."
    },
    recommendations: {
      memory: "16 GB RAM.",
      processor: "Intel Core i7-4790K or AMD Ryzen 7 2700X"
    }
  };

  return (
    <div className="product-detail">
      <h1>Product Detail</h1>
      <div className="product-info">
        <img src={detail.image} alt="Company Logo" className="company-logo" />
        <div className="company-info">
          {/* <h2>{detail.company}</h2> */}
          <p><strong>Product description:</strong> {game.description}</p>
          <p><strong>Mode:</strong> {game.playerMode}</p>
          <p><strong>Language:</strong> {game.language}</p>
          <p><strong>System:</strong> {game.os}</p>
        </div>
      </div>
      <div className="specs">
        <div className="requirements">
          <h3>Requirements</h3>
          <ul>
            <li><strong>Processor:</strong> {detail.requirements.processor}</li>
            <li><strong>Graphics:</strong> {detail.requirements.graphics}</li>
            <li><strong>Storage:</strong> {detail.requirements.storage}</li>
            <li><strong>Sound Card:</strong> {detail.requirements.soundCard}</li>
          </ul>
        </div>
        <div className="recommendations">
          <h3>Recommendations</h3>
          <ul>
            <li><strong>Memory:</strong> {detail.recommendations.memory}</li>
            <li><strong>Processor:</strong> {detail.recommendations.processor}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;