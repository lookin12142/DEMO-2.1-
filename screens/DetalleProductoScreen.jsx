import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ProductContext } from './ProductsContext.jsx';
import { CarritoContext } from './CarritoContext.jsx';


export const DetalleProductoScreen = () => {
  const route = useRoute();
  const { productId } = route.params;
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CarritoContext);
  
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Producto no encontrado</Text>
      </View>
    );
  }

  const handleAddToCart = (product) => {
    addToCart(product);
    Alert.alert(
      "Producto Agregado",
      "El producto se ha agregado correctamente al carrito.",
      [{ text: "OK", style: "default" }]
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(product)}>
        <Text style={styles.addButtonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 20,
    color: '#ff9900',
  },
  totalText: {
    fontSize: 18,
    color: '#000',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#ffcc00', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default DetalleProductoScreen;
