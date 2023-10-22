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
import styles from './communityStyles/menuStyle'
import HeaderScroll3 from '../../components/HeaderScroll3'
import Footer from '../../components/footer'
import axios from 'axios'

import { saveCommunity } from '../../slices/All/communityslice'
const Menu = () => {
  return (
    <View style={styles.container}>
      <HeaderScroll3 title={'탕정면'}>
        <View style={styles.content}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.wrap}>
              <Image source={require('../../assets/edit.png')}></Image>
              <Text>참여모임 목록</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrap}>
              <Image
                source={require('../../assets/global-ranking.png')}
              ></Image>
              <Text>랭킹 조회</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.wrap}> */}
          <View style={styles.row2}>
            <TouchableOpacity style={styles.wrap}>
              <Image source={require('../../assets/약속미리알림.png')}></Image>
              <Text>알림설정</Text>
              {/* </View> */}
            </TouchableOpacity>
          </View>

          {/* </View> */}
        </View>
      </HeaderScroll3>
    </View>
  )
}

export default Menu
