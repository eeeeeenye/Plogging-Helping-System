import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from '../screens'

const Tab = createBottomTabNavigator()
export default function TabNav() {
  return (
      <Tab.Navigator initialRouteName="Dashboard">
        <Tab.Screen
            name="StartScreen"
            component={StartScreen}
            options={{
                headerShown: false,
                title: 'StartScreen',
                tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />
             ),
          }}
        />
        <Tab.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
                title: 'LoginScreen',
                tabBarIcon: ({ color, size }) => (
                <Icon name="notifications" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
                title: 'RegisterScreen',
                tabBarIcon: ({ color, size }) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
            <Icon name="dashboard" color={color} size={size} />
    ),
  }}
/>
      </Tab.Navigator>
  )
}