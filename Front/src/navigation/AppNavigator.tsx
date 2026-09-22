import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importe todas as suas telas conforme a sua estrutura de pastas
import TelaInicial from '../pages/TelaInicial/telaInicial';
import TelaLogin from '../pages/telaLogin/telaLogin';
import TelaRegistro1 from '../pages/TelaRegistro/telaRegistro1';
import TelaRegistro2 from '../pages/TelaRegistro/telaRegistro2';
import TelaRegistro3 from '../pages/TelaRegistro/telaRegistro3';
import HomeScreen from '../pages/home/HomeScreen';
import Relatar from '../pages/Relatar/relatar';
import RelatoDetalhesScreen from '../pages/DetalhesRelato/RelatoDetalhesScreen';
import MudarSenha1 from '../pages/MudarSenha/MudarSenha1';
import MudarSenha2 from '../pages/MudarSenha/MudarSenha2';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="TelaInicial"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="TelaRegistro1" component={TelaRegistro1} />
        <Stack.Screen name="TelaRegistro2" component={TelaRegistro2} />
        <Stack.Screen name="TelaRegistro3" component={TelaRegistro3} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Relatar" component={Relatar} />
        <Stack.Screen name="RelatoDetalhes" component={RelatoDetalhesScreen}/>
        <Stack.Screen name="MudarSenha1" component={MudarSenha1}/>
        <Stack.Screen name="MudarSenha2" component={MudarSenha2}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}