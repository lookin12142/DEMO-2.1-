// src/CarritoScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CarritoContext } from './CarritoContext';

export const CarritoScreen = ({ navigation }) => {
  const { cart, removeFromCart, clearCart, getTotal, createOrder } = useContext(CarritoContext);

  const handlePurchase = async () => {
    Alert.alert(
      "Confirmar Compra",
      "¿Deseas realizar la compra?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Comprar",
          onPress: async () => {
            try {
              const customer = { /* datos del cliente */ };
              await createOrder(customer, cart);
              clearCart();
              Alert.alert("Compra realizada", "¡Gracias por tu compra!");
            } catch (error) {
              Alert.alert("Error", "Hubo un problema al realizar la compra.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.nombre}</Text>
            <Text style={styles.productPrice}>S/{item.price}</Text>
            <Text style={styles.productQuantity}>Cantidad: {item.quantity}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: S/{getTotal()}</Text>
        <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
          <Text style={styles.purchaseButtonText}>Comprar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
          <Text style={styles.clearButtonText}>Vaciar Carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  productContainer: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
  },
  productQuantity: {
    fontSize: 14,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'red',
  },
  totalContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  purchaseButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CarritoScreen;
