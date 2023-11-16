const daumPostSet = (url, position) => {
  return `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script type="text/javascript" src="${url}"></script>
              
            </head>
            <body>

              <div id="map" style="width:100%;height:100%;"></div>
  

              <script  type="text/javascript">

                const container = document.getElementById('map');
                const options = {
                  center: new kakao.maps.LatLng(${position?.lat}, ${position?.lng}), // 현재 위치를 기준으로 지도를 보여준다.
                  level: 1,
                };
                // const geocoder = new kakao.maps.services.Geocoder();

          
                const map = new kakao.maps.Map(container, options);
                
                const markerPosition = new kakao.maps.LatLng(${position?.lat}, ${position?.lng});
                const marker = new kakao.maps.Marker({
                  position: markerPosition,
                });
                marker.setMap(map); // 현재 위치에 마커를 찍는다.

    kakao.maps.event.addListener(map, 'center_changed', function() {
        var newCenter = map.getCenter(); // 지도의 새 중심 좌표 가져오기
     marker.setPosition(newCenter); // 마커의 위치를 새 중심으로 설정

  
    });  

  kakao.maps.event.addListener(map, 'dragend', function() {        
    
    // 지도 중심좌표를 얻어옵니다 
    var latlng = map.getCenter(); 
    
    var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
    message += '경도는 ' + latlng.getLng() + ' 입니다';
    
    window.ReactNativeWebView.postMessage(JSON.stringify({ lng:  latlng.getLng(),lat:latlng.getLat() }));
    
});
</script>   
            </body>


          </html>


        `
}

export default daumPostSet
