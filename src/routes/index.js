import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Characters, CharacterDetails } from '../containers'

const Stack = createStackNavigator()

function PickleStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Characters}
        options={{
          title: 'Rick & Morty API',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#12b0c9',
            fontSize: 18
          }
        }}
      />
      <Stack.Screen name='Details' component={CharacterDetails} />
    </Stack.Navigator>
  )
}

export default PickleStack
