import React, { useRef, useEffect, useState, memo, useFocusEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Text } from 'react-native-paper'
import { WebView } from 'react-native-webview'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import styles from './mapStyles/mapPolylineStyle'

import mapPolylineHTML from './htmlCode/mapPolylineHTML'
import { useDispatch, useSelector } from 'react-redux'
import { distCal } from '../../slices/All/Distanceslice'
import { toggleImageClick } from '../../slices/All/footerSlice'
import Footer from '../../components/footer'
import HeaderScroll3 from '../../components/HeaderScroll3'
import Header3 from '../../components/Header3'

const LocationTracker = () => {
  const webViewRef = useRef()
  const intervalRef = useRef()
  const status = useSelector((state) => state.stopwatch.isRunning)
  const dispatch = useDispatch()
  const [webViewKey, setWebViewKey] = useState(1)

  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTracking, setIsTracking] = useState(false)
  const [locationSubscription, setLocationSubscription] = useState(null)
  const [distance, setDistance] = useState(0)
  const [position, setPosition] = useState({})

  const [path, setPath] = useState([])
  const [currentLocation, setCurrentLocation] = useState(null)
  const haversine = require('haversine')
  useEffect(() => {
    dispatch(toggleImageClick({ id: 1, clicked: true }))

    return () => {
      dispatch(toggleImageClick({ id: 1, clicked: false }))
      // 화면을 떠날 때 실행할 코드
    }
  }, [])
  //status가 변경될 때마다 실행
  useEffect(() => {
    if (status) {
      startLocationTracking()
    } else {
      stopLocationTracking()
    }
  }, [status])

  // useEffect(() => {
  //   if (webViewRef.current) {
  //     webViewRef.current.postMessage(JSON.stringify({}))
  //   }
  // }, [])

  useEffect(() => {
    if (path.length == 2) {
      // updateDistance(path)
      setPath([])
    }
  }, [path])

  useEffect(() => {
    console.log(distance, 'useEffect Distance')
    dispatch(distCal(distance))
  }, [distance])

  // 웹뷰에 보낼 메시지를 관리 (position)

  // status가 false일 경우에 실행
  const stopLocationTracking = () => {
    if (locationSubscription) {
      locationSubscription._j.remove()
      setLocationSubscription(null)
    }
  }

  const startLocationTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Location permission denied')
        return
      }

      const locationData = await Location.getCurrentPositionAsync()
      console.log(locationData)
      const latitude = locationData['coords']['latitude'] // 위도 가져오기
      const longitude = locationData['coords']['longitude'] // 경도 가져오기
      setPosition({ lat: latitude, lng: longitude })

      // const listener = (location) => {
      //   const position = {
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //   }
      //   setPath((prevPath) => [...prevPath, position])

      //   // setPosition(locationData)
      //   sendPositionToWebView(position)
      // }

      // if (!locationSubscription) {
      //   // 구독이 존재하는 경우 만들지 않음 (중복방지)
      //   const newSubscription = Location.watchPositionAsync(
      //     // watchPosition은 비동기 함수이고, 반환값은 _h,_i,_j(remove함수 포함 -> 제어함수들 포함)
      //     {
      //       accuracy: Location.Accuracy.High,
      //       timeInterval: 10000,
      //       distanceInterval: 0,
      //     },
      //     listener
      //   )
      //   setLocationSubscription(newSubscription)
      // }
    } catch (error) {
      console.log('Location tracking error:', error)
    }
  }

  // webViewRef를 사용하여 웹뷰와 통신
  const sendPositionToWebView = (position) => {
    const message = JSON.stringify(position)
    console.log(message, 'message')
    if (webViewRef.current) {
      webViewRef.current.postMessage(message, '*')
      // console.log(position, 'position')
    }
  }

  const send = () => {
    console.log('walkclick')
    const sendData = JSON.stringify({
      id: 1,
      type: '',
      name: 'ssilook',
      content: 'WebView_Test',
    })
    webViewRef.current.postMessage(sendData, '*')
  }
  const handleMessage = (event) => {
    const message = event.nativeEvent.data
    console.log('Received position:', message)
  }
  // const updateDistance = (path) => {
  //   if (path.length > 0) {
  //     const lastPosition = path[path.length - 1]
  //     const distanceInMeters = haversine(
  //       { latitude: lastPosition.latitude, longitude: lastPosition.longitude },
  //       { latitude: path[0].latitude, longitude: path[0].longitude },
  //       { unit: 'meter' }
  //     )
  //     const distanceInkilometers = Number((distanceInMeters / 1000).toFixed(2))
  //     setDistance(distance + distanceInkilometers)
  //     // console.log(path)
  //   }
  // }
  const startTracking = async () => {
    setIsTracking(true)

    intervalRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)
  }

  const stopTracking = () => {
    clearInterval(intervalRef.current)
    setIsTracking(false)
    setElapsedTime(0)
  }

  // const start = () =>{

  // }

  // useEffect(() => {
  //   let intervalId

  //   if (isTracking) {
  //     // 1초마다 elapsedTime 상태를 업데이트
  //     intervalId = setInterval(() => {
  //       setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000)
  //     }, 1000)
  //   }

  //   // 컴포넌트가 언마운트되거나 트래킹이 종료될 때 clearInterval 호출하여 interval 정리
  //   return () => clearInterval(intervalId)
  // }, [isTracking])
  // {
  //   Math.floor(elapsedTime / 1000)
  // }
  const apiKey = Constants.manifest.extra.KAKAO_JAVASCRIPT_KEY

  const url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`

  console.log(position, 'position')

  return (
    <View style={styles.container}>
      <Header3 title={'탕정면'}></Header3>

      {isTracking ? (
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
          <View style={styles.area}>
            <Text style={styles.text}>0</Text>
            <Text>걸음</Text>
          </View>
        </View>
      ) : (
        <></>
      )}
      {/* 
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text></Text>
      </View> */}
      <WebView
        style={styles.webView}
        ref={webViewRef}
        source={{ html: mapPolylineHTML(url, position) }}
        onLoad={() => {
          if (!status) {
            startLocationTracking()
          }
        }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
      />
      <View style={styles.timeControl}>
        {isTracking ? (
          <>
            <TouchableOpacity
              activeOpacity={1}
              onPress={stopTracking}
              style={{ marginBottom: 10, marginLeft: 10 }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require('../../assets/shutdown.png')}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              style={{ marginBottom: 10, marginLeft: 10 }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require('../../assets/fcamera.png')}
              ></Image>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={startTracking}
              activeOpacity={1}
              style={{ marginBottom: 10 }}
            >
              <Image
                style={{ width: 70, height: 70 }}
                source={require('../../assets/start-button.png')}
              ></Image>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          onPress={send}
          activeOpacity={1}
          style={{ marginTop: 10, marginLeft: 10 }}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require('../../assets/walk.png')}
          ></Image>
        </TouchableOpacity>
      </View>

      <Footer></Footer>
    </View>
  )
}

export default LocationTracker
