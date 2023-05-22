import React from 'react'
import {useState, useEffect} from 'react-native'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { theme } from './src/core/theme'
import StackNav from './src/navigater/Stack'
import TabNav from './src/navigater/Tab'
import clientManager from './src/helpers/localStorage'

export default function App() {
  

  return (
      <Provider theme={theme}>
        <NavigationContainer>
          <StackNav/>
        </NavigationContainer>
      </Provider>
  )
}
