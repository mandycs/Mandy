import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { RootStackParamList } from '../App';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

type CreateDishFormProps = {
    navigation: StackNavigationProp<RootStackParamList, 'NewPlate'>;
};
type Categoria = {
    id: number;
    nombre: string;
};

export function NewPlate({ navigation }: CreateDishFormProps) {
    const [categorias, setCategorias] = useState<Categoria[]>([]); // Inicializa el estado con un arreglo vacío
    const [dishName, setDishName] = useState('');
    const [dishPrice, setDishPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

    useEffect(() => {
        getCategorias();
    }, []);
    const getCategorias = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const headers = {
                Authorization: `Token ${userToken}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.get('http://192.168.1.129:8000/comanda/categorias/',
                { headers });
            if (response.status === 200) {
                setCategorias(response.data);
            }
        } catch (error) {
            console.error('Error fetching categorias:', error);
        }
    };
    const handleCreateDish = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const headers = {
                Authorization: `Token ${userToken}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.post('http://192.168.1.129:8000/comanda/platos/', {
                nombre: dishName,
                precio: dishPrice,
                categoria_id: selectedCategory,
            }, { headers });
            if (response.status === 201) {
                setIsModalVisible(true);
                setDishName('');
                setDishPrice('');
                setSelectedCategory(null);
            }
        }
        catch (error) {
            console.error('Error creating dish:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Dish Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter dish name"
                value={dishName}
                onChangeText={text => setDishName(text)}
            />
            <Text style={styles.label}>Dish Price:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter dish price"
                value={dishPrice}
                onChangeText={text => setDishPrice(text)}
                keyboardType='decimal-pad'
            />
            <Text style={styles.label}>Dish Category:</Text>
            <RNPickerSelect
                style={{
                    inputIOS: styles.inputIOS,
                    inputAndroid: styles.inputAndroid,
                }}
                onValueChange={(value) => setSelectedCategory(value)}
                items={categorias.map(categoria => ({ label: categoria.nombre, value: categoria.id }))}
                placeholder={{ label: 'Select a category', value: null }}
            />
            <Button title="Create Dish" onPress={handleCreateDish} />
            <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Dish created successfully!</Text>
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
    inputIOS: {
        marginBottom: 20,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 10,
        color: 'black',
    },
    inputAndroid: {
        marginBottom: 20,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 10,
        color: 'black',
    },
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
