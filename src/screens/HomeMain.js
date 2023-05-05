import React,{useEffect} from 'react'
import {WebView} from 'react-native-webview';
import { View } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

const KakaoMapScreen = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // 사용자의 현재 위치를 받아오기 위한 함수
    navigator.geolocation.getCurrentPosition(               //웹에서 자신의 위치 가져오는 것으로 EXPO-LOCATION을 이용하여 자신의 위치를 가져올 수 있음
      ({ coords }) => {                                     //수정 필요
        // 받아온 위치를 position state에 저장한다.
        setPosition({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  // position이 존재하지 않으면 렌더링하지 않는다.
  if (!position) {
    return null;
  }

  // 카카오 맵 API를 사용하기 위한 설정값
  const apiKey = Constants.manifest.extra.KAKAO_JAVASCRIPT_KEY;
  const url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`;
  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="${url}"></script>
      </head>
      <body>
        <div id="map" style="width:100%;height:100%;"></div>
        <script>
          const container = document.getElementById('map');
          const options = {
            center: new kakao.maps.LatLng(${position.lat}, ${position.lng}), // 현재 위치를 기준으로 지도를 보여준다.
            level: 3,
          };
          const map = new kakao.maps.Map(container, options);
          const markerPosition = new kakao.maps.LatLng(${position.lat}, ${position.lng});
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
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default KakaoMapScreen;
