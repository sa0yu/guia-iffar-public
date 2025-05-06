import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { pt, registerTranslation } from 'react-native-paper-dates'
registerTranslation('pt', pt)


//importação de telas
import Home from './src/screens/home';
import Cursos from './src/screens/Cursos';
import Eventos from './src/screens/Eventos';
import Sobre from './src/screens/Sobre';

import DetalheCurso from './src/screens/DetalheCurso';
import DetalheEvento from './src/screens/DetalheEvento';

import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';



//importação do tema
import { tema } from './src/config/tema'; 
import { UserProvider } from './src/contexto/UsuarioContexto';
import FormNovoEvento from './src/screens/FormNovoEvento';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider theme={tema}>
      <UserProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: true,
              tabBarActiveTintColor: tema.colors.primary,
            }}
          >
            <Tab.Screen name="Login" component={Login} options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
              
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Cursos"
              component={Cursos}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="book-outline" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Eventos"
              component={Eventos}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="calendar-month-outline" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Sobre"
              component={Sobre}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="information-outline" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen name="DetalheCurso" component={DetalheCurso} options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
            <Tab.Screen name="DetalheEvento" component={DetalheEvento} options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />
            <Tab.Screen name="FormNovoEvento" component={FormNovoEvento} options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />

            <Tab.Screen name="Cadastro" component={Cadastro} options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }} />

          
          </Tab.Navigator>
        </NavigationContainer>
      </UserProvider>
    </PaperProvider>
  );
}
