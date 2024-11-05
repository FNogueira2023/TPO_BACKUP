import React, { useState, useEffect } from 'react';
import './Cart.css';
import PurchaseTotal from '../components/PurchaseTotal';
import { useFetch } from '../useFetch';
import Game from '../components/Game';
import { useUser } from '../userContext';
import axios from 'axios';


const Cart = () => {
    const { user } = useUser();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);


    const [cart, setCart] = useState([]);


    const fetchData = async () => {
        setCart([]);
        if (!user) {
            setCart([]); // Reset the cart to empty
            localStorage.removeItem('cart');
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const userId = user.user.id;
            const token = user.token;

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
        setWishlistItems([])
        if (!user) {
            setWishlistItems([]);
            setLoading(false);
            return;
        }
        try {
           const response = await axios.get(`http://127.0.0.1:3001/wishlists/items/all`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setWishlistItems(response.data);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);          
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
    }, [user]);

    // Function to create a new order
    const createOrder = async () => {
        if (!user) return;

        try {
            const token = user.token;
            const totalPrice = cart.totalPrice;
            const orderData = {
                games: cart.map(item => ({ gameId: item.gameId, quantity: item.quantity })),
                totalPrice,
            };

            const response = await axios.post('http://127.0.0.1:3001/orders', orderData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 201) {
                alert('Order placed successfully!');
                setCart([]);
                localStorage.removeItem('cart');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            setError('Failed to create order.');
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
                // Update the cart state to remove the game
                setCart((prevCart) => prevCart.filter(item => item.gameId !== game.id));

                // Also remove the game from the games state
                setGames((prevGames) => prevGames.filter(g => g.id !== game.id));

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
                alert(`${game.name} has been added to your wishlist.`);
                // Update wishlistItems state
                setWishlistItems(prevItems => [...prevItems, game.id]);
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
                alert(`${game.name} has been removed from your wishlist.`);
                // Update wishlistItems state
                setWishlistItems(prevItems => prevItems.filter(id => id !== game.id));
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