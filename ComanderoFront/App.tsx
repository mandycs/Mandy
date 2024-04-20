import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './components/Homescreen';
import { NuevaComandaScreen } from './components/NuevaComanda';
import { LoginScreen } from './components/Loginscreen';
import { SettingsScreen } from './components/SettingsScreen';
import { NewCategory } from './components/NewCategory';
import { NewPlate } from './components/NewPlate';



export type RootStackParamList = {
  Login: undefined; // No se espera ningún parámetro para Login
  Comandero: undefined; // No se espera ningún parámetro para Home  
  Comanda : undefined;
  Settings : undefined;
  NewCategory : undefined;
  NewPlate : undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type ScreenName = keyof RootStackParamList;

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Comandero" component={HomeScreen} />
        <Stack.Screen name="Comanda" component={NuevaComandaScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="NewCategory" component={NewCategory} />
        <Stack.Screen name="NewPlate" component={NewPlate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
