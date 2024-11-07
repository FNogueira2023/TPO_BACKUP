import React, { useState, useEffect } from 'react';
import './createGameForm.css';
import axios from 'axios';
import { useUser } from '../userContext';

const CreateGameForm = ({ onClose }) => {
    const {user} = useUser();
    const [gameData, setGameData] = useState({
        name: '',
        genre: '',
        playerMode: '',
        language: '',
        os: '',
        price: '',
        description: '',
        minRequirements: '',
        recommendations: '',
        // imageURL: null,
        companyId: '',
    });

    // Update imageURL based on the name
    // useEffect(() => {
    //     if (gameData.name) {
    //         setGameData((prevData) => ({
    //             ...prevData,
    //             imageURL: `${gameData.name}.png`,
    //         }));
    //     }
    // }, [gameData.name]); // This will run whenever the name changes


    // Function to fetch the company data by userId using axios
    const handleSearchCompany = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3001/companies/profile/${user.user.id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Add the token to the request header
                }
            });
            setGameData((prevData) => ({
                ...prevData,
                companyId: response.data.id
            }));
        } catch (err) {
            console.log(err);
        }
    };
    

    useEffect(() => {handleSearchCompany()}, []);

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

    const handleSaveAndPublish = async () => {
        try {
            // Make an API call to create a new game using axios
            const response = await axios.post('http://127.0.0.1:3001/games', gameData, {
                headers: {
                    Authorization: `Bearer ${user.token}` // Assuming you have a token for authentication
                }
            });
            
            console.log('Game created successfully:', response.data);
            // Optionally, you can clear the form or perform any success actions
            onClose(); // Close the form modal after saving
        } catch (error) {
            console.log(gameData)
            console.error('Error creating game:', error.response?.data?.error || error.message);
        }
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
                                name="genre"
                                value={gameData.genre}
                                onChange={handleChange}
                            >
                                <option value="">Genre</option>
                                <option value="action">Action</option>
                                <option value="adventure">Adventure</option>
                                <option value="puzzle">Puzzle</option>
                            </select>
                            <select
                                name="playerMode"
                                value={gameData.playerMode}
                                onChange={handleChange}
                            >
                                <option value="">PlayerMode</option>
                                <option value="Single-player">Single Player</option>
                                <option value="Multiplayer">Multiplayer</option>
                            </select>
                            <select
                                name="language"
                                value={gameData.language}
                                onChange={handleChange}
                            >
                                <option value="">Language</option>
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="german">German</option>
                            </select>
                            <select
                                name="os"
                                value={gameData.os}
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
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={gameData.price}
                                onChange={handleChange}
                            />
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
