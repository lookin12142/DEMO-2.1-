// ConfiguracionScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth'; // Importa signOut

export const ConfiguracionScreen = ({ navigation }) => {
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error al cerrar la sesión:', error);
      });
  };

  return (
    <View>
      <Text>Esta es la vista de Configuración</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
  },
});
