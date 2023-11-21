const mapPolylineHTML = (apiKey) => {
  return `
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
      <div id="map" style="width:100%;height:100%;"></div>  
    
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}"></script>
      <script>

        
//           center: new kakao.maps.LatLng(position[0].latitude, position[0].longitude), // 지도의 중심 좌표
// 

alert('한마루')

window.addEventListener('message', function (event) {
  event.data에 React Native에서 전송한 메시지가 포함됨
  const receivedMessage = event.data;
  alert(receivedMessage)

});


        // const position = JSON.parse(event.data);
// const position = event.data
        // window.ReactNativeWebView.postMessage(position)
        var mapContainer = document.getElementById('map'); // 지도를 표시할 div  

        var mapOption = {
          center: new kakao.maps.LatLng(36.374256, 127.3206123), // 지도의 중심 좌표
          level: 1 // 지도의 확대 레벨
        };
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성

         
    
        var path = []; // 이동 경로를 저장할 배열
        var polyline = null; // 선을 표시할 변수
        var marker = null; // 사용자 위치를 표시할 마커
        var lastPosition = null; // 마지막 위치
    
        window.addEventListener('message', function (event) {
          var position = JSON.parse(event.data);
          if (message.reset) {
            resetPath();
          } else {
            var position = message.position;
            updatePath(position);
          }
        });

        function resetPath() {
        // 선 제거
          if (polyline) {
            polyline.setMap(null);
            polyline = null;
          }
  
        // 마커 제거
        // if (marker) {
        //   marker.setMap(null);
        //   marker = null;
        // }
  
        // 경로 초기화
        path = [];
      }

      // 사용자의 위치 변경을 감지하여 이동 경로를 업데이트하고 선과 마커 그림
      function updatePath(position) {
        var latLng = new kakao.maps.LatLng(position.latitude, position.longitude);
  
        if (lastPosition) {
          var lastLatLng = new kakao.maps.LatLng(lastPosition.latitude, lastPosition.longitude);
          path.push(lastLatLng);
        }

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
          strokeWeight: 15, // 선의 두께
          strokeColor: 'rgb(135, 206, 235)', // 선의 색깔
          strokeOpacity: 1, // 선의 투명도
          strokeStyle: 'solid', // 선의 스타일
          strokeColor: 'rgb(0, 0, 255)'
    });
  }
  
      // 마커를 생성하고 지도에 표시하는 함수 -> 자신의 위치를 보고 싶을 때 사용
      function drawMarker(position) {
      // 이전에 생성된 마커가 있다면 지도에서 제거합니다
        if (marker) {
          marker.setMap(null);
        }

      // 사용자 위치를 표시할 마커 아이콘 이미지
      var markerImage = new kakao.maps.MarkerImage(
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png',
        new kakao.maps.Size(30, 30),
        {
          offset: new kakao.maps.Point(6, 6),
        }
   );

      // 새로운 마커를 생성하고 지도에 표시
      marker = new kakao.maps.Marker({
        position: position,
        map: map,
        image: markerImage,
      });

      // 지도 중심을 마커 위치로 이동
      map.setCenter(position);
      }

     window.addEventListener('message', function (event) {
        var position = JSON.parse(event.data);
        updatePath(position);
    
      });

      // 사용자의 위치 변경을 감지하여 이동 경로를 업데이트하고 선과 마커 그림
      function updatePath(position) {
        var latLng = new kakao.maps.LatLng(position.latitude, position.longitude);

        // 이동 경로에 새로운 위치 추가
        path.push(latLng);

       // 선을 그리고 지도에 표시
        drawPolyline();

        if (path.length === 1) {
        drawMarker(latLng);
        } else {
          // 이동한 위치로 마커 이동
          marker.setPosition(latLng);
        }
      }

    </script>
  </body>
  </html>`
}

export default mapPolylineHTML
