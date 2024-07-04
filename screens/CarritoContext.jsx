
import React, { createContext } from 'react';
import useCart from './useCart';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const cart = useCart();

  return (
    <CarritoContext.Provider value={cart}>
      {children}
    </CarritoContext.Provider>
  );
};
