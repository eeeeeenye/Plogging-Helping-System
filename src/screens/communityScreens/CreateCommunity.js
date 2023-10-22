import React, { useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native'
import styles from './communityStyles/CreateCommunityStyle'
import HeaderScroll3 from '../../components/HeaderScroll3'
import Footer from '../../components/footer'
import HeaderBackScroll4 from '../../components/HeaderBackScroll4'
import TextInput from '../../components/TextInput'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const CreateCommunity = () => {
  //   const [dataList, setDataList] = useState(data)

  const [title, setTitle] = useState('')
  const dateToDays = (day) => {
    if (day < 30) {
      //30일 이전 이라면
      return day + '일'
    } else if (day >= 30) {
      return '한 달'
    }
    //나중에 더추가
  }
  const navigation = useNavigation()
  console.log(title)

  const createCommunity = async () => {
    console.log(process.env.REACT_APP_API_URI)
    try {
      await axios.post(`${process.env.REACT_APP_API_URI}/community/save`)
      navigation.navigate('community')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <HeaderBackScroll4 title={'모임 작성'}>
        {/* <KeyboardAvoidingView behavior="position"> */}
        <View style={styles.contents}>
          <View style={styles.community_main}>
            <View style={styles.community}>
              <View style={styles.image_box}>
                <Image
                  style={styles.image}
                  source={require('../../assets/logo.png')}
                ></Image>
              </View>

              <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
                returnKeyType="next"
                // multiline={true}
                placeholder={'모임 이름'}
                style={styles.textinput}
              ></TextInput>
            </View>
            <View style={styles.community2}>
              <Text style={styles.location}>모임장소</Text>
              <TextInput
                placeholder={'모임 장소'}
                style={styles.textinput}
              ></TextInput>
            </View>

            <View style={styles.community2}>
              <Text style={styles.date_text}>날짜</Text>
              <TextInput
                placeholder={'모임 날짜'}
                style={styles.textinput}
              ></TextInput>
            </View>
            <View style={styles.main_box}>
              <TextInput
                multiline={true}
                textAlignVertical="top"
                placeholder={'활동 내용을 설명해주세요'}
                style={styles.main}
              ></TextInput>
            </View>

            <View style={styles.people}>
              <View>
                <Text style={styles.people_text}>정원{'(300~300명)'}</Text>
              </View>
              <View>
                <TextInput style={styles.people_textInput}></TextInput>
              </View>
            </View>
          </View>
          {/* <View style={styles.password}>
            <Image
              style={styles.password_image}
              source={require('../assets/users.png')}
            ></Image>
            <View style={styles.password_sub}>
              <View>
                <Text style={styles.password_text}>비밀번호 입력:</Text>
              </View>
              <View>
                <TextInput style={styles.password_textInput}></TextInput>
              </View>
            </View>
          </View> */}
          <TouchableOpacity onPress={createCommunity} style={styles.button_box}>
            <View style={styles.button}>
              <Text style={styles.button_text}>참석 및 클럽가입</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* </KeyboardAvoidingView> */}
      </HeaderBackScroll4>
    </View>
  )
}

export default CreateCommunity
