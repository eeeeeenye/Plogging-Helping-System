const daumPostSet = (url, position) => {
  return `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script type="text/javascript" src="${url}"></script>
            </head>
            <body>

              <div id="map" style="width:100%;height:100%;"></div>
         
    </div>
              <script>

              var geocoder = new kakao.maps.services.Geocoder();
                const container = document.getElementById('map');
                const options = {
                  center: new kakao.maps.LatLng(${position?.lat}, ${position?.lng}), // 현재 위치를 기준으로 지도를 보여준다.
                  level: 1,
                };
             
          
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

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
  }
 
</script>
    
            </body>
          </html>
        `
}

export default daumPostSet
