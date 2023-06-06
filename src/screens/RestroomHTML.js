// markers 데이터를 가져오는 비동기 함수 예시
// ERROR  Failed to fetch markers: [TypeError: Network request failed]
async function fetchMarkers(url) {
  try {
    const response = await fetch(url); // 외부 API 호출 또는 데이터 요청
    const data = await response.json(); // 응답 데이터를 JSON 형식으로 파싱
    return data.markers; // markers 데이터 반환
  } catch (error) {
    console.error('Failed to fetch markers:', error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}

const RestroomSet = async (url, position) => {
  // markers 데이터 가져오기
  const markers = await fetchMarkers(url);

  return(`
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=093f44ff0baa195ab8c672ddce75f0fd&libraries=services"></script>
        <style>
          #map {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const markers = ${JSON.stringify(markers)}; // 가져온 화장실 위치 데이터

          // Kakao 지도 API 초기화 
          kakao.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
              center: new kakao.maps.LatLng(37.5665, 126.9780), // 초기 지도 중심 좌표 설정
              level: 3, // 초기 지도 확대 레벨 설정
            };
            const map = new kakao.maps.Map(container, options);

            // 화장실 위치에 마커 생성
            markers.forEach((marker) => {
              const markerPosition = new kakao.maps.LatLng(marker.latitude, marker.longitude);
              const marker = new kakao.maps.Marker({
                position: markerPosition,
              }); 
              marker.setMap(map);
            });
          });
        </script>
      </body>
    </html>
  `)
}

export default RestroomSet;
