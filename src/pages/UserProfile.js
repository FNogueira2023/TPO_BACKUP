import React, { useState, useEffect } from 'react';
import { useUser } from '../userContext';
import ProductView from '../components/profile/ProductView';
import UserCover from '../components/profile/UserCover';
import Wishlist from '../components/profile/Wishlist';
import axios from 'axios';

const UserProfile = () => {
    const { user } = useUser();
    const [games, setGames] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [profile, setProfile] = useState([]);
    const [ordersGames, setOrdersGames] = useState([]);
    const [companyGames, setCompanyGames] = useState([]);

    // Function to fetch profile data
    const fetchProfile = async () => {
        setLoading(true);
        const token = user.token;

        try {
            // Fetch profile data
            const userResponse = await axios.get('http://127.0.0.1:3001/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(userResponse.data);

        } catch (err) {
            setError('Error fetching data. Please try again later.'); // Set error message
            console.error(err); // Log the error for debugging
        } finally {
            setLoading(false);
        }
    };

    const fetchCart = async () => {
        setLoading(true);
        const token = user.token;

        try {
            // Fetch cart data
            const cartResponse = await axios.post('http://127.0.0.1:3001/carts', { userId: user.user.id }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart(cartResponse.data);

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
    // Function to fetch games
    const fetchGames = async () => {
        setLoading(true);
        try {
            // Fetch game details
            const gamesResponse = await axios.get('http://127.0.0.1:3001/games/');
            setGames(gamesResponse.data);

        } catch (err) {
            setError('Error fetching data. Please try again later.'); // Set error message
            console.error(err); // Log the error for debugging
        } finally {
            setLoading(false);
        }
    };
    // Function to fetch cart items
    const fetchCartItems = async () => {
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

    const fetchOrdersAndCompanyGames = async () => {
        setLoading(true);
        const token = user.token;

        try {            
            // Fetch user orders or company games based on user type
            if (user.user.userType === 'customer') {
                const ordersResponse = await axios.get('http://127.0.0.1:3001/orders', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrdersGames(ordersResponse.data);
            } else {
                const companyGamesResponse = await axios.get('http://127.0.0.1:3001/companies/games', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCompanyGames(companyGamesResponse.data);
            }

        } catch (err) {
            // setError('Error fetching data. Please try again later.'); // Set error message
            // console.error(err); // Log the error for debugging
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchGames();
        fetchProfile();
        fetchWishlistItems();   
        fetchOrdersAndCompanyGames();
    }, []);

    useEffect(() => {
        fetchCart();
        fetchCartItems();      
    }, []);

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



    const isGameInCart = (gameId) => {
        return cartItems.some(item => item.gameId === gameId);
    };

    const isInWishlist = (gameId) => {
        return wishlistItems.some(item => item.gameId === gameId);
    };

    return (
        <div className="user-profile">
            {loading && <div>Loading...</div>}
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
            {!loading && !error && ( // Only render profile if there's no loading or error
                <>
                    <UserCover profile={profile} />
                    <ProductView profile={profile} ordersGames={ordersGames} games={games} companyGames={companyGames} />
                    <Wishlist wishlistItems={wishlistItems} games={games} isInWishlist={isInWishlist}
                        isGameInCart={isGameInCart} addToCart={addToCart} removeFromCart={removeFromCart} cartItems={cartItems} />
                </>
            )}
        </div>
    );
};

export default UserProfile;