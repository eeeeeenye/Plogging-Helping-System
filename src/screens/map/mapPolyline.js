import React, { useRef, useEffect, useState, useFocusEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { WebView } from 'react-native-webview'
import Constants from 'expo-constants'
import * as Location from 'expo-location'

import mapPolylineHTML from './htmlCode/mapPlylineHTML'
import { useDispatch, useSelector } from 'react-redux'
import { distCal } from '../../slices/All/Distanceslice'
import { toggleImageClick } from '../../slices/All/footerSlice'
import Footer from '../../components/footer'
const LocationTracker = () => {
  const webViewRef = useRef()
  const apiKey = Constants.manifest.extra.KAKAO_JAVASCRIPT_KEY
  const status = useSelector((state) => state.stopwatch.isRunning)
  const dispatch = useDispatch()
  const [locationSubscription, setLocationSubscription] = useState(null)
  const [path, setPath] = useState([])
  const [distance, setDistance] = useState(0)
  const haversine = require('haversine')
  let item = useSelector((state) => state.footer.FooterImages)
  console.log(item)

  useEffect(() => {
    dispatch(toggleImageClick({ id: 1, clicked: true }))

    return () => {
      console.log('떠난다')
      dispatch(toggleImageClick({ id: 1, clicked: false }))
      // 화면을 떠날 때 실행할 코드
    }
  }, [])
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // 화면에 진입할 때 실행할 코드

  //     //

  //     // return () => {
  //     //   console.log('안떨어졋어')

  //     return () => {
  //       dispatch(toggleImageClick({ id: 1, clicked: false }))
  //       // 화면을 떠날 때 실행할 코드
  //     }
  //   }, [])
  // )

  //status가 변경될 때마다 실행
  useEffect(() => {
    if (status) {
      startLocationTracking()
    } else {
      stopLocationTracking()
    }
  }, [status])

  useEffect(() => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({}))
    }
  }, [])

  useEffect(() => {
    if (path.length == 2) {
      updateDistance(path)
      setPath([])
    }
  }, [path])

  useEffect(() => {
    console.log(distance, 'useEffect Distance')
    dispatch(distCal(distance))
  }, [distance])

  // 웹뷰에 보낼 메시지를 관리 (position)
  const handleMessage = (event) => {
    const position = JSON.parse(event.nativeEvent.data)
    console.log('Received position:', position)
  }

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

      const listener = (location) => {
        const position = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
        setPath((prevPath) => [...prevPath, position])
        sendPositionToWebView(position)
      }

      if (!locationSubscription) {
        // 구독이 존재하는 경우 만들지 않음 (중복방지)
        const newSubscription = Location.watchPositionAsync(
          // watchPosition은 비동기 함수이고, 반환값은 _h,_i,_j(remove함수 포함 -> 제어함수들 포함)
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 3000,
            distanceInterval: 0,
          },
          listener
        )
        setLocationSubscription(newSubscription)
      }
    } catch (error) {
      console.log('Location tracking error:', error)
    }
  }

  // webViewRef를 사용하여 웹뷰와 통신
  const sendPositionToWebView = (position) => {
    const message = JSON.stringify(position)
    if (webViewRef.current) {
      webViewRef.current.postMessage(message)
    }
  }

  const updateDistance = (path) => {
    if (path.length > 0) {
      const lastPosition = path[path.length - 1]
      const distanceInMeters = haversine(
        { latitude: lastPosition.latitude, longitude: lastPosition.longitude },
        { latitude: path[0].latitude, longitude: path[0].longitude },
        { unit: 'meter' }
      )
      const distanceInkilometers = Number((distanceInMeters / 1000).toFixed(2))
      setDistance(distance + distanceInkilometers)
      console.log(path)
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 40,
          left: 25,
          right: 300,
          bottom: 610,
          zIndex: 1,
        }}
      >
        <Text style={styles.text}>{distance} KM</Text>
      </View>
      <WebView
        ref={webViewRef}
        source={{ html: mapPolylineHTML(apiKey) }}
        onLoad={() => {
          if (status) {
            startLocationTracking()
          }
        }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
      />
      <Footer></Footer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})

export default LocationTracker
