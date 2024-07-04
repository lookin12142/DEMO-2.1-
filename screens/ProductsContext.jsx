import { createContext, useState, useEffect } from 'react';
import useFetchProducts from './useFetchProduct';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const { data: products, loading: loadingProducts, error: errorProducts } = useFetchProducts('http://192.168.142.1:8000/api/products/');
  const { data: categories, loading: loadingCategories, error: errorCategories } = useFetchProducts('http://192.168.142.1:8000/api/categories/');
  
  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.category === categoryId);
  };

  return (
    <ProductContext.Provider value={{ products, categories, loading: loadingProducts || loadingCategories, getProductsByCategory }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
