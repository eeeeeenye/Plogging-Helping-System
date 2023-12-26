import React, { useState, useRef } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  Pressable,
  TouchableHighlight,
  Animated,
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
  const [isPressed, setIsPressed] = useState(false)
  const animationValue = useRef(new Animated.Value(0)).current

  const handleEditProfile = () => {
    // 프로필 수정 로직을 여기에 작성
    //프로필 수정api필요
    //
  }

  const handlePressIn = () => {
    setIsPressed(true)

    Animated.timing(animationValue, {
      toValue: 1,
      duration: 200, // 애니메이션 지속 시간 (밀리초)
      useNativeDriver: false, // Native Driver를 사용하지 않음
    }).start();
  };

  // const handlePressOut = () => {
  //   Animated.timing(animationValue, {
  //     toValue: 0,
  //     duration: 200,
  //     useNativeDriver: false,
  //   }).start();
    // 실행할 애니메이션 등을 추가할 수 있습니다.
  // }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleButtonCheck = () => {
    alert('zmfflr')
    setIsPressed(false)
  }
  //글자 문제 해결 필요
  return (
    <View style={styles.container}>
      <HeaderBackScroll2 title={'프로필 관리'}>
        <View style={styles.content}>
          {/* <View style={styles.imageContent}>
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
          </View> */}

          <View style={styles.textInputContainer}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handleButtonCheck}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
                // style={styles.textInputContent}

                // animatedStyle,
              ]}
            >
              <Text style={styles.text}>닉네임</Text>
              <Text style={styles.text2}>도라에몽</Text>
            </Pressable>

            <Pressable style={styles.textInputContent}>
              <Text style={styles.text}>이메일</Text>
              <Text style={styles.text2}>doridori@naver.com</Text>
            </Pressable>

            <Pressable style={styles.textInputContent}>
              <Text style={styles.text}>전화번호</Text>
              <Text style={styles.text2}> 010-5898-5556</Text>
            </Pressable>

            <Pressable style={styles.textInputContent}>
              <Text style={styles.text}>한줄소개</Text>
              <Text style={styles.text2}>안녕하세요</Text>
            </Pressable>
          </View>
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>프로필 수정</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </HeaderBackScroll2>
      <Footer></Footer>
    </View>
  )
}

export default EditProfile
