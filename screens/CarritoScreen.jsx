import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useCarrito } from './CarritoContext';

export const CarritoScreen = ({ navigation }) => {
  const { carrito, eliminarDelCarrito, limpiarCarrito } = useCarrito();
  const [total, setTotal] = useState(0);
  const { confirmPayment } = useStripe();

  useEffect(() => {
    const total = carrito.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setTotal(total);
  }, [carrito]);

  const handlePayPress = async () => {
    // Aquí deberías obtener el client secret desde tu backend
    const clientSecret = await getClientSecretFromBackend(total);

    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails: {
        email: 'email@example.com', // Obtener detalles del usuario
      },
    });

    if (error) {
      Alert.alert(`Payment failed: ${error.message}`);
    } else if (paymentIntent) {
      Alert.alert('Payment successful');
      limpiarCarrito();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={carrito}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.product.name}</Text>
            <Text style={styles.productDescription}>{item.product.description}</Text>
            <Text style={styles.productPrice}>{item.product.price}</Text>
            <Text style={styles.productQuantity}>Cantidad: {item.quantity}</Text>
            <Button title="Eliminar del carrito" onPress={() => eliminarDelCarrito(item.product.id)} />
          </View>
        )}
        keyExtractor={item => item.product.id.toString()}
      />

      <Text style={styles.total}>Total: {total}</Text>

      <Button title="Comprar" onPress={handlePayPress} />
      <Button title="Limpiar carrito" onPress={limpiarCarrito} />
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
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: 'gray',
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
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
});
