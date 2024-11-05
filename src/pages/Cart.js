import React, { useState, useEffect } from 'react';
import './Cart.css';
import PurchaseTotal from '../components/PurchaseTotal';
import Game from '../components/Game';
import { useUser } from '../userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    const { user } = useUser();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cart, setCart] = useState([]);
   
    const navigate = useNavigate();

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


    useEffect(() => {
        fetchGames();
        if (user) {
            fetchCartItems();
            fetchCart();
            fetchWishlistItems();
        }
    }, []);



    // Function to create a new order
    const createOrder = async () => {
        if (!user) return;

        if (cartItems.length === 0) {
            alert('Your cart is empty!');
        }

        try {
            const token = user.token;
            const totalPrice = cart.totalPrice;
            const orderData = {
                games: cartItems.map(item => ({ gameId: item.gameId, quantity: item.quantity })),
                totalPrice,                
                
            };
            
            const response = await axios.post('http://127.0.0.1:3001/orders', orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 201) {                
                setCart([]);
                setCartItems([]);

                alert('Order placed successfully! Thank you for shopping with us!');
                navigate('/');
            }
        } catch (error) {
            console.error('Error creating order:', error);           
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
                alert(`${game.name} has been removed from your cart.`);
                await fetchCart();
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

    // Helper function to check if a game is in cart
    const isGameInCart = (gameId) => {
        return cartItems.some(item => item.gameId === gameId);
    };

    // Helper function to check if a game is in wishlist
    const isInWishlist = (gameId) => {
        return wishlistItems.some(item => item.gameId === gameId);
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="cart-body">
            < div className='cart-titles'>
                <h2><span className='titleInColor'>({cartItems.length}) Products</span> </h2>
            </div>

            <div className="cart-grid-container">
                {/* Game Cart */}
                <section className="cart-grid">
                    <div className="cart-game-cards">
                        {games
                            .filter(game => isGameInCart(game.id)) // Filter games that are in the cart
                            .map(game => (
                                <div key={game.id} className="game-card">
                                    <Game
                                        key={game.id}
                                        game={game}
                                        variant="cart"
                                        onRemoveFromCart={removeFromCart}
                                        onAddToWishlist={addToWishlist}
                                        onRemoveFromWishlist={removeFromWishlist}
                                        isFavorite={isInWishlist(game.id)}
                                    />
                                </div>
                            ))}
                    </div>
                </section>

                <aside className="cart-sidebar">
                    <PurchaseTotal productCount={cartItems.length} productTotal={cart.totalPrice}
                        cart={cart} createOrder={createOrder} cartItems={cartItems} />

                </aside>
            </div>

        </div>
    );
}

export default Cart;