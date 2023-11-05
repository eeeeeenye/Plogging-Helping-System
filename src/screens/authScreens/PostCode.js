import React, { useState } from 'react'

import Background from '../../components/Background'
import BackButton from '../../components/BackButton'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import styles from './authScreensStyles/PostCodeStyle.js'

import { WebView } from 'react-native-webview'

import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native'
import * as Location from 'expo-location'
import { emailValidator } from '../../helpers/emailValidator'
import HeaderBack2 from '../../components/Headerback2'
// import { Location } from 'expo'
import Postcode from '@actbase/react-daum-postcode'
// import { platform } from 'os'
const PostCode = ({ navigation }) => {
  let { status } = Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    console.log('Permission to access location was denied')
    return
  }
  const getCurrentLocation = async () => {
    try {
      console.log(Location)
      const { coords } = await Location.getCurrentPositionAsync({})
      //   const { latitude, longitude } = coords
      console.log(coords)
      //   console.log(`현재 위치: 위도 ${latitude}, 경도 ${longitude}`)
    } catch (error) {
      console.error('현재 위치를 가져오는 중 오류 발생:', error)
    }
  }

  getCurrentLocation()
  return (
    <View style={styles.container}>
      <HeaderBack2 title={'주소 검색'}></HeaderBack2>

      <View style={styles.content}>
        {/* <View>
          <Text>내 위치 설정하기</Text>
        </View> */}
        <View>
          <View>
            {/* <WebView
              source={{
                uri: 'http://postcode.damoo.net/',
              }}
            ></WebView> */}
            <Postcode
              style={styles.postcode}
              jsOptions={{ animation: true }}
              onSelected={(data) => {
                alert(JSON.stringify(data))
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
export default PostCode
