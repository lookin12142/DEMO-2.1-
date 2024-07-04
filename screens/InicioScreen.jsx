import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, StatusBar } from 'react-native';
const backgroundImage = require('./src/public/background1.jpg');


export const InicioScreen = () => {
  const navigateToNews = () => {
    console.log('Navigating to News...');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Noticias de Veterinaria</Text>
        </View>
        <View style={styles.newsContainer}>
          <TouchableOpacity style={styles.newsCard} onPress={navigateToNews}>
            <Image
              style={styles.newsImage}
            />
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>Nuevas técnicas de cirugía veterinaria</Text>
              <Text style={styles.newsDescription}>Descubre las últimas innovaciones en procedimientos quirúrgicos para mascotas.</Text>
              <Text style={styles.readMore}>Leer más</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  header: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  newsContainer: {
    flex: 1,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  newsContent: {
    padding: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  newsDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555555',
  },
  readMore: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default InicioScreen;
