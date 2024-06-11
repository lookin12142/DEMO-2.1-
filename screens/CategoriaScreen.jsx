import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TextInput, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCarrito } from './CarritoContext';

export const CategoriaScreen = ({ route, navigation }) => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cantidad, setCantidad] = useState({});
  const { categoriaId } = route.params;
  const { agregarAlCarrito, disminuirCantidad, carrito } = useCarrito();

  useEffect(() => {
    fetch('http://192.168.0.10:8000/api/products/')
      .then(response => response.json())
      .then(data => {
        const productosDeCategoria = data.filter(producto => producto.category === categoriaId);
        setProductos(productosDeCategoria);
      });
  }, [categoriaId]);

  const handleCantidadChange = (productoId, cantidad) => {
    setCantidad({
      ...cantidad,
      [productoId]: parseInt(cantidad) || 1,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        onChangeText={text => setBusqueda(text)}
        value={busqueda}
        placeholder="Buscar producto"
      />

      <View style={styles.buttonContainer}>
        <Button title="Perros" onPress={() => setCategoriaSeleccionada(1)} />
        <Button title="Gatos" onPress={() => setCategoriaSeleccionada(2)} />
        <Button title="Conejos" onPress={() => setCategoriaSeleccionada(3)} />
        <Icon name="cart" size={30} onPress={() => navigation.navigate('Carrito')} />
      </View>

      <FlatList
        data={productos}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <View style={styles.buttonContainer}>
              <TextInput
                style={styles.cantidadInput}
                keyboardType="numeric"
                value={String(cantidad[item.id] || 1)}
                onChangeText={(text) => handleCantidadChange(item.id, text)}
              />
              <Button title="Agregar al carrito" onPress={() => agregarAlCarrito(item, cantidad[item.id] || 1)} />
              <Button title="+" onPress={() => agregarAlCarrito(item, 1)} />
              <Button title="-" onPress={() => disminuirCantidad(item)} />
            </View>
            <Text style={styles.productQuantity}>Cantidad: {carrito.find(i => i.product.id === item.id)?.quantity || 0}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  cantidadInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: 60,
    textAlign: 'center',
    marginRight: 10,
  },
});
