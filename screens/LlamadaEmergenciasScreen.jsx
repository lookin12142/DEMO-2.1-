// EmergenCallScreen.jsx
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, Button, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';

import { AmbulanceContext } from './AmbulanceContext';

export const EmergenCallScreen = () => {
  const [loading, setLoading] = useState(false);
  const { isEmergencyActive, setIsEmergencyActive } = useContext(AmbulanceContext);

  const openWhatsApp = () => {
    const phoneNumber = '913184793'; 
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Asegúrate de tener WhatsApp instalado.');
    });
  };

  const callEmergency = async () => {
    setLoading(true);
    setIsEmergencyActive(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {z
      Alert.alert('Permiso denegado', 'No se pudo obtener la ubicación.');
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const timestamp = new Date().toISOString();

    await fetch('http://192.168.142.1:8000/api/emergencies/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        timestamp: timestamp,
      }),
    });

    Linking.openURL('tel:+51913184793').catch(() => {
      Alert.alert('Error', 'No se pudo abrir la aplicación de teléfono.');
    });

    setLoading(false);
  };

  const cancelEmergency = () => {
    setIsEmergencyActive(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergencia Veterinaria</Text>
      <Text style={styles.description}>Aquí puedes contactar a un veterinario de emergencia.</Text>
      <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
        <Icon name="whatsapp" size={30} color="#fff" />
      </TouchableOpacity>
      <Button title="Llamar a Emergencia" onPress={callEmergency} />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Ambulancia en camino...</Text>
        </View>
      )}
      {isEmergencyActive && (
        <View style={styles.emergencyContainer}>
          <Text>Ambulancia en camino...</Text>
          <Button title="Cancelar" onPress={cancelEmergency} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  whatsappButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#25D366', 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  emergencyContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default EmergenCallScreen;
