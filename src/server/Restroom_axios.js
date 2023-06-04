const express = require('express');
const axios = require('axios');
const app = express();

// 환경 변수 설정
require('dotenv').config();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 화장실 정보 가져오기 엔드포인트
app.get('/toilets', async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY; // API 키를 .env 파일에 저장하고 사용
    const url = `http://api.data.go.kr/openapi/tn_pubr_public_toilet_api?serviceKey=${API_KEY}&type=json`;

    const response = await axios.get(url);
    const data = response.data;

    // 데이터 가공 또는 필요한 정보 추출 작업 수행
    const extractedData = extractToiletData(data);

    res.json(extractedData);
  } catch (error) {
    console.error('Error fetching toilet data:', error);
    res.status(500).json({ error: 'Failed to fetch toilet data' });
  }
});

// 데이터 가공 또는 필요한 정보 추출 작업 함수
const extractToiletData = (data) => {
  // 예시: 필요한 정보를 추출하여 객체 배열로 반환
  return data.map((toilet) => ({
    name: toilet.name,
    address: toilet.address,
    // 추가 필요한 정보 추출
  }));
};

// 서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
