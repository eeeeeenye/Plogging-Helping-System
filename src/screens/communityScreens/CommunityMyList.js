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
        <View style={styles.contents}>
          <View style={styles.row}>
            <View style={styles.image_box}>
              <Image
                style={styles.image}
                source={require('../../assets/Rectangle40.png')}
              ></Image>
            </View>
            <View style={styles.text_box}>
              <Text style={[styles.title, styles.line]}>
                온양온천역 근처에서 플로깅
              </Text>
              <Text style={[styles.tag, styles.line]}>
                #아산 #사교 #취미공유
              </Text>

              <Text style={[styles.members, styles.line]}>
                아산시 | 참여 멤버 3
              </Text>

              <Text style={[styles.date, styles.line]}>2023.03.10</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.image_box}>
              <Image
                style={styles.image}
                source={require('../../assets/Rectangle40.png')}
              ></Image>
            </View>
            <View style={styles.text_box}>
              <Text style={[styles.title, styles.line]}>
                온양온천역 근처에서 플로깅
              </Text>
              <Text style={[styles.tag, styles.line]}>
                #아산 #사교 #취미공유
              </Text>

              <Text style={[styles.members, styles.line]}>
                아산시 | 참여 멤버 3
              </Text>

              <Text style={[styles.date, styles.line]}>2023.03.10</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.image_box}>
              <Image
                style={styles.image}
                source={require('../../assets/Rectangle40.png')}
              ></Image>
            </View>
            <View style={styles.text_box}>
              <Text style={[styles.title, styles.line]}>
                온양온천역 근처에서 플로깅
              </Text>
              <Text style={[styles.tag, styles.line]}>
                #아산 #사교 #취미공유
              </Text>

              <Text style={[styles.members, styles.line]}>
                아산시 | 참여 멤버 3
              </Text>

              <Text style={[styles.date, styles.line]}>2023.03.10</Text>
            </View>
          </View>
        </View>
      </HeaderScroll3>
    </View>
  )
}

export default CommunityMyList
