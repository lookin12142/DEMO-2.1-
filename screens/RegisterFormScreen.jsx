import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios'; 

export const RegisterFormScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const auth = getAuth(); 

    const handleRegister = async () => {
        if (!email || !password || !firstName || !lastName || !phone || !address) {
            Alert.alert('Todos los campos son requeridos');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();

            const response = await axios.post('http://192.168.142.1:8000/api/customers/', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                address: address
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                }
            });

            if (response) {
                Alert.alert('Registro exitoso', 'Cliente registrado con éxito');
                navigation.navigate('Pets');
            } else {
                Alert.alert('Error', 'Hubo un problema al registrar el cliente en el servidor');
            }
        } catch (error) {
            console.error('Error al registrar en el servidor:' + error);
            Alert.alert('Error', 'Hubo un problema al registrar el cliente en el servidor');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Número de teléfono"
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección"
                value={address}
                onChangeText={setAddress}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Completar registro</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4b5563',
        textAlign: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#4b5563',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#ffd700',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: '#4b5563',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RegisterFormScreen;
