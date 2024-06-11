import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

export const TiendaScreen = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetch('http://192.168.0.10:8000/api/products/')
      .then(response => response.json())
      .then(data => setProductos(data));

    fetch('http://192.168.0.10:8000/api/categories/')
      .then(response => response.json())
      .then(data => setCategorias(data));
  }, []);

  return (
    <View>
      <Image source={{ uri: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fhospitalveterinarioteran.com%2F&psig=AOvVaw1s7qGJzJvy8LjL9cwsu_ww&ust=1717708526751000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNiyhoaxxYYDFQAAAAAdAAAAABAR' }} style={{ width: '100%', height: 100 }} />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setBusqueda(text)}
        value={busqueda}
        placeholder="Buscar producto"
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Perros" onPress={() => setCategoriaSeleccionada(1)} />
        <Button title="Gatos" onPress={() => setCategoriaSeleccionada(2)} />
        <Button title="Conejos" onPress={() => setCategoriaSeleccionada(3)} />
        <Icon name="cart" size={30} onPress={() => navigation.navigate('Carrito', { carrito })} />
      </View>

      <Picker
        selectedValue={categoriaSeleccionada}
        onValueChange={(itemValue, itemIndex) => setCategoriaSeleccionada(itemValue)}
      >
        {categorias.map(categoria => (
          <Picker.Item key={categoria.id} label={categoria.name} value={categoria.id} />
        ))}
      </Picker>

      <FlatList
        key={2}
        numColumns={2}
        data={categorias}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ flex: 1, margin: 10 }} onPress={() => navigation.navigate('Categoria', { categoriaId: item.id })}>
            <Image source={{ uri: item.image }} style={{ height: 100, borderRadius: 10 }} />
            <Text style={{ textAlign: 'center', marginTop: 10 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};
