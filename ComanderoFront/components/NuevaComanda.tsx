import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const userToken = AsyncStorage.getItem('userToken');

type Categoria = {
    id: string;
    nombre: string;
};

type Plato = {
    id: string;
    nombre: string;
    categoriaId: string;
};

const categorias: Categoria[] = [
    { id: '1', nombre: 'Entrantes' },
    { id: '2', nombre: 'Principales' },
    { id: '3', nombre: 'Postres' },
    { id: '4', nombre: 'Bebidas' },
    { id: '5', nombre: 'Cafés' },

];

const platos: Plato[] = [
    { id: '1', nombre: 'Ensalada César', categoriaId: '1' },
    { id: '2', nombre: 'Hamburguesa', categoriaId: '2' },
    { id: '3', nombre: 'Tiramisú', categoriaId: '3' },
    { id: '4', nombre: 'Coca-Cola', categoriaId: '4' },
    { id: '5', nombre: 'Café Americano', categoriaId: '5' },
    { id: '6', nombre: 'Patatas Bravas', categoriaId: '1' },
    { id: '7', nombre: 'Pizza', categoriaId: '2' },
    { id: '8', nombre: 'Flan', categoriaId: '3' },
    { id: '9', nombre: 'Fanta', categoriaId: '4' },
    { id: '10', nombre: 'Café con leche', categoriaId: '5' },
];

export function NuevaComandaScreen() {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
    const [platosSeleccionados, setPlatosSeleccionados] = useState<Plato[]>([]);

    const platosFiltrados = platos.filter(plato => plato.categoriaId === categoriaSeleccionada);

    return (
        <View style={styles.container}>
            {categoriaSeleccionada === null ? (
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
                    keyExtractor={item => item.id}
                />
            ) : (
                <View style={styles.platosContainer}>
                    <TouchableOpacity
                        style={styles.volverButton}
                        onPress={() => setCategoriaSeleccionada(null)}
                    >
                        <Text>Volver a Categorías</Text>
                    </TouchableOpacity>
                    <View style={styles.platossubContainer}>
                        <FlatList
                            data={platosFiltrados}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.plato}
                                    onPress={() => setPlatosSeleccionados(current => [...current, item])}
                                >
                                    <Text style={styles.platoTexto}>{item.nombre}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            )}

            <View style={styles.seleccionadosContainer}>
                <Text style={styles.subtitulo}>Platos en la comanda:</Text>
                <FlatList
                    data={platosSeleccionados}
                    renderItem={({ item }) => (
                        <Text style={styles.platoSeleccionadoTexto}>{item.nombre}</Text>
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
    categoria: {
        padding: 10,
        backgroundColor: 'lightgray',
        margin: 5,
        borderRadius: 5,
        // Define un ancho fijo para los botones de categorías
        width: 150,
        alignItems: 'center', // Centra el texto en el botón
    },
    categoriaTexto: {
        fontWeight: 'bold',
        textAlign: 'center', // Asegura que el texto esté centrado si es más largo de una línea
    },
    plato: {
        width: 150,
        padding: 10,
        backgroundColor: 'lightblue',
        margin: 5,
        borderRadius: 5,
        // Define un ancho fijo para los botones de platos
        alignItems: 'center', // Centra el texto en el botón
    },
    platoTexto: {
        fontWeight: 'bold',
        textAlign: 'center', // Asegura que el texto esté centrado si es más largo de una línea
    },
    seleccionadosContainer: {
        flex: 1,
        backgroundColor: '#red',
        padding: 10,
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    platoSeleccionadoTexto: {
        fontSize: 16,
        padding: 2,
    },
    platosContainer: {
        flex: 1,
    },
    volverButton: {
        padding: 10,
        margin: 5,
        borderRadius: 25,
        width: '25%',
        backgroundColor: 'lightblue',
    },
    platossubContainer: {
        flexDirection: 'row',
    },

    // Agrega más estilos según necesites
});
