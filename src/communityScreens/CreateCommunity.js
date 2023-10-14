import React, { useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native'
import styles from './communityStyles/communityStyle'
import HeaderScroll3 from '../components/HeaderScroll3'
import Footer from '../components/footer'

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
  return <View style={styles.container}></View>
}

export default CreateCommunity
