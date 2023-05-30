import React from 'react'
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  Dashboard,
} from '../screens'

const Tab = createBottomTabNavigator()
export default function TabNav() {
  return (
      <Tab.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
          tabBarStyle: {
            height: 80, // Adjust the tab height as desired
          },
        }}
      >
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: '홈메인',
              headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="md-locate" size={24} color="purple" style={{ marginRight: 5 }} />
                  <Text style={{ fontSize: 25, fontWeight: 'bold' }}>지구동</Text>
                </View>
              ),
              headerTitleAlign: 'left',
              headerStyle: {
                height: 100, 
              },
              headerTitleStyle: {
                fontSize: 25, // Adjust the font size as desired
              },
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
                <Icon name="store" color={color} size={size} />
             ),
          }}
        />
        <Tab.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
                title: '게시판',
                tabBarIcon: ({ color, size }) => (
                <Icon name="message" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
                title: '내정보',
                tabBarIcon: ({ color, size }) => (
              <Icon name="account-circle" color={color} size={size} />
            ),
          }}
        />
        
      </Tab.Navigator>
  )
}