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
import styles from './mypageStyle/EditProfileStyle'
import HeaderBackScroll2 from '../../components/HeaderbackScroll2'
import TextInput from '../../components/TextInput'

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
      <HeaderBackScroll2 title={'플로깅1'}>
        <View style={styles.content}>
          <View style={styles.imageContent}>
            <Image
              source={require('../../assets/profile_photo.png')}
              style={styles.image}
            />
            <View style={styles.overImageContent}>
              <Image
                style={styles.overImage}
                source={require('../../assets/camera.png')}
              ></Image>
            </View>

            <Text style={styles.title}>{name}플로깅1</Text>
          </View>

          <View style={styles.textInputContainer}>
            <View style={styles.textInputContent}>
              <Text style={styles.text}>닉네임:</Text>
              <TextInput label="닉네임"></TextInput>
            </View>

            <View style={styles.textInputContent}>
              <Text style={styles.text}>이메일:</Text>
              <TextInput label="doridori@naver.com"></TextInput>
            </View>

            <View style={styles.textInputContent}>
              <Text style={styles.text}>전화번호:</Text>
              <TextInput label="010-xxxx-xxxx"></TextInput>
            </View>

            <View style={styles.textInputContent}>
              <Text style={styles.text}>한줄소개:</Text>
              <TextInput label="안녕하세요"></TextInput>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>프로필 수정</Text>
            </TouchableOpacity>
          </View>
        </View>
      </HeaderBackScroll2>
      <Footer></Footer>
    </View>
  )
}

export default EditProfile
