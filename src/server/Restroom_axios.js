const express = require('express');
const axios = require('axios');
const app = express();

// 포트 설정
app.set('port', process.env.PORT || 8080);

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 화장실 정보 API 엔드포인트
app.get('/publicToilets', async (req, res) => {
  try {
    const serviceKey = process.env.airServiceKey;
    const toiletUrl = 'http://api.data.go.kr/openapi/tn_pubr_public_toilet_api';
    const queryParams = [
      'ServiceKey=' + encodeURIComponent(serviceKey),
      'pageNo=1',
      'numOfRows=10',
      'resultType=json',
    ].join('&');

    const url = toiletUrl + '?' + queryParams;
    const response = await axios.get(url);
    const toiletData = response.data;

    // 화장실 정보 처리 및 응답
    // ...

    res.json(toiletData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 서버 시작
app.listen(app.get('port'), () => {
  console.log('Server is running on port', app.get('port'));
});
