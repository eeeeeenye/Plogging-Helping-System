import React, { useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from 'react-native'
import styles from './boardStyle/boardStyle'
import HeaderScroll3 from '../components/HeaderScroll3'
import Footer from '../components/footer'

const data = [
  {
    id: 1,
    image: 'https://ifh.cc/g/lQsOzW.png',
    title: '온양온천역 근처에서 플로깅',
    date: 30,
    location: '온천동',
  },
  {
    id: 2,
    image: 'https://ifh.cc/g/P2Pd3v.png',
    title: '온양온천역 근처에서 플로깅',
    date: 30,
    location: '온천동',
  },
  {
    id: 3,
    image: 'https://ifh.cc/g/dc26a6.png',
    title: '온양온천역 근처에서 플로깅',
    date: 30,
    location: '온천동',
  },
  {
    id: 4,
    image: 'https://ifh.cc/g/P2Pd3v.png',
    title: '선문대 대학로, 벚꽃길 플로깅',
    date: 5,
    location: '탕정면',
  },
  {
    id: 5,
    image: 'https://ifh.cc/g/P2Pd3v.png',
    title: '선문대 대학로, 벚꽃길 플로깅',
    date: 5,
    location: '탕정면',
  },
  {
    id: 6,
    image: 'https://ifh.cc/g/P2Pd3v.png',
    title: '선문대 대학로, 벚꽃길 플로깅',
    date: 5,
    location: '탕정면',
  },
  {
    id: 7,
    image: 'https://ifh.cc/g/P2Pd3v.png',
    title: '선문대 대학로, 벚꽃길 플로깅',
    date: 5,
    location: '탕정면',
  },
]

const Board = () => {
  const [dataList, setDataList] = useState(data)

  const dateToDays = (day) => {
    if (day < 30) {
      //30일 이전 이라면
      return day + '일'
    } else if (day >= 30) {
      return '한 달'
    }
    //나중에 더추가
  }

  return (
    <View style={styles.container}>
      <HeaderScroll3 title={'탕정면'}>
        <View style={styles.contents}>
          {dataList.map((el) => (
            <View style={styles.board} key={el.id}>
              <View>
                {el.image && (
                  <Image style={styles.image} source={{ uri: el.image }} />
                )}
              </View>
              <View>
                <Text>{el.title}</Text>
                <Text style={styles.text}>
                  {el.location} {dateToDays(el.date)}전{' '}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </HeaderScroll3>
      <View style={styles.plus}></View>
      <Footer></Footer>
    </View>
  )
}

export default Board
