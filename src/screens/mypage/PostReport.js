import React, { useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native'
import styles from './mypageStyle/PostReportStyle'

import HeaderBack2 from '../../components/Headerback2'
const PostReport = () => {
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
      <HeaderBack2 title={'게시글 신고'} />

      <View style={styles.content}>
        {/* <View style={styles.content}> */}
        <View style={styles.topBox}>
          <Text>해당 게시글을 신고하는 이유를 작성해 주세요.</Text>
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
        <View style={styles.centerBox}>
          <Text>해당게시글의 작성자를 신고하시겠습니까?</Text>
          <View style={styles.centerContent}>
            <TouchableOpacity style={styles.centerButtonContainer}>
              <Text style={styles.centerButton}>아니오</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.centerButtonContainer}>
              <Text style={styles.centerButton}>네</Text>
            </TouchableOpacity>
          </View>
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

export default PostReport
