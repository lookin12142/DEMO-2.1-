// FormularioScreen.jsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const FormularioScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Main', { screen: 'Inicio' })}>
        <Text style={styles.skipText}>X</Text>
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="¿Cómo se llama tu Mascota?" />
     

      <TouchableOpacity style={styles.sendButton} onPress={() => navigation.navigate('Main', { screen: 'Inicio' })}>
        <Text style={styles.sendText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  skipButton: {
    alignSelf: 'flex-end',
  },
  skipText: {
    fontSize: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  sendButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    marginTop: 20,
    borderRadius: 20,
  },
  sendText: {
    color: '#000',
    textAlign: 'center',
  },
});
