// DetalleProductoScreen.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

export const DetalleProductoScreen = ({ route, navigation }) => {
  const { producto } = route.params;

  return (
    <View>
      <Text>{producto.name}</Text>
      <Text>{producto.description}</Text>
      <Text>{producto.price}</Text>
      <Button title="Agregar al carrito" onPress={() => {/* Agrega aquí la lógica para agregar el producto al carrito */}} />
    </View>
  );
};



