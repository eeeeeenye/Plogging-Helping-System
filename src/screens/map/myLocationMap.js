import React, { useEffect, useState } from 'react'
import { WebView } from 'react-native-webview'
import { View, Alert, Text, TouchableOpacity } from 'react-native'
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
import { position } from '../../slices/All/locationslice.ts'

const MylocationMap = ({ navigation }) => {
  const [city, setCity] = useState(null)
  const [address, setAddress] = useState(null)
  const ip = Constants.manifest.extra.Local_ip
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const name = user ? user.name : ''

  // console.log(name, '--------LocationSetting')
  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync()

      //현재 위치 정보 얻기 -> 시스템 location
      const locationData = await Location.getCurrentPositionAsync()
      const latitude = locationData['coords']['latitude'] // 위도 가져오기
      const longitude = locationData['coords']['longitude'] // 경도 가져오기
      const location = await Location.reverseGeocodeAsync(
        // 위도와 경도를 입력하면 자신의 위치를 역으로 변환
        { latitude, longitude },
        { useGoogleMaps: false }
      )
      console.log(latitude, longitude)
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

      // console.log(position, city)

      //   const response = await axios.get(
      //     `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
      //     {
      //       headers: {
      //         Authorization: apiKey, // 카카오 API 키를 여기에 추가
      //       },
      //     }
      //   )
      //   const data = response.data
      //   console.log(data)
      //   if (data.results.length > 0) {
      //     console.log('주소x')
      //   } else {
      //     console.log('주소x')
      //   }

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

    dispatch(position(address))
    navigation.navigate('ResidenceSetting')
  }

  useEffect(() => {
    const fetchData = async () => {
      getLocation()
    }

    fetchData()
  }, [])
  // position이 존재하지 않으면 렌더링하지 않는다.
  if (!position) {
    return null
  }

  // 카카오 맵 API를 사용하기 위한 설정값
  const apiKey = Constants.manifest.extra.KAKAO_JAVASCRIPT_KEY
  const url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services`
  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: daumPostSet(url, position) }}
        javaScriptEnabled={true}
        injectedJavaScript={''}
        domStorageEnabled={true}
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
