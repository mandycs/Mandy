import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../App'; // Asumiendo que RootStackParamList está definido en App.tsx

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Comandero'>;

type ScreenName = keyof RootStackParamList;

type Props = {
    navigation: HomeScreenNavigationProp;
};
type button = {
    id: string;
    title: string;
    screen: ScreenName;
};


const buttons = [
    { id: '1', title: 'Nueva Comanda', screen: 'Comanda' },
    { id: '2', title: 'Comandas Abiertas', screen: 'Profile' },
    { id: '3', title: 'Configuración', screen: 'Settings' },
    // Añade más botones según necesites
];

export function HomeScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <FlatList
                data={buttons}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate(item.screen as ScreenName)}
                    >
                        <Text style={styles.buttonText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                // Esto crea dos columnas
                numColumns={2}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        margin: 10,
        backgroundColor: '#007bff', // Color de fondo para los botones, ajusta según tu tema
        padding: 15,
        borderRadius: 5,
        width: '45%', // Ajusta el ancho para controlar el espaciado entre botones
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    // Agrega más estilos según necesites
});