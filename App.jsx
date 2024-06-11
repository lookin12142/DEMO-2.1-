import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './screens/LoginScreen.jsx';
import { PetsScreen } from './screens/PetsScreen.jsx';
import { RegisterFormScreen } from './screens/RegisterFormScreen.jsx';
import { TabNavigator } from './screens/TabNavigator.jsx';
import { DetalleProductoScreen } from './screens/DetalleProductoScreen.jsx';
import { CarritoScreen } from './screens/CarritoScreen.jsx';
import { CategoriaScreen } from './screens/CategoriaScreen.jsx'; 
import { ConfiguracionScreen } from './screens/Configuracion.jsx';
import { FormularioScreen } from './screens/FormularioScreen.jsx';
import { CarritoProvider } from './screens/CarritoContext';
import { StripeProvider } from '@stripe/stripe-react-native';


const stripePublishableKey = 'your-publishable-key-from-stripe';


const App = () => {
  const Stack = createStackNavigator(); 
  return (
    <StripeProvider publishableKey={stripePublishableKey}>
    <CarritoProvider>
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Pets" component={PetsScreen} />
        <Stack.Screen name="RegisterForm" component={RegisterFormScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="DetalleProducto" component={DetalleProductoScreen} />
        <Stack.Screen name="Carrito" component={CarritoScreen} />
        <Stack.Screen name="Categoria" component={CategoriaScreen} />
        <Stack.Screen name="Configuracion" component={ConfiguracionScreen} />
        <Stack.Screen name="Formulario" component={FormularioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </CarritoProvider>
  </StripeProvider>
  );
};

export default App;
