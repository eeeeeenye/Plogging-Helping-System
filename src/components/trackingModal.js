import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styles from './componentStyle/trackingModalStyle.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import Footer from './footer.js'
import { useNavigation } from '@react-navigation/native'
import { menuToggle } from '../slices/All/toggle'
//헤더에서 메뉴를 클릭햇을때 왓다갓다 하도록 만드는경우
const TrackingModal = ({ title, content, image }) => {
  const closeModal = () => {
    console.log(close)
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>
          사진 촬영을 하면 플로깅 기록dms 중지됩니다. 사진 촬영을 하시겠습니까?
        </Text>
        <View style={styles.button_box}>
          <TouchableOpacity style={styles.button} onPress={closeModal}>
            <Text>예</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={closeModal}>
            <Text>아니오</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default TrackingModal
