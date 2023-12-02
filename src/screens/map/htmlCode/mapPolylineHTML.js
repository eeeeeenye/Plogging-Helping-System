const mapPolylineHTML = (url, position) => {
  return `
    <html>
    <head>
    <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=0.8">
      <script type="text/javascript" src="${url}"></script>

      <style>
        .dot {overflow:hidden;float:left;width:12px;height:12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png');}
        // .dotOverlay {position:relative;bottom:10px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;font-size:12px;padding:5px;background:#fff;}
        // .dotOverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
        // .number {font-weight:bold;color:#ee6152;}
        // .dotOverlay:after {content:'';position:absolute;margin-left:-6px;left:50%;bottom:-8px;width:11px;height:8px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png')}
        // .distanceInfo {position:relative;top:5px;left:5px;list-style:none;margin:0;}
        // .distanceInfo .label {display:inline-block;width:50px;}
        // .distanceInfo:after {content:none;}
      </style>
    </head>
    <body>

      <div id="map" style="width:100%;height:100%;"></div>  
    


      <script  type="text/javascript">

      const container = document.getElementById('map');
      const options = {

        center: new kakao.maps.LatLng(${position.lat}, ${position.lng}), // 현재 위치를 기준으로 지도를 보여준다.
        level: 1
      };

      const map = new kakao.maps.Map(container, options);

    
      var imageSrc = "https://i.ibb.co/VWM1283/free-icon-earth-5695068.png" , // 마커이미지의 주소입니다    
      imageSize = new kakao.maps.Size(25, 25), // 마커이미지의 크기입니다
      imageOption = {offset: new kakao.maps.Point(13, 30)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        
  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
      markerPosition = new kakao.maps.LatLng(${position.lat}, ${position.lng}); // 마커가 표시될 위치입니다
  
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
      position: markerPosition, 
      image: markerImage // 마커이미지 설정 ,
    });

    // document.addEventListener('message', function (event) {


    // })


      marker.setMap(map); // 현재 위치에 마커를 찍는다.    
        
      
      // 지도에 표시합니다
      var circleOverlay = new kakao.maps.CustomOverlay({
          content: '<span class="dot"></span>',
          position:  markerPosition,
        });
  

      var path = [markerPosition]; // 이동 경로를 저장할 배열
     

      var linePath = []; // 위치를 기록할 배열
      var polyline;

    
     //center가 변하면 갱신한다 즉, 맵을 움직이면 따라 움직인다.


 
    const drawPolyline = (path) => {
      if (polyline) {
        polyline.setMap(null);
    }

      polyline = new kakao.maps.Polyline({
          path: path,
          strokeWeight: 5,
          strokeColor: '#FF0000',
          strokeOpacity: 1,
          strokeStyle: 'solid'
      });

      polyline.setMap(map);
  }

  function startTracking() {
    // 위치가 변경될 때마다 호출되는 이벤트 핸들러
    kakao.maps.event.addListener(map, 'center_changed', function() {
        var currentCenter = map.getCenter();

        linePath.push(currentCenter);
        marker.setPosition(newCenter); // 지구본 마커의 위치를
        circleOverlay.setPosition(newCenter)// 마커의 위치를 새중심
        // 시작점부터 현재 위치까지 라인을 그린다.
        drawPolyline(linePath);
    });
}

kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
  var clickedPosition = mouseEvent.latLng;

  // 지도 중심을 클릭한 위치로 이동
  map.setCenter(clickedPosition);

  // 트래킹 시작
});


    document.addEventListener('message', function (event) {
//시작후 polyline 생성

  
  
    
    if(event.data==='startTracking'){
      circleOverlay.setMap(map);
      startTracking();
      // centerChange()
      line.setMap(map);
    }
    else if(event.data==='stopTracking'){
      line.setMap(null)
    }

    
    })

        // var polyline = null; // 선을 표시할 변수
        // var marker = null; // 사용자 위치를 표시할 마커
        // var lastPosition = null; // 마지막 위치
    
        // document.addEventListener('message', function (event) {

         

          // }); 
        // })
  //         var position = JSON.parse(event.data);
  //         if (message.reset) {
  //           resetPath();
  //         } else {
  //           var position = message.position;
  //           updatePath(position);
  //         }
  //       });

  //       function resetPath() {
  //       // 선 제거
  //         if (polyline) {
  //           polyline.setMap(null);
  //           polyline = null;
  //         }
  
  //       마커 제거
  //       if (marker) {
  //         marker.setMap(null);
  //         marker = null;
  //       }
  
  //       경로 초기화
  //       path = [];
  //     }

  //     사용자의 위치 변경을 감지하여 이동 경로를 업데이트하고 선과 마커 그림
  //     function updatePath(position) {
  //       var latLng = new kakao.maps.LatLng(position.latitude, position.longitude);
  
  //       if (lastPosition) {
  //         var lastLatLng = new kakao.maps.LatLng(lastPosition.latitude, lastPosition.longitude);
  //         path.push(lastLatLng);
  //       }

  //       // 이동 경로에 새로운 위치 추가
  //       path.push(latLng);
  
  //       // 선을 그리고 지도에 표시
  //       drawPolyline();
  
  //       // 지도 중심을 사용자의 위치로 이동
  //       map.setCenter(latLng);

  //       if (path.length === 1) {
  //        drawMarker(latLng);
  //      }
  //     }
  
  //     // 선을 그리는 함수
  //     function drawPolyline() {
  //       // 이전에 그려진 선이 있다면 지도에서 제거
  //       if (polyline) {
  //         polyline.setMap(null);
  //       }
  
  //       // 새로운 선을 생성하고 지도에 표시
  //       polyline = new kakao.maps.Polyline({
  //         map: map, // 선을 표시할 지도
  //         path: path, //
  //         strokeWeight: 15, // 선의 두께
  //         strokeColor: 'rgb(135, 206, 235)', // 선의 색깔
  //         strokeOpacity: 1, // 선의 투명도
  //         strokeStyle: 'solid', // 선의 스타일
  //         strokeColor: 'rgb(0, 0, 255)'
  //   });
  // }
  
  //     // 마커를 생성하고 지도에 표시하는 함수 -> 자신의 위치를 보고 싶을 때 사용
  //     function drawMarker(position) {
  //     // 이전에 생성된 마커가 있다면 지도에서 제거합니다
  //       if (marker) {
  //         marker.setMap(null);
  //       }

  //     // 사용자 위치를 표시할 마커 아이콘 이미지
  //     var markerImage = new kakao.maps.MarkerImage(
  //       'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png',
  //       new kakao.maps.Size(30, 30),
  //       {
  //         offset: new kakao.maps.Point(6, 6),
  //       }
  //  );

  //     // 새로운 마커를 생성하고 지도에 표시
  //     marker = new kakao.maps.Marker({
  //       position: position,
  //       map: map,
  //       image: markerImage,
  //     });

  //     // 지도 중심을 마커 위치로 이동
  //     map.setCenter(position);
  //     }

  //    window.addEventListener('message', function (event) {
  //       var position = JSON.parse(event.data);
  //       updatePath(position);
    
  //     });

  //     // 사용자의 위치 변경을 감지하여 이동 경로를 업데이트하고 선과 마커 그림
  //     function updatePath(position) {
  //       var latLng = new kakao.maps.LatLng(position.latitude, position.longitude);

  //       // 이동 경로에 새로운 위치 추가
  //       path.push(latLng);

  //      // 선을 그리고 지도에 표시
  //       drawPolyline();

  //       if (path.length === 1) {
  //       drawMarker(latLng);
  //       } else {
  //         // 이동한 위치로 마커 이동
  //         marker.setPosition(latLng);
  //       }
  //     }

    </script>
  </body>
  </html>`
}

export default mapPolylineHTML
