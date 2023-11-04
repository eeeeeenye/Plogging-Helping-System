import React, { useState } from 'react'
import Background from '../../components/Background'
import BackButton from '../../components/BackButton'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import styles from './authScreensStyles/ResidenceStyle'

import { WebView } from 'react-native-webview'
import { TouchableOpacity, StyleSheet, View, Image, Text } from 'react-native'

import { emailValidator } from '../../helpers/emailValidator'
import HeaderBack2 from '../../components/Headerback2'
import Postcode from '@actbase/react-daum-postcode'
const PostCode = ({ navigation }) => {
  // Geolocation.requestAuthorization()
  // DaumPostcodeEmbed

  return (
    <View style={styles.container}>
      <HeaderBack2 title={'주소 검색'}></HeaderBack2>

      <View style={styles.content}>
        <View>
          <Text>내 위치 설정하기</Text>
        </View>
        <View>
          <Postcode></Postcode>
        </View>
      </View>
    </View>
  )
}
export default PostCode
