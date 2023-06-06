import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Ionicons } from '@expo/vector-icons'
import { Text } from 'react-native-paper'
import {
  Dashboard,
  RankingScreen,
  Public_toilet,
  MyPage
} from '../screens'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()
export default function TabNav() {
  return (
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          tabBarStyle: {
            height: 80, 
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
                fontSize: 25,
              },
              tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
            }}
          />

        <Tab.Screen
            name="toliet"
            component={Public_toilet}
            options={{
              title: '화장실 정보',
              headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="md-locate" size={24} color="purple" style={{ marginRight: 5 }} />
                  <Text style={{ fontSize: 25, fontWeight: 'bold' }}>화장실 위치 표시</Text>
                </View>
              ),
              headerTitleAlign: 'left',
              headerStyle: {
                height: 100, 
              },
              headerTitleStyle: {
                fontSize: 25,
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="toilet" color={color} size={size} />
            ),}}
        />

        <Tab.Screen
            name="Ranking"
            component={RankingScreen}
            options={{
              title: '명예의 전당',
              headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="md-locate" size={24} color="purple" style={{ marginRight: 5 }} />
                  <View style={{flexDirection:'column'}}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>명예의 전당</Text>
                    <Text style={{fontSize:12, color:'gray', marginTop:5}}>* 일주일 단위로 업데이트됩니다.</Text>
                  </View>
                </View>
              ),
              headerTitleAlign: 'left',
              headerStyle: {
                height: 120, 
              },
              headerTitleStyle: {
                fontSize: 25,
              },
              tabBarIcon: ({ color, size }) => (
              <Icon name="star" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
            name="MyPage"
            component={MyPage}
            options={{
                title: '마이페이지',
                headerTitle: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Ionicons name="md-locate" size={24} color="purple" style={{ marginRight: 5 }} />
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'left' }}>마이페이지</Text>
                    </View>
                  </View>
                ),
                headerTitleAlign: 'left',
                headerStyle: {
                  height: 120, 
                },
                tabBarIcon: ({ color, size }) => (
                  <Icon name="account-circle" color={color} size={size} />
                ),
              }}
        />
        
      </Tab.Navigator>
  )
}