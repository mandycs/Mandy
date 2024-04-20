import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

type CrearUsuarioFormProps = {
    onCreateUsuario: (nombreUsuario: string, email: string, contrasena: string) => void;
};

export function CrearUsuarioForm({ onCreateUsuario }: CrearUsuarioFormProps) {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleCrearUsuario = () => {
        onCreateUsuario(nombreUsuario, email, contrasena);
        setNombreUsuario('');
        setEmail('');
        setContrasena('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre de usuario:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el nombre de usuario"
                value={nombreUsuario}
                onChangeText={text => setNombreUsuario(text)}
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese la contraseña"
                value={contrasena}
                onChangeText={text => setContrasena(text)}
                secureTextEntry
            />
            <Button title="Crear Usuario" onPress={handleCrearUsuario} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
    },
    input: {
        marginBottom: 20,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 10,
    },
});
