import React, { useState, useEffect } from 'react';
import { useUser } from '../userContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductHero from '../components/product_detail/ProductHero';
import Rating from '../components/product_detail/Rating';
import Product_detail from '../components/product_detail/ProductDetail';


const Product = () => {
    const { gameId } = useParams(); // Retrieve gameId from the URL
    const { user } = useUser(); // Get user context
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [game, setGame] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cart, setCart] = useState([]);

    // Function to fetch game data by gameId
    const fetchGame = async () => {
        if (!gameId) return; // Guard clause for missing gameId

        const apiEndpoint = `http://127.0.0.1:3001/games/${gameId}`;
        try {
            const response = await axios.get(apiEndpoint);
            setGame(response.data);
        } catch (error) {
            setError('Error fetching game data.');
            console.error('Error fetching game:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch cart data
    const fetchCart = async () => {
        if (!user) return;
        setLoading(true);
        const token = user.token;
        try {
            const cartResponse = await axios.post('http://127.0.0.1:3001/carts', { userId: user.user.id }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart(cartResponse.data);

            const cartItemsResponse = await axios.get('http://127.0.0.1:3001/carts/items', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setCartItems(cartItemsResponse.data);
        } catch (err) {
            setError('Error fetching cart data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch cart items
    const fetchCartItems = async () => {
        if (!user) {
            return;
        }

        setLoading(true);
        const token = user.token;

        try {
            // Fetch cart items
            const cartItemsResponse = await axios.get('http://127.0.0.1:3001/carts/items', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setCartItems(cartItemsResponse.data);
        } catch (err) {
            setError('Error fetching data. Please try again later.'); // Set error message
            console.error(err); // Log the error for debugging
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch wishlist items 
    const fetchWishlistItems = async () => {
        setWishlistItems([])
        try {
            const response = await axios.get(`http://127.0.0.1:3001/wishlists/items/all`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setWishlistItems(response.data);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);
        }
    }


    // Helper function to check if a game is in the cart
    const isGameInCart = (gameId) => cartItems.some(item => item.gameId === gameId);

    // Helper function to check if a game is in the wishlist
    const isInWishlist = (gameId) => wishlistItems.some(item => item.gameId === gameId);



    const addToCart = async (game) => {
        try {
            const response = await fetch('http://127.0.0.1:3001/carts/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    gameId: game.id,
                    quantity: 1,
                }),
            });

            if (response.ok) {
                fetchCartItems();
                await fetchCart();
                alert(`${game.name} has been added to your cart!`);
            } else {
                const errorData = await response.json();
                alert(`Error adding to cart: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('You must be logged in to add items to your cart!');
        }
    };

    const removeFromCart = async (game) => {
        try {
            const response = await fetch(`http://127.0.0.1:3001/carts/${cart.id}/items`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    gameId: game.id,
                }),
            });

            if (response.ok) {
                fetchCartItems();
                await fetchCart();
                alert(`${game.name} has been removed from your cart.`);
            } else {
                const errorData = await response.json();
                alert(`Error removing from cart: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
            alert('Failed to remove item from cart.');
        }
    };

    const addToWishlist = async (game) => {
        try {
            const response = await axios.post(`http://127.0.0.1:3001/wishlists/items`, {
                gameId: game.id,
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (response.status === 201) {
                await fetchWishlistItems();
            }
        } catch (error) {
            console.log(game.id);
            console.log(error);
            setError('Failed to add item to wishlist.');
        }
    };

    const removeFromWishlist = async (game) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:3001/wishlists/items/${game.id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
                data: {
                    gameId: game.id,
                },
            });

            if (response.status === 204) {
                await fetchWishlistItems();
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            setError('Failed to remove item from wishlist.');
        }
    };
    // UseEffect hook to fetch the game and other data when the component mounts or gameId changes
    useEffect(() => {
        setLoading(true);
        fetchGame();
        if (user) {
            fetchCart();
            fetchCartItems();
            fetchWishlistItems();
        }
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {game ? (
                <>
                    <ProductHero
                        game={game}
                        onAddToCart={addToCart}
                        onRemoveFromCart={removeFromCart}
                        onAddToWishlist={addToWishlist}
                        onRemoveFromWishlist={removeFromWishlist}
                        isFavorite={isInWishlist(game.id)}
                        isInCart={isGameInCart(game.id)}
                    />
                    <Product_detail game={game} />
                    <Rating gameId={game.id} />
                </>
            ) : (
                <div>Game not found.</div>
            )}
        </div>
    );
};

export default Product;
