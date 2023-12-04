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
      var marker = null; // 사용자 위치를 표시할 마커

      const container = document.getElementById('map');
      const options = {

        center: new kakao.maps.LatLng(${position.lat}, ${position.lng}), // 현재 위치를 기준으로 지도를 보여준다.
        level: 1
      };

      const map = new kakao.maps.Map(container, options);
  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
   var markerPosition = new kakao.maps.LatLng(${position.lat}, ${position.lng}); // 마커가 표시될 위치입니다
  

      var markerImage = new kakao.maps.MarkerImage(
        "https://i.ibb.co/VWM1283/free-icon-earth-5695068.png" , 
       new kakao.maps.Size(25, 25), 
       {offset: new kakao.maps.Point(13, 30)}),
    
    
          // 새로운 마커를 생성하고 지도에 표시
          marker = new kakao.maps.Marker({
            position: markerPosition,
            // map: map,
            image: markerImage,
          });
        
  
          // 지도 중심을 마커 위치로 이동
          // map.setCenter(markerPosition);

          marker.setMap(map);

 
      //마커생성
        
      
   


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
          strokeWeight: 15,
          strokeColor: '#FF0000',
          strokeOpacity: 0.5,
          strokeStyle: 'solid'
      });

      polyline.setMap(map);
  }

// kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
//   var clickedPosition = mouseEvent.latLng;

//   // 지도 중심을 클릭한 위치로 이동
//   map.setCenter(clickedPosition);

//   // 트래킹 시작
// });

var circleOverlay = new kakao.maps.CustomOverlay({
  content: '<span class="dot"></span>',
  position:  markerPosition,
});


var polyline; // 선을 표시할 변수
var lastPosition = null; // 마지막 위치

    document.addEventListener('message', function (event) {
//시작후 polyline 생성
var position = JSON.parse(event.data);

// 지도에 표시합니다



circleOverlay.setMap(map);
    // if(event.data==='startTracking'){


updatePath(position)
      startTracking();
      drawPolyline(position);
      line.setMap(map);


    // }
   if(event.data==='stopTracking'){
      line.setMap(null)
    }

    
    })

     
        // })
  //         if (message.reset) {
  //           resetPath();
  //         } else {
  //           var position = message.position;
  //           updatePath(position);
  //         }
  //       });

        // function resetPath() {
        // // 선 제거
        //   if (polyline) {
        //     polyline.setMap(null);
        //     polyline = null;
        //   }
        // }
  
  //       마커 제거
  //       if (marker) {
  //         marker.setMap(null);
  //         marker = null;
  //       }
  
  //       경로 초기화
  //       path = [];
  //     }

  //     사용자의 위치 변경을 감지하여 이동 경로를 업데이트하고 선과 마커 그림
      function updatePath(position) {
        var latLng = new kakao.maps.LatLng(position.latitude, position.longitude);
  

        // 이동 경로에 새로운 위치 추가
        path.push(latLng);
  
        // 선을 그리고 지도에 표시
        drawPolyline(latLng);
  
        // 지도 중심을 사용자의 위치로 이동
        map.setCenter(latLng);



      //   if (path.length === 1) {
      //    drawMarker(latLng);

      //  }


      }
  
 
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

      const startTracking = () => {
        // 위치가 변경될 때마다 호출되는 이벤트 핸들러
        kakao.maps.event.addListener(map, 'center_changed', function() {
          var newCenter = map.getCenter();
    
            marker.setPosition(newCenter); // 지구본 마커의 위치를 새중심
            circleOverlay.setPosition(newCenter)// 마커의 위치를 새중심
            
    
            // 시작점부터 현재 위치까지 라인을 그린다.
            drawPolyline(linePath);
        });
    }
    

    </script>
  </body>
  </html>`
}

export default mapPolylineHTML
