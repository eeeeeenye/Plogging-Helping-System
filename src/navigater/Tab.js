import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  Dashboard,
} from '../screens'

const Tab = createBottomTabNavigator()
export default function TabNav() {
  return (
      <Tab.Navigator initialRouteName="Dashboard">
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: '홈메인',
              headerTitle: `Let's Plogging!`,
              tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
            }}
          />

        <Tab.Screen
            name="StartScreen"
            component={StartScreen}
            options={{
                headerShown: false,
                title: '스토어',
                tabBarIcon: ({ color, size }) => (
                <Icon name="dashboard" color={color} size={size} />
             ),
          }}
        />
        <Tab.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
                title: '게시판',
                tabBarIcon: ({ color, size }) => (
                <Icon name="notifications" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
                title: '내정보',
                tabBarIcon: ({ color, size }) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
        />
        
      </Tab.Navigator>
  )
}