import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import Background from '../../components/Background';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import RestroomSet from './htmlCode/RestroomHTML';
import axios from 'axios';
import Constants from 'expo-constants';

function Public_toilet({ navigation }) {
  const [markers, setMarkers] = useState([]); // 정제된 데이터를 저장할 상태 변수
  const ip = Constants.manifest.extra.Local_ip;

  useEffect(() => {
    // 백엔드에서 정제된 데이터를 가져와 markers 상태 변수에 설정
    getData();

    navigation.navigate('TabNav');
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`http://${ip}:3000/publicToilets`);
      const data = response.data;
      setMarkers(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          source={{ html: RestroomSet(markers) }}
          javaScriptEnabled={true}
        />
      </View>
    </View>
  );
}

export default Public_toilet;
