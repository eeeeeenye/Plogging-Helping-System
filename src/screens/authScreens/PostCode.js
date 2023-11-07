import React, { useState, useEffect } from 'react'

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
import LocationSettings from '../map/LocationSetting.js'
import axios from 'axios'
import daumPostSet from '../map/htmlCode/daumPostHTML.js'
import ResidenceSettingScreen from './ResidenceSettingScreen.js'
// import { platform } from 'os'
const PostCode = ({ navigation }) => {
  const handleMyLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      console.log(status)
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        return
      }
      navigation.navigate('myLocationMap')
    } catch (error) {
      console.error('현재 위치를 가져오는 중 오류 발생:', error)
    }
  }

  const getSearchAddress = (data) => {
    let defaultAddress = ''
    console.log(data.roadAddress)

    navigation.navigate('ResidenceSetting', {
      address: data.roadAddress,
    })
  }
  return (
    <View style={styles.container}>
      <HeaderBack2 title={'주소 검색'}></HeaderBack2>

      <View style={styles.content}>
        <TouchableOpacity onPress={handleMyLocation} style={styles.mylocation}>
          <Text>현재 위치로 설정</Text>
        </TouchableOpacity>
        {/* <View>
          <Text>내 위치 설정하기</Text>
        </View> */}
        <View>
          <Postcode
            style={styles.postcode}
            // jsOptions={{ animation: true }}
            onSelected={(data) => {
              getSearchAddress(data)
            }}
          />
        </View>
      </View>
    </View>
    // </View>
  )
}
export default PostCode
