import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const MyComponent = () => {
  const [toiletData, setToiletData] = useState([]);
  const ip = Constants.manifest.extra.Local_ip;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://${ip}:3000/publicToilets`
      );

      // 가져온 데이터 정제하기, 도로명, 지번, 위도, 경도 가져오기
      const refinedData = response.data.map((item) => {
        return {
          rdnmadr: item.rdnmadr,
          lnmadr: item.lnmadr,
          latitude: item.latitude,
          longitude: item.longitude,
        };
      });

      setToiletData(refinedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {toiletData.map((item, index) => (
        <View key={index}>
          <Text>주소: {item.rdnmadr}</Text>
          <Text>상세주소: {item.lnmadr}</Text>
          <Text>위도: {item.latitude}</Text>
          <Text>경도: {item.longitude}</Text>
        </View>
      ))}
    </View>
  );
};

export default MyComponent;
