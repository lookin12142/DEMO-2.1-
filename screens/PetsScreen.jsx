import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const PetsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Formulario')}>
  <Text style={styles.text}>Gato</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Formulario')}>
  <Text style={styles.text}>Conejo</Text>
</TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Formulario')}>
        <Text style={styles.text}>Perro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    width: '100%',
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
  },
  text: {
    fontSize: 30,
    color: '#fff',
  },
});
