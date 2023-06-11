import React from 'react'
import {
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen,
    KakaoLoginScreen,
    LocationSettings,
    locationTracker,
    CameraScreen,
    RecordScreen,
    MyPage,
    pointHistory,
    RecordHistory
} from '../screens'
import { useSelector } from 'react-redux'
import TabNav from './Tab'
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

function StackNav(){
    const State = useSelector((state)=>state.auth.user)
    const status = State ? State.status : null;
    console.log(status)
    // 로그인 한 상태가 아니라면 null 나옴.
    if (status===undefined || status===null ) {
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
                    headerLeft: () => (
                        <Ionicons
                          name="arrow-back"
                          size={24}
                          color="black"
                          style={{ marginLeft: 10 }}
                        />
                      ),
                    headerTitle: '거주지 설정',
                    headerTitleAlign: 'left',
                    headerShown: true,
                    headerStyle: {
                    elevation: 25,
                    },
                }}
            />

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
            <Stack.Screen
                name="MyPage"
                component={MyPage}
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
                <Stack.Screen name="locationTracking" component={locationTracker} />
                <Stack.Screen name='Camera' component={CameraScreen} />
                <Stack.Screen name='Record' component={RecordScreen}/>
                <Stack.Screen
                    name='point'
                    component={pointHistory}
                    options={{
                    headerTitle: '포인트 내역 조회',
                    }}
                />
                <Stack.Screen
                    name='recordHistory'
                    component={RecordHistory}
                    options={{
                    headerTitle: '플로깅 내역 조회',
                    }}
                />

                {/* <Stack.Screen name='Ranking' component={RankScreen} /> */}
            </Stack.Navigator>
        )
    }
}

export default StackNav;
