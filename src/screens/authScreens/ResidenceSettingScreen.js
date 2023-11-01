import React, { useState } from 'react'
import Background from '../../components/Background'
import BackButton from '../../components/BackButton'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'

import { WebView } from 'react-native-webview';

import { emailValidator } from '../../helpers/emailValidator'
export default function ResidenceSettingScreen({ navigation }) {
  // Geolocation.requestAuthorization()
  // DaumPostcodeEmbed
  const handleComplete = (data) => {
    // 선택된 주소 정보는 'data' 객체에 담겨 옵니다.
    console.log(data)
  }

  return (
    <Background>
      <Logo />
      <WebView>

        
      </WebView>
    </Background>
  )
}
