import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const gatoImage = require('./src/public/gato.jpg');
const perroImage = require('./src/public/perro.jpg');
const hasmterImage = require('./src/public/hasmter.jpg');
const loroImage = require('./src/public/loro.jpg');

const { width, height } = Dimensions.get('window');

export const PetsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.gridContainer}>
      <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Formulario')}>
        <Image
          source={gatoImage}
          style={styles.image}
          alt="gato"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Formulario')}>
        <Image
          source={perroImage}
          style={styles.image}
          alt="perro"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Formulario')}>
        <Image
          source={loroImage}
          style={styles.image}
          alt="loro"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Formulario')}>
        <Image
          source={hasmterImage}
          style={styles.image}
          alt="hamster"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: width / 2,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
    borderWidth: 1,
    borderColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
  },
});

export default PetsScreen;
