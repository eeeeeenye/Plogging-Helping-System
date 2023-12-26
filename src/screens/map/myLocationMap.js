import React, { useEffect, useState, useRef } from 'react'
import { WebView } from 'react-native-webview'
import {
  View,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import StatusManager from '../../helpers/localStorage'
import axios from 'axios'
import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import LocationSet from './htmlCode/LocationHTML'
import { useSelector, useDispatch } from 'react-redux'
import { addAdress } from '../../slices/All/Authslice'
import daumPostSet from './htmlCode/daumPostHTML'
import { location } from '../../slices/All/locationslice'

const MylocationMap = ({ navigation }) => {
  const [city, setCity] = useState(null)
  const [address, setAddress] = useState(null)
  const [position, setPosition] = useState({})
  const [loading, setLoading] = useState(false)
  const [webViewKey, setWebViewKey] = useState(1)
  const dispatch = useDispatch()

  // console.log(name, '--------LocationSetting')
  const getLocation = async () => {
    try {
      //현재 위치 정보 얻기 -> 시스템 location
      const locationData = await Location.getCurrentPositionAsync()
      const latitude = locationData['coords']['latitude'] // 위도 가져오기
      const longitude = locationData['coords']['longitude'] // 경도 가져오기

      console.log(latitude, longitude)
      setPosition({ lat: latitude, lng: longitude })
      setCity(location[0])

      const myLoc = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REST_API_KEY}`,
          },
        }
      )

      const data = myLoc.data
      if (data.documents && data.documents.length > 0) {
        const firstDocument = data.documents[0]
        console.log(data.documents)
        setAddress(firstDocument.address.address_name)
      } else {
        //   setAddress('주소를 찾을 수 없습니다.')
      }

      return
    } catch (error) {
      console.error(error)
      StatusManager.storeData('login', false)
      Alert.alert(error)
    }
  }
  const onPressButton = async () => {
    //주소 설정, 주소 설정 페이지로 넘어가고, 값 업데이트
    // 버튼을 누르면 작동하는 기능들 (회원 상태값 업데이트, 화면전환)

    dispatch(location(address))
    navigation.navigate('ResidenceSetting')
  }
  //버튼을 클릭할시 내 위치로
  const onBu = async () => {
    const locationData = await Location.getCurrentPositionAsync()
    const latitude = locationData['coords']['latitude'] // 위도 가져오기
    const longitude = locationData['coords']['longitude'] // 경도 가져오기
    setWebViewKey((prevKey) => prevKey + 1)
    setPosition({ lat: latitude, lng: longitude })

    const myLoc = await axios.get(
      ` https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${position.lng}&y=${position.lat}&input_coord=WGS84`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.REST_API_KEY}`,
        },
      }
    )
    const data = myLoc.data
    if (data.documents && data.documents.length > 0) {
      const firstDocument = data.documents[0]
      console.log(data.documents)
      setAddress(firstDocument.address.address_name)
    } else {
      //   setAddress('주소를 찾을 수 없습니다.')
    }
  }
  // WebView 로딩 시작 시
  const onLoadStart = () => {
    setLoading(true)
  }

  // WebView 로딩 종료 시
  const onLoadEnd = () => {
    setLoading(false)
  }
  useEffect(() => {
    getLocation()
  }, [])

  // position이 존재하지 않으면 렌더링하지 않는다.
  if (!position) {
    return null
  }

  // 카카오 맵 API를 사용하기 위한 설정값
  const apiKey = Constants.expoConfig.extra.KAKAO_JAVASCRIPT_KEY
  const url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services`
  return (
    <View style={{ flex: 1 }}>
      <WebView
        key={webViewKey}
        originWhitelist={['*']}
        source={{ html: daumPostSet(url, position) }}
        javaScriptEnabled={true}
        injectedJavaScript={''}
        domStorageEnabled={true}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        style={{
          flex: 1,
          // top: ,
        }}
        onMessage={async (event) => {
          const latitude = JSON.parse(event.nativeEvent.data).lat
          const longitude = JSON.parse(event.nativeEvent.data).lng

          const myLoc = await axios.get(
            ` https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
            {
              headers: {
                Authorization: `KakaoAK ${process.env.REST_API_KEY}`,
              },
            }
          )
          const data = myLoc.data
          if (data.documents && data.documents.length > 0) {
            const firstDocument = data.documents[0]
            console.log(data.documents)
            setAddress(firstDocument.address.address_name)
          } else {
            //   setAddress('주소를 찾을 수 없습니다.')
          }
        }}
      />
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      <TouchableOpacity
        activeOpacity={1}
        onPress={onBu}
        style={{
          // bottom: 30,
          justifyContent: 'center',
          alignItems: 'center',
          width: 40,
          left: 300,
          bottom: 70,
          height: 40,
          borderRadius: 40,
          backgroundColor: 'white',
          zIndex: 3,
          shadowColor: 'black',
          // shadowOffset: {
          //   width: 0,
          //   height: ,
          // },
          // shadowOpacity: 0.2,
          // shadowRadius: 10,
          elevation: 7,
        }}
      >
        <Image
          style={{ width: 20, height: 20 }}
          source={require('../../assets/gps-location.png')}
        ></Image>
      </TouchableOpacity>
      <View style={{ flex: 0.4 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 16 }}>
          {address}
        </Text>
        {/* <TouchableOpacity
          style={{
            marginLeft: 16,
            marginBottom: 16,
            width: '30%',
            height: 30,
            backgroundColor: '#848484',
            borderRadius: 10,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            지번으로 보기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 16,
            marginBottom: 16,
            width: '30%',
            height: 30,
            backgroundColor: '#848484',
            borderRadius: 10,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            도로명으로 보기
          </Text>
        </TouchableOpacity> */}

        <Button
          onPress={onPressButton}
          style={{
            width: '95%',
            marginLeft: 10,
            borderRadius: 10,
          }}
          mode="outlined"
        >
          주소 설정
        </Button>
      </View>
    </View>
  )
}

export default MylocationMap
