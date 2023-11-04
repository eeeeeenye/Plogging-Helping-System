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
  RecordHistory,
} from '../screens'
import { useSelector } from 'react-redux'
import TabNav from './Tab'
import { Ionicons } from '@expo/vector-icons'

import { createStackNavigator } from '@react-navigation/stack'
import HeaderBackScroll from '../components/HeaderbackScroll'
import Profile from '../screens/mypage/profile'
import EditProfile from '../screens/mypage/EditProfile'
import PostHistory from '../screens/mypage/PostHistory'
import PrivacyPolicy from '../screens/mypage/PrivacyPolicy'
import TermsAndConditions from '../screens/mypage/TermsAndCondition'
import IssueReport from '../screens/mypage/IssueReport'
import PostReport from '../screens/mypage/PostReport'
import ReportHistory from '../screens/mypage/ReportsHistory'
import Community from '../screens/communityScreens/community'
import CommunityInfo from '../screens/communityScreens/CommunityInfo'
import CreateCommunity from '../screens/communityScreens/CreateCommunity'
import Menu from '../screens/communityScreens/menu'
import CommunityRanking from '../screens/communityScreens/CommunityRanking'
import CommunityMyList from '../screens/communityScreens/CommunityMyList'
import EditPasswordScreen from '../screens/authScreens/EditPasswordScreen'
import ResidenceSettingScreen from '../screens/authScreens/ResidenceSettingScreen'
import PostCode from '../screens/authScreens/PostCode'

// import ProfileScreen from '../screens/mypage/ProfileScrren'

const Stack = createStackNavigator()

function StackNav() {
  const State = useSelector((state) => state.auth.user)
  const status = State ? State.status : null
  // 로그인 한 상태가 아니라면 null 나옴.
  if (status === undefined || status === null) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="EditPassword"
          component={EditPasswordScreen}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="ResidenceSetting"
          component={ResidenceSettingScreen}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="PostCode"
          component={PostCode}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="communityRanking"
          component={CommunityRanking}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="communityMyList"
          component={CommunityMyList}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="communityInfo"
          component={CommunityInfo}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="createCommunity"
          component={CreateCommunity}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="community"
          component={Community}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="IssueReport"
          component={IssueReport}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="ReportHistory"
          component={ReportHistory}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="PostReport"
          component={PostReport}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="postHistory"
          component={PostHistory}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="Privacy"
          component={PrivacyPolicy}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
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
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="KakaoLoginScreen"
          component={KakaoLoginScreen}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="point"
          component={pointHistory}
          options={{
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="MyPage"
          component={MyPage}
          options={{
            title: '마이페이지',
            headerShown: false,
            headerStyle: {
              shadowColor: '#000',
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="recordHistory"
          component={RecordHistory}
          options={{
            headerShown: false,
            headerTitle: '플로깅 내역 조회',
          }}
        />

        <Stack.Screen
          name="menu"
          component={Menu}
          options={{
            headerShown: false,
            headerTitle: '플로깅 내역 조회',
          }}
        />
      </Stack.Navigator>
    )
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="TabNav"
          component={TabNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="locationTracking" component={locationTracker} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Record" component={RecordScreen} />

        <Stack.Screen
          name="recordHistory"
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

export default StackNav
