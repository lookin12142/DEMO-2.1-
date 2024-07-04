import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { InicioScreen } from './InicioScreen.jsx';
import { ConfiguracionScreen } from './ConfiguracionScreen.jsx';
import { EmergenCallScreen } from './LlamadaEmergenciasScreen.jsx';
import { CategoriaScreen } from './CategoriaScreen.jsx';
import { CarritoScreen } from './CarritoScreen.jsx';
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
                } else if (route.name === 'Categoria') {
                  iconName = focused ? 'cart' : 'storefront-outline';
                } else if (route.name === 'Configuración') {
                  iconName = focused ? 'settings' : 'settings-outline';
                } else if (route.name === 'Emergencia') {
                  iconName = focused ? 'paw' : 'paw-outline';
                } else if (route.name === 'Carrito') {
                  iconName = focused ? 'cart' : 'cart-outline';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
              headerShown: false, 
              
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Inicio" component={InicioScreen} />
            <Tab.Screen name="Categoria" component={CategoriaScreen} />
            <Tab.Screen name="Emergencia" component={EmergenCallScreen} />
            <Tab.Screen name="Configuración" component={ConfiguracionScreen} />
            <Tab.Screen name="Carrito" component={CarritoScreen} />
          </Tab.Navigator>
  
  );
};
