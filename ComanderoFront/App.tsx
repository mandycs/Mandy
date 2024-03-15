import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './components/HomeScreen';


export type RootStackParamList = {
  Home: undefined; // No se espera ningún parámetro para Home
  Details: undefined; // No se espera ningún parámetro para Details, pero podrías añadir algunos si necesitas
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
