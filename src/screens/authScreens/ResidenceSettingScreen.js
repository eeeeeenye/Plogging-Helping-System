import React, { useState } from 'react'
import Background from '../../components/Background'
import BackButton from '../../components/BackButton'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { emailValidator } from '../../helpers/emailValidator'
import Postcode from 'react-daum-postcode'
export default function ResidenceSettingScreen({ navigation }) {
  // Geolocation.requestAuthorization()
  // DaumPostcodeEmbed
  return (
    <Background>
      <Logo />
      <Postcode></Postcode>
    </Background>
  )
}
