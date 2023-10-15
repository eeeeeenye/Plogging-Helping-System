import React, { useState, useEffect } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import styles from './communityStyles/CommunityInfoStyle'
import HeaderScroll3 from '../components/HeaderScroll3'
import Footer from '../components/footer'
import HeaderBackScroll3 from '../components/HeaderbackScroll3'
import axios from 'axios'

const CommunityInfo = ({ navigation, route }) => {
  const [dataList, setDataList] = useState([])

  const receivedData = route.params.id
  const community = useSelector((state) => state.community)
  console.log(receivedData)
  const communityBoard = community.filter(
    (el) => el.community_id === receivedData
  )
  console.log(communityBoard[0].image)

  const handleCreateCommunity = () => {
    navigation.navigate('createCommunity')
  }

  const handleCommunity = () => {
    navigation.navigate('communityInfo')
  }
  return (
    <View style={styles.container}>
      <HeaderBackScroll3 title={'소셜 액티비티'}>
        <View style={styles.content}>
          <View style={styles.image_box}>
            <Image
              style={styles.image}
              source={{ uri: communityBoard[0].image }}
            ></Image>
          </View>
        </View>
      </HeaderBackScroll3>
    </View>
  )
}

export default CommunityInfo
