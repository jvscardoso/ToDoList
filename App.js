import React from 'react' 
import { NavigationContainer } from '@react-navigation/native' 
import { createStackNavigator } from '@react-navigation/stack' 
import FlashMessage from 'react-native-flash-message' 
import Home from "./src/pages/Home/"
import NewTask from './src/pages/NewTask'
import Details from './src/pages/Details'

const Stack = createStackNavigator() 

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Minhas tarefas"
            component={Home}
            options={{
              headerTintColor: "purple"
            }}
          />

          <Stack.Screen
            name="NewTask"
            component={NewTask}
            options={{
              headerTitle: 'Cadastrar novo',
              headerTintColor: "purple"
            }}
          />

          <Stack.Screen
            name="Details"
            component={Details}
            options={{
              headerTitle: 'Detalhes',
              headerTintColor: "purple"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  ) 
}
