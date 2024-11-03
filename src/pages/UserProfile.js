import React, { useState, useEffect } from 'react';
import Game from '../components/Game';
import { useFetch } from '../useFetch';
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


    const fetchData = async () => {
        if (!user) {
            setCart({ items: [], totalPrice: 0 }); // Reset the cart to empty
            localStorage.removeItem('cart');
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const userId = user.user.id;
            const token = user.token;

            // Fetch user data
            const userResponse = await axios.get(`http://127.0.0.1:3001/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(userResponse.data);


            // Fetch cart data
            const cartResponse = await axios.post(`http://127.0.0.1:3001/carts`, { userId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart(cartResponse.data);

            // Fetch game details
            const gamesResponse = await axios.get('http://127.0.0.1:3001/games/');            
            setGames(gamesResponse.data);



            // Fetch cart items
            const cartItemsResponse = await fetch('http://127.0.0.1:3001/carts/items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Check if the response is ok before processing
            if (!cartItemsResponse.ok) {
                throw new Error('Failed to fetch cart items');
            }

            // Parse the response to JSON
            const cartItemsData = await cartItemsResponse.json();
            setCartItems(cartItemsData);

        } catch (err) {
            setError('Error fetching data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch wishlist items 
    const wishlistResponse = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3001/wishlists/items/all`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            console.log(response.data);
            setWishlistItems(response.data);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);
            throw error;
        }
    }

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [user]);

    // Ensure wishlistResponse fetches the latest items when `wishlistItems` changes
    useEffect(() => {
        wishlistResponse();
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [user]);


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
                const cartItem = await response.json();
                setCart((prevCart) => {
                    const updatedItems = [...prevCart.items, cartItem];
                    const updatedTotalPrice = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);

                    return {
                        ...prevCart,
                        items: updatedItems,
                        totalPrice: updatedTotalPrice,
                    };
                });
                alert(`${game.name} has been added to your cart!`);
            } else {
                const errorData = await response.json();
                alert(`Error adding to cart: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add item to cart.');
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
                setCart((prevCart) => {
                    const updatedItems = prevCart.items.filter(item => item.gameId !== game.id);
                    const updatedTotalPrice = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);

                    return {
                        ...prevCart,
                        items: updatedItems,
                        totalPrice: updatedTotalPrice,
                    };
                });
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


    // Helper function to check if a game is in cart
    const isGameInCart = (gameId) => {
        return cartItems.some(item => item.gameId === gameId);
    };

    // Helper function to check if a game is in wishlist
    const isInWishlist = (gameId) => {
        return wishlistItems.some(item => item.gameId === gameId);
    };




    return (
        <div className="user-profile">
            <UserCover profile={profile} />
            {/* <ProductView  /> */}
            <Wishlist wishlistItems={wishlistItems} games={games} isInWishlist={isInWishlist}
                isGameInCart={isGameInCart} />
        </div>
    );
};

export default UserProfile;
