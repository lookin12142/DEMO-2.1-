import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { InicioScreen } from './Inicio.jsx';
import { TiendaScreen } from './Tienda.jsx';
import { ConfiguracionScreen } from './Configuracion.jsx';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tienda') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Configuración') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Tienda" component={TiendaScreen} />
      <Tab.Screen name="Configuración" component={ConfiguracionScreen} />
    </Tab.Navigator>
  );
};
