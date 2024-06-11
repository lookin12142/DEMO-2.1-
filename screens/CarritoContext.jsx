import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad) => {
    const productoEnCarrito = carrito.find(item => item.product.id === producto.id);
    if (productoEnCarrito) {
      setCarrito(carrito.map(item =>
        item.product.id === producto.id
          ? { ...item, quantity: item.quantity + cantidad }
          : item
      ));
    } else {
      setCarrito([...carrito, { product: producto, quantity: cantidad }]);
    }
  };

  const disminuirCantidad = (producto) => {
    const productoEnCarrito = carrito.find(item => item.product.id === producto.id);
    if (productoEnCarrito && productoEnCarrito.quantity > 1) {
      setCarrito(carrito.map(item =>
        item.product.id === producto.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    } else {
      setCarrito(carrito.filter(item => item.product.id !== producto.id));
    }
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.product.id !== productoId));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, disminuirCantidad, eliminarDelCarrito, limpiarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
