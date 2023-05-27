import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

const locationTracker = () => {
  const webViewRef = useRef();
  const apiKey = Constants.manifest.extra.KAKAO_JAVASCRIPT_KEY

  useEffect(() => {
    // 컴포넌트가 마운트될 때 위치 추적을 시작
    startLocationTracking();
  }, []);

  const handleMessage = (event) => {
    // 위치 정보를 받아온 후 처리할 로직을 작성
    const position = JSON.parse(event.nativeEvent.data);
    console.log('Received position:', position);
  };

  const startLocationTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }
  
      const listener = (location) => {
        const position = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        sendPositionToWebView(position);
      };
  
      const subscription = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 0,
        },
        listener
      );
  
      // To stop the tracking, you can use the following code:
      // subscription.remove();
  
    } catch (error) {
      console.log('Location tracking error:', error);
    }
  };

  const sendPositionToWebView = (position) => {
    const message = JSON.stringify(position);
    webViewRef.current.postMessage(message);
  };

   const mapPloylineHTML =  `
   <html>
   <head>
     <meta charset="utf-8">
     <style>
       .dot {overflow:hidden;float:left;width:12px;height:12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png');}
       .dotOverlay {position:relative;bottom:10px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;font-size:12px;padding:5px;background:#fff;}
       .dotOverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
       .number {font-weight:bold;color:#ee6152;}
       .dotOverlay:after {content:'';position:absolute;margin-left:-6px;left:50%;bottom:-8px;width:11px;height:8px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png')}
       .distanceInfo {position:relative;top:5px;left:5px;list-style:none;margin:0;}
       .distanceInfo .label {display:inline-block;width:50px;}
       .distanceInfo:after {content:none;}
     </style>
   </head>
   <body>
     <div id="map" style="width:100%;height:70%;"></div>  
   
     <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}"></script>
     <script>
       var mapContainer = document.getElementById('map'); // 지도를 표시할 div  
       var mapOption = {
         center: new kakao.maps.LatLng(37.541, 126.986), // 지도의 중심 좌표
         level: 1 // 지도의 확대 레벨
       };
   
       var map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성
   
       var path = []; // 이동 경로를 저장할 배열
       var polyline = null; // 선을 표시할 변수
       var marker = null; // 사용자 위치를 표시할 마커
   
       window.addEventListener('message', function (event) {
         var position = JSON.parse(event.data);
         updatePath(position);
         console.log(position);
       });
   
       // 사용자의 위치 변경을 감지하여 이동 경로를 업데이트하고 선과 마커 그림
       function updatePath(position) {
         var latLng = new kakao.maps.LatLng(position.latitude, position.longitude);
   
         // 이동 경로에 새로운 위치 추가
         path.push(latLng);
   
         // 선을 그리고 지도에 표시
         drawPolyline();
   
         // 지도 중심을 사용자의 위치로 이동
         map.setCenter(latLng);

         if (path.length === 1) {
          drawMarker(latLng);
        }
       }
   
       // 선을 그리는 함수
       function drawPolyline() {
         // 이전에 그려진 선이 있다면 지도에서 제거
         if (polyline) {
           polyline.setMap(null);
         }
   
         // 새로운 선을 생성하고 지도에 표시
         polyline = new kakao.maps.Polyline({
           map: map, // 선을 표시할 지도
           path: path, //
           strokeWeight: 3, // 선의 두께
           strokeColor: '#db4040', // 선의 색깔
           strokeOpacity: 0.7, // 선의 투명도
           strokeStyle: 'solid' // 선의 스타일
     });
   }
   
   // 마커를 생성하고 지도에 표시하는 함수 -> 자신의 위치를 보고 싶을 때 사용
   function drawMarker(position) {
     // 이전에 생성된 마커가 있다면 지도에서 제거합니다
     if (marker) {
       marker.setMap(null);
     }
   
     // 새로운 마커를 생성하고 지도에 표시합니다
     marker = new kakao.maps.Marker({
       position: position,
       map: map
     });
   }
     </script>
   </body>
   </html>`

  return (
    <View style={styles.container}>
      <WebView
  ref={webViewRef}
  source={{ html: mapPloylineHTML }}
  onLoad={() => {
    // 웹뷰가 로드될 때 위치 추적을 시작합니다.
    startLocationTracking();
  }}
  onMessage={handleMessage}
  style={styles.webView}
  javaScriptEnabled={true}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default locationTracker;

