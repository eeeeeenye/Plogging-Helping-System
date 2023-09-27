require('dotenv').config()

const db = require('../db')
const randomstring = require('randomstring')
const bcrypt = require('bcrypt')

module.exports = {
  // 공공데이터 부분 관련 코드 // 충청남도 화장실 다뜨게 천안시 아산시 그리고 내위치 뜨도록 최종 수정 필요
  // 화장실 정보 api end point
  publicToiletControl: async (req, res) => {
    try {
      const serviceKey = process.env.openRestAPI
      const toiletUrl =
        'http://api.data.go.kr/openapi/tn_pubr_public_toilet_api'
      const queryParams = [
        'serviceKey=' + serviceKey,
        'pageNo=1',
        'numOfRows=100',
        'type=json',
      ].join('&')

      const url = toiletUrl + '?' + queryParams
      const response = await axios.get(url)
      const Data = response.data.response.body.items

      const refinedData = Data.map((item) => {
        return {
          rdnmadr: item.rdnmadr,
          lnmadr: item.lnmadr,
          latitude: item.latitude,
          longitude: item.longitude,
        }
      })

      res.json(refinedData)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },
}
