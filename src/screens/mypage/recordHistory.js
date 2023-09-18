import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { saveRecords } from '../../slices/All/Recordslice'
import Constants from 'expo-constants'
import HeaderBackScroll from '../../components/HeaderbackScroll'
import styles from './mypageStyle/recordHistoryStyle'

export default function RecordHistory() {
  const [dataList, setDataList] = useState([])
  const userID = useSelector((state) => state.auth.user?.clientID)
  const ip = Constants.manifest.extra.Local_ip
  const dispatch = useDispatch()
  const recordHistory = useSelector((state) => state.record)

  useEffect(() => {
    let check = storageCheck()
    if (!check) {
      getPointHistory()
    } else {
      setDataList(recordHistory)
    }
  }, [])

  const getPointHistory = async () => {
    try {
      const response = await axios.post(`http://${ip}:3000/Record/${userID}`)
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
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  }

  return (
    <ScrollView style={styles.container}>
      <HeaderBackScroll></HeaderBackScroll>
      {dataList.map((item, index) => (
        <View style={styles.itemContainer} key={index}>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.image} />
          )}
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Distance:</Text>
            <Text style={styles.value}>{item.distance} km</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Stopwatch:</Text>
            <Text style={styles.value}>{item.stopwatch} sec</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Walking:</Text>
            <Text style={styles.value}>{item.walking}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Trash Count:</Text>
            <Text style={styles.value}>{item.trash_cnt}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Latitude:</Text>
            <Text style={styles.value}>{item.latitude}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Longitude:</Text>
            <Text style={styles.value}>{item.longitude}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Record Time:</Text>
            <Text style={styles.value}>{formatDate(item.record_time)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}
