import React from 'react'
import {useState} from 'react-native'
import {
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen,
    Dashboard,
    KakaoLoginScreen,
    LocationSettings,
    locationTracker
} from '../screens'
import TabNav from './Tab'

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()
  // const [State,] = useState() -> 상태값 변경하는 코드 추가 : 로그인 상태를 관리하기 위하여         

  // function State(){            -> 리덕스에서 상태값 가져오는 코드 추가 : useEffect에서 사용할 것
  //   redux store
  // }

  // useEffect(()=>{             -> 함수실행 랜더링 될때 or if (리덕스의 로그인 상태값이 변경되었다면) State값 변경으로 해서 State값이 변경될 때마다 시행
  //   state                     -> State가 실행될 때마다 시행되는 코드는 useEffect(()=>{},[State]) 이런식으로 대활호를 뒤에 붙여줌
  // })

function StackNav(){

  // if (State!==null) return null   -> 로그인 상태가 true인지 false인지에 따라 Navigator를 다르게 실행해줄게요~~할 때 이렇게!

    return(
        <Stack.Navigator>
          <Stack.Screen 
                name='TabNav' 
                component={TabNav}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeMain" component={locationTracker} />
            <Stack.Screen name="LocationSetting" component={LocationSettings} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen 
                name="dash"
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
            <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
            />
            <Stack.Screen
                name="KakaoLoginScreen"
                component={KakaoLoginScreen}
            />
            
        </Stack.Navigator>
    )
}

export default StackNav;
