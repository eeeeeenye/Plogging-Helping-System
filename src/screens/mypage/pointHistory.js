import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPointHistory } from '../../slices/All/point_historyslice'
import Constants from 'expo-constants'
import HeaderBackScroll from '../../components/HeaderbackScroll'
import Footer from '../../components/footer'

import styles from './mypageStyle/pointHistoryStyle'
import HeaderBack from '../../components/Headerback'

export default function PointHistory() {
  const [dataList, setDataList] = useState([])
  const clientID = useSelector((state) => state.auth.user?.clientID)
  const ip = Constants.manifest.extra.Local_ip
  const dispatch = useDispatch()
  const pointHistory = useSelector((state) => state.pointHistory)

  useEffect(() => {
    getPointHistory()
    // let check = storageCheck() // 리덕스에 데이터가 저장되어 있는지 확인
    // if (!check) {
    //   getPointHistory()
    // } else {
    //   setDataList(pointHistory)
    // }
  }, [])

  console.log(clientID)

  const getPointHistory = async () => {
    // 최초 실행 시 데이터 가져오기

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}/points/info/${clientID}`
      )
      const data = response.data
      // dispatch(setPointHistory(data))
      setDataList(data)
    } catch (error) {
      console.log('Error fetching point history:', error)
    }
  }

  const storageCheck = () => {
    // 데이터가 있는지 확인
    return pointHistory.length > 0
  }

  const formatDate = (dateString) => {
    // DB에 있는 timestamp 타입을 바꿔줌
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  }

  const getColorStyle = (number) => {
    if (number >= 500) {
      return { color: 'red' }
    } else {
      return { color: 'green' }
    }
  }

  console.log(dataList)

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.description}>{item.description}</Text>
          <Text numberOfLines={1} style={styles.event}>
            {item.event}
          </Text>
        </View>
        {/* <View style={styles.infoContainer2}></View> */}
        <View style={styles.infoContainer2}>
          <Text style={(styles.points, getColorStyle(Number(item.points)))}>
            {item.points >= 500 ? '-' : '+'}
            {item.points} P
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <HeaderBack title={'포인트 조회'}> </HeaderBack>
      <View style={styles.contents}>
        <View style={styles.topContainer}>
          <View style={styles.topContainer_title}>
            <Text style={styles.topContainer_title_text}>
              사용가능한 포인트
            </Text>
          </View>
          <View style={styles.topContainer_point}>
            <Text style={styles.topContainer_point_text}>5,421P</Text>
            <Image
              style={styles.image}
              source={require(`../../assets/logo.png`)}
            ></Image>
          </View>
        </View>
        {/* 1안 flat list로 내용 부분만스크롤되도록 */}
        <View style={styles.flatListContainer}>
          <FlatList
            // keyExtractor={(item=>)}
            data={dataList}
            renderItem={renderItem}
          ></FlatList>
        </View>
        {/* 2안헤더도 같이내려가서 전체를덮도록 */}

        {/* <View style={styles.flatListContainer}>
            {dataList.map((item, index) => (
              <View style={styles.itemContainer} key={index}>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.infoContainer}>
                  <Text style={styles.points}>{item.points} points</Text>
                  <Text style={styles.createdAt}>
                    {formatDate(item.created_at)}
                  </Text>
                </View>
                <Text style={styles.event}>{item.event}</Text>
              </View>
            ))}
          </View> */}
      </View>

      <Footer></Footer>
    </View>
  )
}
