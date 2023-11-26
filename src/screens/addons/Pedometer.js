// StepCounter.js
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Accelerometer } from 'expo-sensors'
import { useSelector, useDispatch } from 'react-redux'
import { walking } from '../../slices/All/Distanceslice'
import { Text } from 'react-native-paper'

export default function StepCounter() {
  const [steps, setSteps] = useState(0)
  const stopwatchState = useSelector((state) => state.stopwatch.isRunning) // Redux 스토어의 stopwatch.isRunning 값 사용
  const dispatch = useDispatch()

  useEffect(() => {
    let subscription

    if (stopwatchState) {
      Accelerometer.setUpdateInterval(1000) // 1초마다 업데이트

      const calculateSteps = ({ x, y, z }) => {
        const acceleration = Math.sqrt(x * x + y * y + z * z)
        if (acceleration > 1.2) {
          // 걸음걸이 감지
          setSteps((prevState) => prevState + 1)
        }
      }

      Accelerometer.isAvailableAsync().then((available) => {
        if (available) {
          subscription = Accelerometer.addListener(calculateSteps)
        } else {
          console.log('Accelerometer is not available on this device.')
        }
      })
    } else {
      dispatch(walking(steps))
      return
    }

    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, [stopwatchState]) // stopwatchState가 변경될 때마다 useEffect 재실행

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/walking.png')} // 리소스 파일의 경로로 변경
        style={{ width: 50, height: 50, marginBottom: 20, marginTop: 50 }} // 원하는 크기로 조절
      />
      <Text style={styles.text}>{steps}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  text: {
    fontSize: 24,
  },
})
