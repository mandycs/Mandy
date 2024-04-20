import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

type NewCategoryProps = {
    navigation: StackNavigationProp<RootStackParamList, 'NewCategory'>;
};

export function NewCategory({ navigation }: NewCategoryProps) {
    const [categoryName, setCategoryName] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

    const handleCreateCategory = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            console.log('userToken:', userToken);
            const headers = {
                Authorization: `Token ${userToken}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post('http://192.168.1.129:8000/comanda/categorias/', {
                nombre: categoryName
            }, { headers });

            if (response.status === 201) {
                // Mostrar el modal cuando se haya creado la categoría con éxito
                setIsModalVisible(true);
                setCategoryName(''); // Limpiar el campo de texto
            }
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Category Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter category name"
                value={categoryName}
                onChangeText={text => setCategoryName(text)}
            />
            <Button title="Create Category" onPress={handleCreateCategory} />

            {/* Modal que se muestra cuando se crea la categoría con éxito */}
            <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Category created successfully!</Text>
                    <Button title="Close" onPress={() => setIsModalVisible(false)} />
                </View>
            </Modal>
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
    // Estilos para el contenido del modal
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
});
