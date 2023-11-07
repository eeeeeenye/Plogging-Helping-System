const daumPostSet = (url, position) => {
  return `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script type="text/javascript" src="${url}"></script>
            </head>
            <body>

              <div id="map" style="width:100%;height:100%;"></div>
              <div class="hAddr">
              <span class="title">지도중심기준 행정동 주소정보</span>
              <span id="centerAddr"></span>
          </div>
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
 
  
    kakao.maps.event.addListener(marker, 'click', function() {
  
        // 마커 위치를 주소로 변환
        geocoder.coord2Address(markerPosition.getLng(), markerPosition.getLat(), function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            var address = result[0].address.address_name;
            console.log('마커 주소:', address);
          } else {
            console.log('주소 변환 실패');
          }

        });

      });
 
      
</script>
    
            </body>
          </html>
        `
}

export default daumPostSet
