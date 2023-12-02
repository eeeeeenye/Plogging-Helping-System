import React, { useRef, useEffect, useState, memo, useFocusEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
} from 'react-native'
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
import { Camera } from 'expo-camera'
import TrackingModal from '../../components/trackingModal'
import { modalToggle } from '../../slices/All/toggle'

const LocationTracker = () => {
  const webViewRef = useRef()
  const intervalRef = useRef()

  let countDownRef = useRef(0)
  const status = useSelector((state) => state.stopwatch.isRunning)
  const dispatch = useDispatch()
  const [webViewKey, setWebViewKey] = useState(1)

  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTracking, setIsTracking] = useState(false)
  const [locationSubscription, setLocationSubscription] = useState(null)
  const [distance, setDistance] = useState(0)
  const [position, setPosition] = useState({})
  const [cameraRef, setCameraRef] = useState(null)
  const [modalCamera, setModalCamera] = useState(false)
  const [modalWalkTracking, setModalWalkTracking] = useState(false)

  const [path, setPath] = useState([])
  const [currentLocation, setCurrentLocation] = useState(null)
  const haversine = require('haversine')

  const [count, setCount] = useState(4)
  const [countDown, setCountDown] = useState(false)
  const animatedValue = useRef(new Animated.Value(0)).current

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

  const pauseTimer = () => {
    clearInterval(intervalRef.current)
    setElapsedTime(0)
    console.log('타이머 일시정지')
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
      // const position = {
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      // }
      // setPath((prevPath) => [...prevPath, position])
      // webViewRef.current.postMessage(path, '*')

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
      // console.log(path)
    }
  }

  const startCountDown = () => {
    const countdownInterval = setInterval(() => {
      // 각 숫자에 대한 애니메이션

      console.log('몇번 반복')
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 0,
          // easing: Easing.linear,
          useNativeDriver: true,
        }),

        Animated.timing(animatedValue, {
          toValue: 100,
          duration: 1000,
          // easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // 애니메이션이 끝나면 숫자 감소

        setCount((prevCount) => prevCount - 1)
        countDownRef.current = countDownRef.current + 1

        // console.log('여기')

        console.log(countDownRef.current, 'count ')
        if (countDownRef.current === 4) {
          intervalRef.current = setInterval(() => {
            setElapsedTime((prev) => prev + 1)
          }, 1000)
          console.log('카운트 다운 종료!')
          setCountDown(false) // 카운트 종료 후 버튼을 다시 활성화
          setIsTracking(true)
          countDownRef.current = -1

          // clearInterval(countdownInterval);
          // getLocationData()
          // setWebViewKey((prev)=>prev+1)

          // return

          setCount(5)
        }
      })
    }, 1000)

    return () => clearInterval(countdownInterval)
  }

  useEffect(() => {
    if (countDown) {
      console.log(countDown)
      // 이전에 설정한 setInterval 제거 후 새로운 setInterval 설정
      const clearPreviousInterval = startCountDown()
      // startCountDown()
      // useEffect가 다시 호출될 때 이전에 설정한 setInterval을 제거

      return clearPreviousInterval
    }

    // startTracking()
  }, [countDown, count])

  const handleStartButton = () => {
    setIsTracking(false)

    setCountDown(true)
    webViewRef.current.postMessage('startTracking')
    // setWebViewKey((prevKey) => prevKey + 1)
  }

  const stopTracking = () => {
    clearInterval(intervalRef.current)
    setIsTracking(false)
    setElapsedTime(0)
    webViewRef.current.postMessage('stopTracking')

    setWebViewKey((prevKey) => prevKey + 1)
  }

  const startCamera = async () => {
    //camera 하면 modal

    const { status } = await Camera.requestCameraPermissionsAsync()
    console.log(status)
    if (status !== 'granted') {
      console.log('Location permission denied')
      return
    }

    //허용 할지 말지, 허용 이 된경우라면 모달창을띄우고, tracking을 중지한다.

    setModalCamera(true)
    pauseTimer()
    if (cameraRef && modalCamera) {
      const photo = await cameraRef.takePictureAsync()
      console.log(photo)
      // Handle the captured photo as needed
    }
  }

  const closeModal = () => {
    setModalCamera(false)
    // startTracking()
  }

  const apiKey = Constants.manifest.extra.KAKAO_JAVASCRIPT_KEY

  const url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`

  // const modalYes = () =>{

  // }

  return (
    <View style={styles.container}>
      {countDown ? (
        <View
          style={{
            zIndex: 999,
            backgroundColor: 'black',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Animated.Text
            style={{
              fontSize: 1,
              color: 'white',
              transform: [{ scale: animatedValue }],
              opacity: animatedValue,
            }}
          >
            {count > 3 ? '' : count}
          </Animated.Text>
        </View>
      ) : (
        ''
      )}
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

      <Camera
        // style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      ></Camera>
      {/* <View></View> */}
      {modalCamera ? (
        <Modal
          animationType="slide"
          onRequestClose={closeModal}
          transparent={true}
        >
          <View style={styles.modal_container}>
            <View style={styles.modal_content}>
              <Text>
                사진 촬영을 하면 플로깅 기록이 중지됩니다.사진 촬영을
                하시겠습니까?
              </Text>
              <View style={styles.button_box}>
                <TouchableOpacity
                  // onPress=
                  style={styles.button}
                >
                  <Text>예</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={closeModal}>
                  <Text>아니오</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        <></>
      )}
      {/* 
      <Modal
        animationType="slide"
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={styles.modal_container}>
          <View style={styles.modal_content}>
            <Text>
              다른사람을 추적하시겠습니까?
            </Text>
            <View style={styles.button_box}>
              <TouchableOpacity style={styles.button} onPress={closeModal}>
                <Text>예</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={closeModal}>
                <Text>아니오</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}

      <WebView
        style={styles.webView}
        ref={webViewRef}
        key={webViewKey}
        source={{ html: mapPolylineHTML(url, position) }}
        onLoad={() => {
          if (!status) {
            startLocationTracking()
          }
        }}
        // injectJavaScript={true}
        // injectedJavaScript={true}
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
              onPress={startCamera}
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
              onPress={handleStartButton}
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

      {/* <Footer></Footer> */}
    </View>
  )
}

export default LocationTracker
