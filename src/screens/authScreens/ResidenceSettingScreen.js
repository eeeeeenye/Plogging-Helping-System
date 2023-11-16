import React, { useState, useEffect } from 'react'
import Background from '../../components/Background'
import BackButton from '../../components/BackButton'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { useFocusEffect } from '@react-navigation/native'
import styles from './authScreensStyles/ResidenceStyle.js'
import Constants from 'expo-constants'
import { WebView } from 'react-native-webview'
import { useSelector, useDispatch } from 'react-redux'
import { TouchableOpacity, StyleSheet, View, Image, Text } from 'react-native'
import { resetPosition, location } from '../../slices/All/locationslice.ts'
import { emailValidator } from '../../helpers/emailValidator'
const ResidenceSettingScreen = ({ navigation, route }) => {
  const positionAddress = useSelector((state) => state.slice.location)

  const dispatch = useDispatch()

  const handlePostCode = (data) => {
    // 선택된 주소 정보는 'data' 객체에 담겨 옵니다.
    // console.log(data)

    navigation.navigate('PostCode')
  }

  useEffect(() => {
    console.log('asdf')
    dispatch(location('주소 검색'))
    return () => {}
  }, [dispatch])
  console.log(route.params)
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo />
        <View style={styles.box}>
          <TouchableOpacity onPress={handlePostCode}>
            <View style={styles.search_box}>
              <Image source={require('../../assets/search.png')}></Image>
              {positionAddress !== '' ? (
                <Text style={styles.search_text}>{positionAddress}</Text>
              ) : (
                <Text style={styles.search_text}>{`주소 검색`}</Text>
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
