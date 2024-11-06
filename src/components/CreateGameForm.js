import React, { useState } from 'react';
import './createGameForm.css';


const CreateGameForm = ({onClose}) => {
    const [gameData, setGameData] = useState({
        name: '',
        category: '',
        players: '',
        language: '',
        operatingSystem: '',
        description: '',
        minRequirements: '',
        recommendations: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGameData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        setGameData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSaveAndPublish = () => {
        console.log('Save and Publish:', gameData);
    };

    const handleSave = () => {
        console.log('Save as Draft:', gameData);
    };

    return (
        <div className="modal">
            <div className="overlay"></div>
            <div className="create-game-form-container">
                <div className="create-game-form">
                <button className="close-btn" onClick={onClose}>X</button>
                    <h2>Product Details</h2>                    
                    <div className="form-section">
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={gameData.name}
                                onChange={handleChange}
                            />
                            <select
                                name="category"
                                value={gameData.category}
                                onChange={handleChange}
                            >
                                <option value="">Category</option>
                                <option value="action">Action</option>
                                <option value="adventure">Adventure</option>
                                <option value="puzzle">Puzzle</option>

                            </select>
                            <select
                                name="players"
                                value={gameData.players}
                                onChange={handleChange}
                            >
                                <option value="">Players</option>
                                <option value="single">Single Player</option>
                                <option value="multiplayer">Multiplayer</option>
                            </select>
                            <select
                                name="language"
                                value={gameData.language}
                                onChange={handleChange}
                            >
                                <option value="">Language</option>
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="spanish">German</option>

                            </select>
                            <select
                                name="operatingSystem"
                                value={gameData.operatingSystem}
                                onChange={handleChange}
                            >
                                <option value="">Operative System</option>
                                <option value="windows">Windows</option>
                                <option value="mac">MacOS</option>
                                <option value="linux">Linux</option>
                            </select>
                            <textarea
                                name="description"
                                placeholder="Game description"
                                value={gameData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div>
                            <textarea
                                name="minRequirements"
                                placeholder="Minimum requirements"
                                value={gameData.minRequirements}
                                onChange={handleChange}
                            ></textarea>
                            <textarea
                                name="recommendations"
                                placeholder="Recommendations"
                                value={gameData.recommendations}
                                onChange={handleChange}
                            ></textarea>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>
                    <div className="button-container">
                        <button onClick={handleSaveAndPublish} className="save-publish-btn">
                           Publish
                        </button>
                       
                        
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CreateGameForm;
