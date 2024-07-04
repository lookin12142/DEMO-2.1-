import React, { useEffect } from 'react';
import * as Location from 'expo-location';

const EnableGPS = () => {
  useEffect(() => {
    const enableGPS = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se pudo habilitar el GPS.');
        return;
      }

      await Location.getCurrentPositionAsync({});
    };

    enableGPS();
  }, []);

  return null;
};

export default EnableGPS;
