import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from './contexts/AuthContext';

export const ConfiguracionScreen = ({ navigation }) => {
  const auth = getAuth();
  const { user, logout } = useAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        logout();
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error al cerrar la sesión:', error);
      });
  };

  const handleCreateTicket = () => {
    console.log('Crear ticket');
  };

  const handleContactSupport = () => {
    console.log('Contactar con soporte técnico');
  };

  const handleDownloadPDF = () => {
    console.log('Descargar PDF');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      {user ? (
        <>
          <Text style={styles.userInfo}>Bienvenido, {user.name}</Text>
          <Text style={styles.userInfo}>Email: {user.email}</Text>
        </>
      ) : (
        <Text style={styles.userInfo}>No estás autenticado</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCreateTicket}>
        <Text style={styles.buttonText}>Crear Ticket</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleContactSupport}>
        <Text style={styles.buttonText}>Contactar Soporte Técnico</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDownloadPDF}>
        <Text style={styles.buttonText}>Normas Teran</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
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
