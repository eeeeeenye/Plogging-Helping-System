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
import styles from './communityStyles/CommunityRankingStyle.js'
import HeaderScroll3 from '../../components/HeaderScroll3'
import Footer from '../../components/footer'
import axios from 'axios'

import { saveCommunity } from '../../slices/All/communityslice'
const CommunityRanking = () => {
  return (
    <View style={styles.container}>
      <HeaderScroll3
        title={'전국 개인 랭킹'}
        content={'매주 금요일 랭킹 정산 후 초기화됩니다.'}
      >
        <View style={styles.contents}>
          <View style={styles.row}>
            <View style={styles.image_box}>
              <View style={[styles.ranking_background, styles.first]}>
                <View style={styles.ranking_round}>
                  <Text style={styles.ranking}>1</Text>
                </View>
              </View>

              <Image
                style={styles.image}
                source={require('../../assets/Rectangle40.png')}
              ></Image>
            </View>
            <View>
              <Text style={styles.text1}>온양온천역 근처에서 플로깅</Text>
              <Text style={styles.text2}>걸음수: 150km | 쓰레기양: 300L</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.image_box}>
              <View style={[styles.ranking_background, styles.second]}>
                <View style={styles.ranking_round}>
                  <Text style={styles.ranking}>2</Text>
                </View>
              </View>

              <Image
                style={styles.image}
                source={require('../../assets/Rectangle40.png')}
              ></Image>
            </View>
            <View>
              <Text style={styles.text1}>온양온천역 근처에서 플로깅</Text>
              <Text style={styles.text2}>걸음수: 150km | 쓰레기양: 300L</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.image_box}>
              <View style={[styles.ranking_background, styles.third]}>
                <View style={styles.ranking_round}>
                  <Text style={styles.ranking}>3</Text>
                </View>
              </View>

              <Image
                style={styles.image}
                source={require('../../assets/Rectangle40.png')}
              ></Image>
            </View>
            <View>
              <Text style={styles.text1}>온양온천역 근처에서 플로깅</Text>
              <Text style={styles.text2}>걸음수: 150km | 쓰레기양: 300L</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.image_box}>
              <View style={[styles.ranking_background2]}>
                <View style={styles.ranking_round2}>
                  <Text style={styles.ranking2}>4</Text>
                </View>
              </View>

              <Image
                style={styles.image}
                source={require('../../assets/Rectangle40.png')}
              ></Image>
            </View>
            <View>
              <Text style={styles.text1}>온양온천역 근처에서 플로깅</Text>
              <Text style={styles.text2}>걸음수: 150km | 쓰레기양: 300L</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.image_box}>
              <View style={[styles.ranking_background2]}>
                <View style={styles.ranking_round2}>
                  <Text style={styles.ranking2}>5</Text>
                </View>
              </View>

              <Image
                style={styles.image}
                source={require('../../assets/Rectangle40.png')}
              ></Image>
            </View>
            <View>
              <Text style={styles.text1}>온양온천역 근처에서 플로깅</Text>
              <Text style={styles.text2}>걸음수: 150km | 쓰레기양: 300L</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.image_box}>
              <View style={[styles.ranking_background2]}>
                <View style={styles.ranking_round2}>
                  <Text style={styles.ranking2}>6</Text>
                </View>
              </View>

              <Image
                style={styles.image}
                source={require('../../assets/Rectangle40.png')}
              ></Image>
            </View>
            <View>
              <Text style={styles.text1}>온양온천역 근처에서 플로깅</Text>
              <Text style={styles.text2}>걸음수: 150km | 쓰레기양: 300L</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.image_box}>
              <View style={[styles.ranking_background2]}>
                <View style={styles.ranking_round2}>
                  <Text style={styles.ranking2}>7</Text>
                </View>
              </View>

              <Image
                style={styles.image}
                source={require('../../assets/Rectangle40.png')}
              ></Image>
            </View>
            <View>
              <Text style={styles.text1}>온양온천역 근처에서 플로깅</Text>
              <Text style={styles.text2}>걸음수: 150km | 쓰레기양: 300L</Text>
            </View>
          </View>
        </View>
      </HeaderScroll3>
    </View>
  )
}

export default CommunityRanking
