import React, { useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'

import styles from './mypageStyle/IssueReportStyle'
import HeaderBack2 from '../../components/Headerback2'
const IssueReport = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [text, setText] = useState('')

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <View style={styles.container}>
      <HeaderBack2 title={'불편 신고'}></HeaderBack2>

      <View style={styles.content}>
        {/* <View style={styles.content}> */}
        <View style={styles.topBox}>
          <Text>어느 점이 불편하지 설명해주세요.</Text>
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              onChangeText={(text) => setText(text)}
              value={text}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoFocus={false}
              multiline={true}
              style={[styles.textInput, isFocused]}
            ></TextInput>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.space}>
          <Text></Text>
        </View>
        <View style={styles.bottomBox}>
          <Text>자세한 내용의 {"'불편 신고'"}는 큰 도움이 됩니다!</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.button}>저장</Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </View>
    </View>
  )
}

export default IssueReport
