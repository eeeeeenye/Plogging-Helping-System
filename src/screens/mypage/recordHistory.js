import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { saveRecords } from '../../slices/All/Recordslice'
import Constants from 'expo-constants'
import HeaderBackScroll from '../../components/HeaderbackScroll'
import styles from './mypageStyle/recordHistoryStyle'
import HeaderBack from '../../components/Headerback'
import ImageWithText from '../../components/ImageWithText'

export default function RecordHistory() {
  const [dataList, setDataList] = useState([])
  const userID = useSelector((state) => state.auth.user?.clientID)

  console.log(userID)
  const ip = Constants.manifest.extra.Local_ip
  const dispatch = useDispatch()
  const recordHistory = useSelector((state) => state.record)

  useEffect(() => {
    // let check = storageCheck()
    // if (!check) {

    // } else {
    //   setDataList(recordHistory)
    // }
    getRecordHistory()
  }, [])

  const getRecordHistory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}/records/info/${userID}`
      )
      const data = response.data
      console.log(data, 'data')
      dispatch(saveRecords(data))
      setDataList(data)
    } catch (error) {
      console.log('Error fetching record history:', error)
    }
  }

  const storageCheck = () => {
    // 데이터가 있는지 확인
    return recordHistory.length > 0
  }

  const formatDate = (dateString) => {
    const currentDate = new Date(dateString)
    const formattedDate = `${currentDate.getFullYear()}.${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}.${currentDate.getDate().toString().padStart(2, '0')}`
    return formattedDate
  }

  const convertToKilometers = (distance) => {
    const metersValue = parseFloat(distance)

    const kilometersValue = metersValue / 1000
    console.log(kilometersValue)
    return Number(kilometersValue)
  }

  return (
    <View style={styles.container}>
      <HeaderBackScroll title={'기록물 조회'}>
        {/* <View style={styles.flatlistContatiner}>
        <FlatList
          renderItem={renderItem}
          data={dataList}
          ListHeaderComponent={<HeaderBack />}
        ></FlatList> */}
        <View style={styles.content}>
          {dataList.map((item, index) => (
            <View style={styles.itemContainer} key={index}>
              {item.image && (
                // <ImageWithText
                //   imageSource={item.image}
                //   text=
                // ></ImageWithText>
                <Image source={{ uri: item.image }} style={styles.image} />
              )}
              <Text style={styles.dateValue}>
                {formatDate(item.record_time)}
              </Text>
              <View style={styles.textContent}>
                <View style={styles.rowContainer}>
                  <Text style={styles.label}>총거리:</Text>
                  <Text style={styles.value}>
                    {' '}
                    {convertToKilometers(item.distance)} km
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.label}>시 간:</Text>
                  <Text style={styles.value}>{item.stopwatch} sec</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.label}>걸음수:</Text>
                  <Text style={styles.value}>{item.walking}</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.label}>쓰레기양:</Text>
                  <Text style={styles.value}>{item.trash_cnt} %</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.label}>위치:</Text>
                  <Text style={styles.value}>{item.longitude}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        {/* </View> */}
      </HeaderBackScroll>
    </View>
  )
}
const renderItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
      <View style={styles.rowContainer}>
        <Text style={styles.label}>총거리:</Text>
        <Text style={styles.value}>{item.distance} km</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>시 간:</Text>
        <Text style={styles.value}>{item.stopwatch} sec</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>걸음수:</Text>
        <Text style={styles.value}>{item.walking}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>쓰레기양:</Text>
        <Text style={styles.value}>{item.trash_cnt}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.label}>위치:</Text>
        <Text style={styles.value}>{item.longitude}</Text>
      </View>
      {/* <View style={styles.rowContainer}>
        <Text style={styles.label}>Longitude:</Text>
        <Text style={styles.value}>{item.longitude}</Text>
      </View>
     <View style={styles.rowContainer}>
        <Text style={styles.label}>Record Time:</Text>
        <Text style={styles.value}>{formatDate(item.record_time)}</Text>
      </View>  */}
    </View>
  )
}
