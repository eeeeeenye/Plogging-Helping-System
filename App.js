import React from 'react'
import { Provider } from 'react-redux'
import { DefaultTheme, Provider as PaperProvider, Text } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import StackNav from './src/navigater/Stack'
import store from './src/slices/store'

export default function App() {
  const theme = {
    ...DefaultTheme,
    // 기존 테마 설정 유지
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}
