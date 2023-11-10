import React, { useEffect, useState } from 'react'
import { WebView } from 'react-native-webview'
import { View, Alert, Text } from 'react-native'
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

const MylocationMap = ({ navigation }) => {
  const [position, setPosition] = useState(null)
  const [city, setCity] = useState(null)
  const ip = Constants.manifest.extra.Local_ip
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const name = user ? user.name : ''

  console.log(name, '--------LocationSetting')
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

      setPosition({ lat: latitude, lng: longitude })
      setCity(location[0])

      axios
        .get(
          ` https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
          {
            headers: {
              Authorization: `KakaoAK ${process.env.REST_API_KEY}`,
            },
          }
        )
        .then((response) => {
          const data = response.data
          if (data.documents && data.documents.length > 0) {
            const firstDocument = data.documents[0]
            console.log(firstDocument, 'firstDocu')
            //   setAddress(firstDocument.address_name)
          } else {
            //   setAddress('주소를 찾을 수 없습니다.')
          }
        })
        .catch((error) => {
          console.error('API 호출 오류:', error)
        })
      console.log(position, city)

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
  // const onPressButton = async () => {
  //   // 버튼을 누르면 작동하는 기능들 (회원 상태값 업데이트, 화면전환)
  //   try {
  //     console.log(city, name, '----------------->>>>')
  //     await axios.put(`http://${ip}:3000/plogging/:params`, {
  //       ClientName: name,
  //       city: city,
  //     })
  //     dispatch(addAdress({ adress: city, status: true }))
  //     navigation.navigate('HomeMain')
  //   } catch (event) {
  //     console.log(event)
  //   }
  // }

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
        style={{
          flex: 1,
          // top: ,
        }}
      />
      <View style={{ flex: 0.4 }}>
        <Text>대전 유성구 은구비서로 </Text>
        <Button mode="outlined">주소 설정</Button>
      </View>
    </View>
  )
}

export default MylocationMap
