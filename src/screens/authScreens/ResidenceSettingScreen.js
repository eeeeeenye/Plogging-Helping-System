import React, { useState } from 'react'
import Background from '../../components/Background'
import BackButton from '../../components/BackButton'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import styles from './authScreensStyles/ResidenceStyle.js'
import Constants from 'expo-constants'
import { WebView } from 'react-native-webview'
import { TouchableOpacity, StyleSheet, View, Image, Text } from 'react-native'
const apiKey = Constants.manifest.extra.KAKAO_JAVASCRIPT_KEY

import { emailValidator } from '../../helpers/emailValidator'
const ResidenceSettingScreen = ({ navigation, route }) => {
  // Geolocation.requestAuthorization()
  // DaumPostcodeEmbed
  const handlePostCode = (data) => {
    // 선택된 주소 정보는 'data' 객체에 담겨 옵니다.
    // console.log(data)

    navigation.navigate('PostCode')
  }

  console.log(route.params)
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo />
        <View style={styles.box}>
          <TouchableOpacity onPress={handlePostCode}>
            <View style={styles.search_box}>
              <Image source={require('../../assets/search.png')}></Image>
              {route.params === undefined ? (
                <Text style={styles.search_text}>{`주소 검색`}</Text>
              ) : (
                <Text
                  style={styles.search_text}
                >{`${route.params.address}`}</Text>
              )}
            </View>
            <View style={styles.line}></View>
          </TouchableOpacity>
        </View>

        <Button
          mode={'contained'}
          style={{ marginTop: 30, width: `80%`, borderRadius: 20 }}
        >
          거주지 설정하기
        </Button>
      </View>
    </View>
  )
}
export default ResidenceSettingScreen
