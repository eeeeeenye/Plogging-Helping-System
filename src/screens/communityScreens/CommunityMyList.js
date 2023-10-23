import React, { useEffect, useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native'

// import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import styles from './communityStyles/CommunityMyListStyle.js'
import HeaderScroll3 from '../../components/HeaderScroll3'
import Footer from '../../components/footer'
import axios from 'axios'

import { saveCommunity } from '../../slices/All/communityslice'
const CommunityMyList = () => {
  const handlRanking = () => {}
  const handleList = () => {}

  return (
    <View style={styles.container}>
      <HeaderScroll3 title={'탕정면'}>
        <View style={styles.content}>
          <View style={styles.row}>
            <View>
              <Image
                style={styles.image}
                source={require('../../assets/Rectangle40.png')}
              ></Image>
            </View>
          </View>
        </View>
      </HeaderScroll3>
    </View>
  )
}

export default CommunityMyList
