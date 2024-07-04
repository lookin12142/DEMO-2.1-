import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './screens/LoginScreen.jsx';
import { PetsScreen } from './screens/PetsScreen.jsx';
import { RegisterFormScreen } from './screens/RegisterFormScreen.jsx';
import { TabNavigator } from './screens/TabNavigator.jsx';
import { DetalleProductoScreen } from './screens/DetalleProductoScreen.jsx';
import { CarritoScreen } from './screens/CarritoScreen.jsx';
import { ConfiguracionScreen } from './screens/ConfiguracionScreen.jsx';
import { FormularioScreen } from './screens/FormularioScreen.jsx';
import { LoadingScreen } from './screens/LoadingScreen.jsx';
import { CategoriaScreen } from './screens/CategoriaScreen.jsx';
import { ProductosScreen } from './screens/ProductosScreen.jsx';
import { AmbulanceProvider } from './screens/AmbulanceContext';
import { AuthProvider } from './screens/contexts/AuthContext';
import { CarritoProvider } from './screens/CarritoContext';
import { ProductProvider } from './screens/ProductsContext';

const Stack = createStackNavigator(); 

const App = () => {
  return (
  <AmbulanceProvider>
    <AuthProvider>
      <ProductProvider>
        <CarritoProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Loading" screenOptions={{headerShown: false}}>
              <Stack.Screen name="Loading" component={LoadingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Pets" component={PetsScreen} />
              <Stack.Screen name="RegisterForm" component={RegisterFormScreen} />
              <Stack.Screen name="Main" component={TabNavigator} />
              <Stack.Screen name="DetalleProducto" component={DetalleProductoScreen} />
              <Stack.Screen name="Carrito" component={CarritoScreen} />
              <Stack.Screen name="Categoria" component={CategoriaScreen} />
              <Stack.Screen name="Productos" component={ProductosScreen} />
              <Stack.Screen name="Configuracion" component={ConfiguracionScreen} />
              <Stack.Screen name="Formulario" component={FormularioScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </CarritoProvider>
      </ProductProvider>
    </AuthProvider>
  </AmbulanceProvider>
  );
};

export default App;


