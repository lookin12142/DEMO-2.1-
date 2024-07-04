
import { useReducer } from 'react';
import cartReducer from './cartReducer';
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './cartActions';
import axios from 'axios';

const useCart = () => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const removeFromCart = (item) => {
    dispatch({ type: REMOVE_FROM_CART, payload: item });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const createOrder = async (customer, items) => {
    try {
      const response = await axios.post('http://192.168.142.1:8000/api/orders/', {
        customer,
        items: items.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.precio,
        })),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getTotal,
    createOrder,
  };
};

export default useCart;
