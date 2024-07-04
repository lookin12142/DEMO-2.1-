import React, { useContext } from 'react';
import { View, Text, FlatList, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ProductContext } from './ProductsContext';

const backgroundImage = require('./src/public/background1.jpg');


export const CategoriaScreen = ({ navigation }) => {
  const { categories, loading } = useContext(ProductContext);

  if (loading) {
    return <Text>Cargando categorías...</Text>;
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Productos', { categoryId: item.id })}>
            <View style={styles.categoryContainer}>
              <Image source={{ uri: item.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{item.name}</Text>
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
  listContent: {
    padding: 20,
  },
  categoryContainer: {
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
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoriaScreen;
