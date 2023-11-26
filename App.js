import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Provider } from 'react-redux'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import StackNav from './src/navigater/Stack'
import store from './src/slices/store'
import * as SplashScreen from 'expo-splash-screen'

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function delay_splash() {
  await SplashScreen.preventAutoHideAsync()
  await sleep(3000)
  await SplashScreen.hideAsync()
}

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
