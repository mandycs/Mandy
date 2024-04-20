// SettingsScreen.tsx

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;
type Props = {
    navigation: SettingsScreenNavigationProp;
};

export function SettingsScreen ({ navigation }: Props) {
    const handleCreateCategory = () => {
        // Lógica para crear una nueva categoría
        navigation.navigate('NewCategory');
    };

    const handleCreateDish = () => {
        // Lógica para crear un nuevo plato
        navigation.navigate('NewPlate');
    };

    const handleCreateUser = () => {
        // Lógica para crear un nuevo usuario
        console.log('Crear usuario');
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCreateCategory}
                >
                    <Text style={styles.buttonText}>Crear categoría</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCreateDish}
                >
                    <Text style={styles.buttonText}>Crear plato</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCreateUser}
                >
                    <Text style={styles.buttonText}>Crear usuario</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});


