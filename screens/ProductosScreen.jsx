import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductContext } from './ProductsContext';

const backgroundImage = require('./src/public/background1.jpg');

export const ProductosScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const { getProductsByCategory, loading } = useContext(ProductContext);
  const [busqueda, setBusqueda] = useState('');

  if (loading) {
    return <Text>Cargando productos...</Text>;
  }

  const productsByCategory = getProductsByCategory(categoryId);
  const filteredProducts = productsByCategory.filter(product =>
    product.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={30} color="#fff" onPress={() => navigation.goBack()} />
        <TextInput
          style={styles.searchBar}
          onChangeText={text => setBusqueda(text)}
          value={busqueda}
          placeholder="Buscar producto"
          placeholderTextColor="#fff"
        />
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DetalleProducto', { productId: item.id })}>
            <View style={styles.productContainer}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  listContent: {
    padding: 20,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProductosScreen;
