import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { theme } from './src/core/theme'
import StackNav from './src/navigater/Stack'

export default function App() {

  return (
      <Provider theme={theme}>
        <NavigationContainer>
          <StackNav/>
        </NavigationContainer>
      </Provider>
  )
}
