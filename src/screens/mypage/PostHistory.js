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
import { useNavigation } from '@react-navigation/native'
import Footer from '../../components/footer'
import TextInput from '../../components/TextInput'
import HeaderBackScroll from '../../components/HeaderbackScroll'
import styles from './mypageStyle/postHistoryStyle'
const data = [
  {
    id: 1,
    image: 'https://ifh.cc/g/kwZPTQ.png',
    title: '온양온천역 근처에서 플로깅',
    tag: ['#아산', '#사교', '#취미공유'],
    location: '아산시',
    members: 3,
    date: '2023-03-10',
  },
  {
    id: 2,
    image: 'https://ifh.cc/g/YDWRg6.png',
    title: '선문대 대학로, 벚꽃길 플로깅',
    tag: ['#아산', '#대학로', '#데이트', '#플로깅'],
    location: '아산시',
    members: 4,
    date: '2023-03-20',
  },
  {
    id: 3,
    title: '플로깅 후 맛집탐방기',
    image: 'https://ifh.cc/g/XYGHBA.png',
    tag: ['#아산', '#식사', '#맛집탐방', '#플로깅'],
    location: '아산시',
    members: 4,
    date: '2023-03-26',
  },
  {
    id: 4,
    title: '플로깅 후 맛집탐방기',
    image: 'https://ifh.cc/g/XYGHBA.png',
    tag: ['#아산', '#식사', '#맛집탐방', '#플로깅'],
    location: '아산시',
    members: 4,
    date: '2023-03-26',
  },
  {
    id: 5,
    title: '플로깅 후 맛집탐방기',
    image: 'https://ifh.cc/g/XYGHBA.png',
    tag: ['#아산', '#식사', '#맛집탐방', '#플로깅'],
    location: '아산시',
    members: 4,
    date: '2023-03-26',
  },
]
const PostHistory = () => {
  const [dataList, setDataList] = useState(data)

  const formatDate = (dateString) => {
    const currentDate = new Date(dateString)
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')
    const formattedDate = `${year}.${month}.${day}`
    return formattedDate
  }

  const s = formatDate('2023-08-08')
  console.log(s, formatDate(dataList[1].date), dataList[1].date)
  return (
    <View style={styles.container}>
      <HeaderBackScroll title={'작성글'}>
        <View style={styles.content}>
          {dataList.map((item, index) => (
            <View style={styles.post} key={item.id}>
              <View style={styles.postContainer}>
                <View style={styles.imageBox}>
                  {item.image && (
                    <Image source={{ uri: item.image }} style={styles.image} />
                  )}
                </View>
                <View>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.tagText}>
                    {item.tag.map((el) => {
                      return el
                    })}
                  </Text>

                  <Text style={styles.text}>
                    {item.location}
                    {''} |{''} 참여 멤버 {item.members}
                  </Text>
                  <Text style={styles.text}>{formatDate(item.date)}</Text>
                </View>
              </View>
              <View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>모집완료</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                  <TouchableOpacity style={styles.button}>
                    <Text>끌어올리기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </HeaderBackScroll>
      <Footer></Footer>
    </View>
  )
}

export default PostHistory
