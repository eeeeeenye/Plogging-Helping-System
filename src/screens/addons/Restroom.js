const LocationSet = (url, position) => {
  const apiUrl = "http://api.data.go.kr/openapi/tn_pubr_public_toilet_api";

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const toilets = data.results; // 공공 화장실 위치 정보가 담긴 배열입니다.

      // Kakao 지도 API를 사용하기 위해 API 키를 입력하세요.
      kakao.maps.load(function () {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(${position?.lat}, ${position?.lng}), // 현재 위치를 기준으로 지도를 보여줍니다.
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);

        // 공공 화장실 위치 정보를 마커로 표시합니다.
        toilets.forEach(toilet => {
          const toiletPosition = new kakao.maps.LatLng(toilet.latitude, toilet.longitude);
          const marker = new kakao.maps.Marker({
            position: toiletPosition,
          });
          marker.setMap(map);
        });
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="${url}"></script>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAPS_API_KEY&libraries=services"></script> <!-- Kakao 지도 API 스크립트를 추가합니다. -->
      </head>
      <body>
        <div id="map" style="width: 100%; height: 70%;"></div>
      </body>
    </html>
  `;
};

export default LocationSet;
