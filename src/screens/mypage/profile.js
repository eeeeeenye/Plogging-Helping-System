import React, { useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Footer from '../../components/footer'
import styles from './mypageStyle/profileStyle'
import HeaderBack from '../../components/Headerback'
import HeaderBackScroll from '../../components/HeaderbackScroll'

const EditProfile = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [note, setNote] = useState('')

  const handleEditProfile = () => {
    // 프로필 수정 로직을 여기에 작성
    //프로필 수정api필요
    //
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  //글자 문제 해결 필요
  return (
    <View style={styles.container}>
      <HeaderBackScroll title={'프로필'}>
        <View style={styles.content}>
          <View style={styles.imageContent}>
            <Image
              source={require('../../assets/profile_photo.png')}
              style={styles.image}
            />
            <Text style={styles.title}>{name}플로깅1</Text>
          </View>
          <View style={styles.textContent}>
            <View style={styles.textContainer}>
              <Text style={styles.label}>이메일 :</Text>
              <Text style={styles.text}>{email} sddoridori@naver.com</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>전화번호 :</Text>
              <Text style={styles.text}>{number} 010-xxxx-xxxx</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>한줄소개 :</Text>

              <Text style={styles.text}>
                {note}
                안녕하세요
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleEditProfile} style={styles.button}>
              <Text style={styles.buttonText}>프로필 수정</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
              <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>
      </HeaderBackScroll>
      <Footer></Footer>
    </View>
  )
}

export default EditProfile
