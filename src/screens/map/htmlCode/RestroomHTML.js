    const RestroomSet = async (url, position) => {
        const response = await fetch('http://api.data.go.kr/openapi/tn_pubr_public_toilet_api');
        const data = await response.json();
        const toiletLocations = data.result;
      
        return `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script type="text/javascript" src="${url}"></script>
            </head>
            <body>
              <div id="map" style="width:100%;height:70%;"></div>
              <script>
                const container = document.getElementById('map');
                const options = {
                  center: new kakao.maps.LatLng(${position?.lat}, ${position?.lng}),
                  level: 3,
                };
                const map = new kakao.maps.Map(container, options);
      
                // 공공 화장실 위치에 마커 표시
                const toiletMarkerPositions = ${JSON.stringify(toiletLocations)}.map((location) => ({
                  lat: location.latitude,
                  lng: location.longitude,
                }));
      
                toiletMarkerPositions.forEach((markerPosition) => {
                  const marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(markerPosition.lat, markerPosition.lng),
                  });
                  marker.setMap(map);
                });
              </script>
            </body>
          </html>
        `;
      };
      
      export default RestroomSet;
      