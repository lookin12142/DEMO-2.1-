import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FormularioScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    sexo: '',
    fecha_nacimiento: '',
    peso: '',
    nombre_propietario: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch('http://192.168.142.1:8000/api/mascotas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Datos enviados correctamente');
        navigation.navigate('Main', { screen: 'Inicio' });
      } else {
        Alert.alert('Error', 'Hubo un problema al enviar los datos');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Main', { screen: 'Inicio' })}>
        <Text style={styles.skipText}>X</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>¿Cómo se llama tu Mascota?</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la Mascota"
          value={formData.nombre}
          onChangeText={(text) => handleChange('nombre', text)}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Especie</Text>
        <TextInput
          style={styles.input}
          placeholder="Especie"
          value={formData.especie}
          onChangeText={(text) => handleChange('especie', text)}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Raza</Text>
        <TextInput
          style={styles.input}
          placeholder="Raza"
          value={formData.raza}
          onChangeText={(text) => handleChange('raza', text)}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sexo</Text>
        <TextInput
          style={styles.input}
          placeholder="Sexo"
          value={formData.sexo}
          onChangeText={(text) => handleChange('sexo', text)}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Fecha de Nacimiento</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de Nacimiento"
          value={formData.fecha_nacimiento}
          onChangeText={(text) => handleChange('fecha_nacimiento', text)}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Peso</Text>
        <TextInput
          style={styles.input}
          placeholder="Peso"
          value={formData.peso}
          onChangeText={(text) => handleChange('peso', text)}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre del Propietario</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Propietario"
          value={formData.nombre_propietario}
          onChangeText={(text) => handleChange('nombre_propietario', text)}
        />
      </View>
      
      <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
        <Text style={styles.sendText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  skipButton: {
    alignSelf: 'flex-end',
  },
  skipText: {
    fontSize: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
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

export default FormularioScreen;
