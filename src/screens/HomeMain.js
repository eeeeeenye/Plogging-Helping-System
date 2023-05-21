import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios'
import clientManager from '../helpers/localStorage';

const KakaoMapScreen = (props) => {
  const [position, setPosition] = useState(null);
  const [city, setCity] = useState(null);
  const setting = props.tag || false;
  const ip = Constants.manifest.extra.Local_ip;
  console.log(props.width, props.height)

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();

      //현재 위치 정보 얻기 -> 시스템 location
      const locationData = await Location.getCurrentPositionAsync();
      const latitude = locationData['coords']['latitude']; // 위도 가져오기
      const longitude = locationData['coords']['longitude']; // 경도 가져오기
      const location = await Location.reverseGeocodeAsync(
        // 위도와 경도를 입력하면 자신의 위치를 역으로 변환
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      setPosition({ lat: latitude, lng: longitude });
      setCity(location[0].district);
      clientManager.storeData('city',city)

    } catch {
      Alert.alert('위치 사용을 허용해주세요.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      getLocation();
    };
    
    fetchData();
  }, [city]);

  // position이 존재하지 않으면 렌더링하지 않는다.
  if (!position) {
    return null;
  }

  // 카카오 맵 API를 사용하기 위한 설정값
  const apiKey = Constants.manifest.extra.KAKAO_JAVASCRIPT_KEY;
  console.log(apiKey);
  const url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`;
  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="${url}"></script>
      </head>
      <body>
        <div id="map" style="width:${props.width};height:${props.height};"></div>
        <script>
          const container = document.getElementById('map');
          const options = {
            center: new kakao.maps.LatLng(${position?.lat}, ${position?.lng}), // 현재 위치를 기준으로 지도를 보여준다.
            level: 3,
          };
          const map = new kakao.maps.Map(container, options);
          const markerPosition = new kakao.maps.LatLng(${position?.lat}, ${position?.lng});
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map); // 현재 위치에 마커를 찍는다.
        </script>
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled={true}
        injectedJavaScript={''}
        style={{ 
          flex: 1,
          top: 100 }}
      />
    </View>
  );
};

export default KakaoMapScreen;
