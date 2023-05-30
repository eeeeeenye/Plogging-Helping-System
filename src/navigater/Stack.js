import React from 'react'
import {
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen,
    Dashboard,
    KakaoLoginScreen,
    LocationSettings,
    locationTracker,
    CameraScreen,
    RankScreen
} from '../screens'
import { useSelector } from 'react-redux'
import TabNav from './Tab'

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

function StackNav(){
    const State = useSelector((state)=>state.auth.user)
    // 로그인 한 상태가 아니라면 null 나옴.
    if (State===null ) {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="StartScreen" 
                component={StartScreen}
                options={{
                    headerShown:false,
                    headerStyle:{
                    shadowColor:'#000', 
                    elevation:25,}}} />
            <Stack.Screen 
                name="LoginScreen" 
                component={LoginScreen}
                options={{
                    headerShown:false,
                    headerStyle:{
                    shadowColor:'#000', 
                    elevation:25,}}} />
            <Stack.Screen 
                name="LocationSetting" 
                component={LocationSettings}
                options={{
                    headerShown:false,
                    headerStyle:{
                    shadowColor:'#000', 
                    elevation:25,}}} />
            <Stack.Screen 
                name="RegisterScreen" 
                component={RegisterScreen}
                options={{
                    headerShown:false,
                    headerStyle:{
                    shadowColor:'#000', 
                    elevation:25,}}} />
            <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
                options={{
                    headerShown:false,
                    headerStyle:{
                    shadowColor:'#000', 
                    elevation:25,}}}
            />
            <Stack.Screen
                name="KakaoLoginScreen"
                component={KakaoLoginScreen}
                options={{
                    headerShown:false,
                    headerStyle:{
                    shadowColor:'#000', 
                    elevation:25,}}}
            />
        </Stack.Navigator>
    )}else{
        return(
            <Stack.Navigator>
              <Stack.Screen 
                    name='TabNav' 
                    component={TabNav}
                    options={{
                        headerShown:false
                    }}
                />
                <Stack.Screen 
                    name="HomeMain"
                    component={Dashboard}
                    options={{
                        headerShown:true,
                        headerStyle:{
                            height:90,
                            elevation:25,
                        },
                    }}
                />
                <Stack.Screen name="locationTracking" component={locationTracker} />
                <Stack.Screen name='Camera' component={CameraScreen} />
                {/* <Stack.Screen name='Ranking' component={RankScreen} /> */}
            </Stack.Navigator>
        )
    }
}

export default StackNav;
