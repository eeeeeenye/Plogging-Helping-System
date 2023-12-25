import React, { useRef, useEffect, useState, memo, useFocusEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Alert,
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
import { AutoFocus, Camera, CameraType, CameraPre } from 'expo-camera'
import TrackingModal from '../../components/trackingModal'
import { modalToggle } from '../../slices/All/toggle'
import haversine from 'haversine'
import CameraSettings from '../camera/cameraSettings'
import {
  setCameraImage,
  setCameraOn,
  setCameraType,
  setPreviewVisible,
} from '../../slices/All/cameraSlice'
import CameraPreview from '../camera/cameraPreview'
import {
  stop,
  start,
  reset,
  updateElapsedTime,
  setIsRunning,
} from '../../slices/All/Watchslice'
import StopWatch from '../addons/Watch2'
const LocationTracker = () => {
  const webViewRef = useRef(null)
  const intervalRef = useRef(null)

  const [startTime, setStartTime] = useState(0)

  const subscriptionRef = useRef(null)
  const cameraRef = useRef(null)
  let newSubscription = null

  let countDownRef = useRef(0)
  const status = useSelector((state) => state.stopwatch.isRunning)
  const cameraType = useSelector((state) => state.camera.cameraType)
  const cameraOn = useSelector((state) => state.camera.cameraOn)
  const cameraImage = useSelector((state) => state.camera.cameraImage)

  const previewVisible = useSelector((state) => state.camera.previewVisible)
  const dispatch = useDispatch()
  const [webViewKey, setWebViewKey] = useState(1)

  // const [cameraOn, setCameraOn] = useState(false)
  const [remainingTime, setRemainingTime] = useState(5000) // 초기값으로 5초 설정

  const [isTracking, setIsTracking] = useState(false)
  const [locationSubscription, setLocationSubscription] = useState(null)
  const [distance, setDistance] = useState(0)
  const [position, setPosition] = useState({})
  const [path, setPath] = useState([])
  const [isPause, setIsPause] = useState(false)

  const [distanceTime, setDistanceTime] = useState(0)

  // const [cameraRef, setCameraRef] = useState(null)
  const [modalCamera, setModalCamera] = useState(false)
  const [modalWalkTracking, setModalWalkTracking] = useState(false)

  const [currentLocation, setCurrentLocation] = useState(null)

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
      console.log('start')
      startLocationTracking()
    } else {
      console.log('stop')
      // stopLocationTracking()
    }
  }, [])

  //pause인 상황이고, tracking이 start가 된상ㅎ

  useEffect(() => {
    if (path.length >= 2) {
      console.log(path, 'pathUpdate')

      updateDistance(path)
      // setPath([])
    }
  }, [path])

  useEffect(() => {
    console.log(distance, 'useEffect Distance')
    dispatch(distCal(distance))
  }, [distance])

  // 웹뷰에 보낼 메시지를 관리 (position)

  const pauseTimer = () => {
    //pause하면 잠시 시간을 멈춘다.
    dispatch(stop())

    // setElapsedTime(0)
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
      const latitude = locationData['coords']['latitude'] // 위도 가져오기
      const longitude = locationData['coords']['longitude'] // 경도 가져오기
      setPosition({ lat: latitude, lng: longitude })
      setPath([{ latitude: latitude, longitude: longitude }])
    } catch (error) {
      console.log('Location tracking error:', error)
    }
  }
  const listener = (location) => {
    const position = {
      latitude: location.coords.latitude - Math.random() * 0.001,
      longitude: location.coords.longitude - Math.random() * 0.001,
    }
    setPath((prevPath) => [...prevPath, position])
    sendPositionToWebView(position)
  }

  const calculateDistance = () => {
    //움직이면 내위치를 계산하는데, 5초마다 갱신하도록 한다.

    if (!locationSubscription) {
      // 구독이 존재하는 경우 만들지 않음 (중복방지)

      // const startTime = Date.now();

      //거리계산 시작시

      subscriptionRef.current = setTimeout(async () => {
        newSubscription = await Location.watchPositionAsync(
          // watchPosition은 비동기 함수이고, 반환값은 _h,_i,_j(remove함수 포함 -> 제어함수들 포함)
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 0,
          },
          listener
        )

        setLocationSubscription(newSubscription)
      }, 5000)
    }
  }

  // webViewRef를 사용하여 웹뷰와 통신
  const sendPositionToWebView = (position) => {
    const message = JSON.stringify(position)

    if (webViewRef.current) {
      webViewRef.current.postMessage(message)
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
    // console.log('Received position:', message)
  }
  const updateDistance = (path) => {
    if (path.length > 0) {
      const lastPosition = path[path.length - 1]
      console.log(lastPosition, 'lastPosition', path)

      const distanceInMeters = haversine(
        { latitude: lastPosition.latitude, longitude: lastPosition.longitude },
        { latitude: path[0].latitude, longitude: path[0].longitude },
        { unit: 'meter' }
      )

      console.log(distanceInMeters, 'disMeters')
      const distanceInkilometers = parseFloat(
        (distanceInMeters / 1000).toPrecision(2)
      )

      console.log(distance, 'dist', distanceInkilometers, 'kilometers')
      setDistance(Math.round((distance + distanceInkilometers) * 100) / 100)
      setPath([{ latitude: path[0].latitude, longitude: path[0].longitude }])
      // console.log(distance)
    }
  }

  const startCountDown = () => {
    const countdownInterval = setInterval(() => {
      // 각 숫자에 대한 애니메이션

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

        if (countDownRef.current >= 4) {
          dispatch(start())
          setCountDown(false) // 카운트 종료 후 버튼을 다시 활성화
          setIsTracking(true)
          countDownRef.current = -1

          calculateDistance()

          const startTracking = { data: 'startTracking' }

          sendPositionToWebView(startTracking)
          setStartTime(Date.now())

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
    const startTracking = { data: 'startTracking' }
    setIsTracking(false)
    setCountDown(true)
    // sendPositionToWebView(startTracking)
    // setWebViewKey((prevKey) => prevKey + 1)
  }

  const stopTracking = () => {
    const stop = { data: 'stopTracking' }

    Alert.alert('기록종료', '기록을 종료하시겠습니까?', [
      {
        text: '예',
        onPress: () => {
          clearInterval(intervalRef.current)
          setIsTracking(false)
          dispatch(reset())
          pauseTimer()
          setDistance(0)
          sendPositionToWebView(stop)
          setIsPause(false)

          setWebViewKey((prevKey) => prevKey + 1)

          stopLocationTracking()
        },
      },
      {
        text: '아니오',
        onPress: () => {},
      },
    ])
  }

  // status가 false일 경우에 실행
  const stopLocationTracking = () => {
    clearTimeout(subscriptionRef.current)
    subscriptionRef.current = null
    console.log(subscriptionRef.current, 'subscription', locationSubscription)
    if (locationSubscription && !subscriptionRef.current) {
      locationSubscription.remove() // Location.clearWatch(newSubscription)
      setLocationSubscription(null)
      newSubscription = null

      // newSubscription.remove()
    }
  }

  const startCamera = async () => {
    //camera 하면 modal

    const { status } = await Camera.requestCameraPermissionsAsync()
    console.log(status)
    if (status !== 'granted') {
      console.log('Location permission denied')
      // dispatch(cameraOn(false))
      // setCameraOn(false)
      return
    } else {
      // dispatch(cameraOn(true))
      setModalCamera(true)
      pauseTimer()
      stopLocationTracking()
    }
  }

  const closeModal = () => {
    //만약 일시 정지 상태면 그대로 일시정지가 아니면 실행

    if (!isPause) {
      setModalCamera(false)
      dispatch(start())
      calculateDistance()
    }
    setModalCamera(false)

    // startTracking()
  }
  const openCamera = () => {
    setModalCamera(false)

    dispatch(setCameraOn(true))
  }

  const takePictureHandler = async () => {
    // cameraRef가 없으면 해당 함수가 실행되지 않게 가드
    if (!cameraRef.current) return

    // takePictureAsync를 통해 사진을 찍습니다.
    // 찍은 사진은 base64 형식으로 저장합니다.
    await cameraRef.current
      .takePictureAsync({
        base64: true,
      })
      .then((data) => {
        dispatch(setCameraImage(data.uri))
        dispatch(setPreviewVisible(true))
        console.log(data.uri)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  //start를하면 시간을 저장
  const pauseTracking = () => {
    //시간 멈추기, => 인터벌 제거마나고 시간은 건들지 않는다.

    setIsPause(true)
    stopLocationTracking()

    // useDispatch(stop())
    pauseTimer()
  }
  const restartTracking = () => {
    //다시 시작 ,  시간
    // useDispatch(start())
    setIsPause(false)
    dispatch(start())

    calculateDistance()
  }

  console.log()
  const apiKey = Constants.expoConfig.extra.KAKAO_JAVASCRIPT_KEY

  const url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`
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
        <StopWatch></StopWatch>
      ) : (
        // <></>
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
      </View>  */}
      {previewVisible ? <CameraPreview></CameraPreview> : ''}

      {cameraOn ? (
        <Camera
          style={{ zIndex: 99, width: '100%', height: '100%' }}
          type={cameraType}
          ref={cameraRef}
          autoFocus={AutoFocus.on}
        >
          <CameraSettings
            takePictureHandler={takePictureHandler}
            closeModal={closeModal}
          ></CameraSettings>
        </Camera>
      ) : (
        // {cameraImage ? (
        ''
      )}

      {/* <View></View> */}
      {modalCamera ? (
        <Modal
          // animationType="slide"
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
                <TouchableOpacity onPress={openCamera} style={styles.button}>
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
            {isPause ? (
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
                  onPress={restartTracking}
                  style={{
                    borderRadius: 50,
                    width: 50,
                    height: 50,
                    backgroundColor: '#648764',
                    marginBottom: 10,
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      // transform: [{ rotate: '45deg' }],

                      width: 0,
                      height: 0,
                      borderTopWidth: 15,
                      borderLeftWidth: 0,
                      borderRightWidth: 25,
                      borderBottomWidth: 15,
                      borderStyle: 'solid',
                      backgroundColor: 'transparent',
                      borderLeftColor: 'transparent',
                      borderRightColor: 'white',
                      borderTopColor: 'transparent',
                      borderBottomColor: 'transparent', // 삼각형 색상을 설정합니다.
                      transform: [{ rotate: '180deg' }],
                      marginLeft: 10,
                    }}
                  ></View>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={pauseTracking}
                style={{
                  borderRadius: 50,
                  width: 50,
                  height: 50,
                  backgroundColor: '#1d1d1d',
                  marginBottom: 10,
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    // transform: [{ rotate: '45deg' }],
                    backgroundColor: 'white',
                    width: 5,
                    height: 25,
                    marginRight: 10,
                  }}
                ></View>
                <View
                  style={{
                    // transform: [{ rotate: '90deg' }],
                    backgroundColor: 'white',
                    width: 5,
                    height: 25,
                  }}
                ></View>
              </TouchableOpacity>
            )}

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
    </View>
  )
}

export default LocationTracker
