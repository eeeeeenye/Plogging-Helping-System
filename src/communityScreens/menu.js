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
import styles from './communityStyles/communityStyle'
import HeaderScroll3 from '../components/HeaderScroll3'
import Footer from '../components/footer'
import axios from 'axios'

import { saveCommunity } from '../slices/All/communityslice'
const Menu = () => {
  return (
    <View style={styles.container}>
      <HeaderScroll3 title={'탕정면'}>
        <View>
          <View>
            <View>
              <Text>참여모임 목록</Text>
            </View>
            <View>
              <Text>랭킹 조회</Text>
            </View>
            <View>
              <Text>알림설정</Text>
            </View>
          </View>
        </View>
      </HeaderScroll3>
    </View>
  )
}

export default Menu
