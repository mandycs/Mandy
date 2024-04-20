import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type Categoria = {
    id: number;
    nombre: string;
};

type Plato = {
    id: number;
    nombre: string;
    precio: string;
    categoria: Categoria;
};

export function NuevaComandaScreen() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
    const [platos, setPlatos] = useState<Plato[]>([]);
    const [platosSeleccionados, setPlatosSeleccionados] = useState<Plato[]>([]);

    useEffect(() => {
        getCategorias();
        getPlatos();
    }, []);

    const getCategorias = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const headers = {
            Authorization: `Token ${userToken}`,
            'Content-Type': 'application/json',
        };
        const response = await axios.get('http://192.168.1.129:8000/comanda/categorias/', { headers });
        if (response.status === 200) {
            setCategorias(response.data);
        }
    };

    const getPlatos = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const headers = {
            Authorization: `Token ${userToken}`,
            'Content-Type': 'application/json',
        };
        const response = await axios.get('http://192.168.1.129:8000/comanda/platos/', { headers });
        if (response.status === 200) {
            setPlatos(response.data);
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.categoriasContainer}>
                <FlatList
                    data={categorias}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.categoria}
                            onPress={() => setCategoriaSeleccionada(item.id)}
                        >
                            <Text style={styles.categoriaTexto}>{item.nombre}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            <ScrollView style={styles.platosContainer}>
                {categoriaSeleccionada && (
                    <FlatList
                        data={platos.filter(plato => plato.categoria.id === categoriaSeleccionada)}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.plato}
                                onPress={() => setPlatosSeleccionados(current => [...current, item])}
                            >
                                <Text style={styles.platoTexto}>{item.nombre} - ${item.precio}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                )}
            </ScrollView>
            <View style={styles.seleccionadosContainer}>
                <Text style={styles.subtitulo}>Platos en la comanda:</Text>
                <FlatList
                    data={platosSeleccionados}
                    renderItem={({ item }) => (
                        <Text style={styles.platoSeleccionadoTexto}>{item.nombre} - ${item.precio}</Text>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoriasContainer: {
        height: 80, // Altura fija para las categorías
        backgroundColor: '#f0f0f0',
    },
    platosContainer: {
        flex: 1, // Ocupa todo el espacio disponible entre las categorías y los platos seleccionados
    },
    seleccionadosContainer: {
        height: 400, // Altura fija para los platos seleccionados
        backgroundColor: '#eee',
        padding: 10,
    },
    categoria: {
        padding: 10,
        backgroundColor: 'lightblue',
        margin: 5,
        borderRadius: 5,
        width: 150,
        alignItems: 'center',
    },
    categoriaTexto: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    plato: {
        padding: 10,
        backgroundColor: 'lightblue',
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    platoTexto: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    platoSeleccionadoTexto: {
        fontSize: 18, // Aumenta el tamaño de la fuente para mejor legibilidad
        padding: 10, // Aumenta el padding para más espacio alrededor del texto
        margin: 5, // Espacio entre los elementos
        backgroundColor: '#f9f9f9', // Fondo claro para cada elemento
        borderRadius: 10, // Bordes redondeados para una apariencia más suave
        borderWidth: 1, // Borde sutil para definir los elementos
        borderColor: '#ccc', // Color del borde
        color: '#333', // Color del texto oscuro para contrastar con el fondo
        textAlign: 'left', // Centra el texto horizontalmente
    },
});
