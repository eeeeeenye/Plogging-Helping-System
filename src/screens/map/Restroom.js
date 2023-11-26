import React, { useEffect, useState } from 'react'
import { WebView } from 'react-native-webview'
import { View, Alert } from 'react-native'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import axios from 'axios'
import Button from '../../components/Button'
import RestroomSet from './htmlCode/RestroomHTML'

const RestroomSettings = ({ navigation }) => {
  const [position, setPosition] = useState(null)
  const [city, setCity] = useState(null)
  const ip = Constants.manifest.extra.Local_ip

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        // 처리 권한이 부여되지 않음
        return
      }

      const locationData = await Location.getCurrentPositionAsync()
      const latitude = locationData['coords']['latitude']
      const longitude = locationData['coords']['longitude']
      const location = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      )
      setPosition({ lat: latitude, lng: longitude })
      setCity(location[0].district)
    } catch (error) {
      console.error(error)
      Alert.alert(error)
    }
  }

  const fetchToiletData = async () => {
    try {
      const response = await fetch(
        'http://api.data.go.kr/openapi/tn_pubr_public_toilet_api'
      )
      const data = await response.json()
      const toiletLocations = data.result

      const RestroomSet = (url, position, markers) => {
        return `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=093f44ff0baa195ab8c672ddce75f0fd&libraries=services"></script>
              <style>
                #map {
                  width: 100%;
                  height: 100%;
                }
              </style>
            </head>
            <body>
              <div id="map"></div>
              <script>
                const markers = ${JSON.stringify(
                  markers
                )}; // 가져온 화장실 위치 데이터

                // Kakao 지도 API 초기화 
                kakao.maps.load(() => {
                  const container = document.getElementById('map');
                  const options = {
                    center: new kakao.maps.LatLng(37.5665, 126.9780), // 초기 지도 중심 좌표 설정
                    level: 3, // 초기 지도 확대 레벨 설정
                  };
                  const map = new kakao.maps.Map(container, options);

                  // 화장실 위치에 마커 생성
                  markers.forEach((marker) => {
                    const markerPosition = new kakao.maps.LatLng(marker.latitude, marker.longitude);
                    const marker = new kakao.maps.Marker({
                      position: markerPosition,
                    }); 
                    marker.setMap(map);
                  });
                });
              </script>
            </body>
          </html>
        `
      }

      const html = RestroomSet(
        Constants.manifest.extra.KAKAO_JAVASCRIPT_KEY,
        position,
        toiletLocations
      )
      return html
    } catch (error) {
      console.error(error)
      Alert.alert(error)
    }
  }

  const onPressButton = async () => {
    try {
      console.log(city, '----------------->>>>')
      await axios.put(`http://${ip}:3000/plogging/:params`, { city: city })
      navigation.navigate('HomeMain')
    } catch (event) {
      console.log(event)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getLocation()
      const html = await fetchToiletData()
      setWebViewHtml(html)
    }

    fetchData()
  }, [])

  const [webViewHtml, setWebViewHtml] = useState(null)

  if (!position || !webViewHtml) {
    return null
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: webViewHtml }}
        javaScriptEnabled={true}
        injectedJavaScript={''}
        style={{
          flex: 1,
          top: 100,
        }}
      />
      <Button mode="outlined" onPress={onPressButton} style={{ bottom: 130 }}>
        확인
      </Button>

      {/* <MyComponent /> MyComponent를 렌더링 */}
    </View>
  )
}

export default RestroomSettings
