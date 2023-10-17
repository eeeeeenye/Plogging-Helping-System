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
import HeaderScroll3 from '../components/HeaderScroll3'
import Footer from '../components/footer'
import HeaderBackScroll4 from '../components/HeaderBackScroll4'
import TextInput from '../components/TextInput'

const CreateCommunity = () => {
  //   const [dataList, setDataList] = useState(data)

  const dateToDays = (day) => {
    if (day < 30) {
      //30일 이전 이라면
      return day + '일'
    } else if (day >= 30) {
      return '한 달'
    }
    //나중에 더추가
  }

  const createCommunity = () => {
    console.log('s')
  }
  return (
    <View style={styles.container}>
      <HeaderBackScroll4 title={'모임 작성'}>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.contents}>
            <View style={styles.community}>
              <View style={styles.image_box}>
                <Image
                  style={styles.image}
                  source={require('../assets/logo.png')}
                ></Image>
              </View>

              <TextInput
                placeholder={'모임 이름'}
                style={styles.textinput}
              ></TextInput>
            </View>
            <View style={styles.community}>
              <Text>모임장소</Text>
              <TextInput
                placeholder={'모임 장소'}
                style={styles.textinput}
              ></TextInput>
            </View>

            <View style={styles.community}>
              <Text>날짜</Text>
              <TextInput
                placeholder={'날짜'}
                style={styles.textinput}
              ></TextInput>
            </View>
            <View></View>
            <View></View>

            <View></View>
          </View>
        </KeyboardAvoidingView>
      </HeaderBackScroll4>
    </View>
  )
}

export default CreateCommunity
