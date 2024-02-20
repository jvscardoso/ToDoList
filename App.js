import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from "./src/pages/Home/"  // Certifique-se de que o caminho está correto
import NewTask from './src/pages/NewTask'
import Details from './src/pages/Details'

const Stack = createStackNavigator()

export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Homee"
          component={Home}
          options={{
            headerTintColor: "purple"
          }}
        />

        <Stack.Screen 
          name="NewTask"
          component={NewTask}
          options={{
            headerTintColor: "cyan"
          }}
        />

        <Stack.Screen 
          name="Details"
          component={Details}
          options={{
            headerTintColor: "cyan"
          }}
        />
      
    </Stack.Navigator>
   </NavigationContainer>
  );
}

