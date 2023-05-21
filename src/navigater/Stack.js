import React from 'react'
import {
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen,
    Dashboard,
    KakaoLoginScreen,
    LocationSettings,
    KakaoMapScreen
  } from '../screens'

import { createStackNavigator } from '@react-navigation/stack'
  
const Stack = createStackNavigator()

function StackNav(){
    return(
        <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="homeMain" component={KakaoMapScreen} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
            <Stack.Screen
              name="KakaoLoginScreen"
              component={KakaoLoginScreen}
            />
            <Stack.Screen name="Location" component={LocationSettings} />
        </Stack.Navigator>
    )
}

export default StackNav;