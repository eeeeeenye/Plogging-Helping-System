import React, { useState, useEffect, useRef } from 'react'
import { Text, View, TouchableHighlight, Alert, StyleSheet } from 'react-native'
import { Stopwatch } from 'react-native-stopwatch-timer'
import { useSelector, useDispatch } from 'react-redux'
import {
  start,
  stop,
  reset,
  updateElapsedTime,
} from '../../slices/All/Watchslice'
import styles from './addonStyle/watch2Style'

const StopWatch = ({ navigation }) => {
  const intervalRef = useRef(null)

  //   const [isRunning, setIsRunning] = useState(null)
  const [resetStatus, setResetStatus] = useState(false)
  const watchStatus = useSelector((state) => state.stopwatch.isRunning)
  const elapsedTime = useSelector((state) => state.stopwatch.elapsedTime)
  const distance = useSelector((state) => state.dist.distance)
  console.log(elapsedTime)

  const dispatch = useDispatch()

  useEffect(() => {
    //timer 시작
    if (watchStatus) {
      intervalRef.current = setInterval(() => {
        dispatch(updateElapsedTime(1))
      }, 1000)
    }

    if (!watchStatus) {
      clearInterval(intervalRef.current)
    }
  }, [watchStatus])

  return (
    <View style={styles.timeTracking}>
      <View style={styles.area}>
        <Text style={styles.text}>
          {Math.floor(elapsedTime / 3600)
            ? String(Math.floor(elapsedTime / 3600)).padStart(1, '0') + ':'
            : ''}
          {String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0')}:
          {/* {String(Math.floor(elapsedTime / 10)).padStart(2, '0')} */}
          {String(Math.floor(elapsedTime % 60)).padStart(2, '0')}
        </Text>
        <Text>시간</Text>
      </View>
      <View style={styles.area}>
        <Text style={styles.text}>{distance}</Text>
        <Text>거리(km)</Text>
      </View>
    </View>
  )
}

export default StopWatch
