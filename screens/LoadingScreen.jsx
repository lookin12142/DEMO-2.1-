import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import logo from './src/public/logo.png';
const back = require('./src/public/back.jpg');

export const LoadingScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Login');
    }, 5000);
  }, []);

  return (
    <ImageBackground source={back} style={styles.background}>
      <View style={styles.container}>
        {loading ? (
          <>
            <Image source={logo} style={styles.logo} />
            <ActivityIndicator size="large" color="#0000ff" />
          </>
        ) : null}
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, // Hace que la imagen sea circular
    marginBottom: 20,
  },
});

export default LoadingScreen;


