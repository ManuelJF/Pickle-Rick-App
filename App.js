import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import store from './src/store'
import PickleStack from './src/routes'

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PickleStack />
      </NavigationContainer>
    </Provider>
  )
}

export default App
