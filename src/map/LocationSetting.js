import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import clientManager from '../helpers/localStorage';
import axios from 'axios'
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import LocationSet from './htmlCode/LocationHTML';


//수정필요!!!!!!!!!!!!!!!!
const LocationSettings = ({navigation}) => {
  const [position, setPosition] = useState(null);
  const [city, setCity] = useState(null);
  const ip = Constants.manifest.extra.Local_ip;

  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();

      //현재 위치 정보 얻기 -> 시스템 location
      const locationData = await Location.getCurrentPositionAsync();
      const latitude = locationData['coords']['latitude']; // 위도 가져오기
      const longitude = locationData['coords']['longitude']; // 경도 가져오기
      const location = await Location.reverseGeocodeAsync(
        // 위도와 경도를 입력하면 자신의 위치를 역으로 변환
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      setPosition({ lat: latitude, lng: longitude });
      setCity(location[0].district);
      await axios.put(`http://${ip}:3000/plogging/:params`, {Client_ID:clientID._j.clientID,city:city._j});
      clientManager.storeData('user',ClientData)
      dispatch(authorize(ClientData))
        

      return

    } catch (error){
      console.error(error);
      clientManager.storeData('login',false);
      Alert.alert(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      getLocation();
    };
    
    fetchData();
  }, []);

  // position이 존재하지 않으면 렌더링하지 않는다.
  if (!position) {
    return null;
  }

  // 카카오 맵 API를 사용하기 위한 설정값
  const apiKey = Constants.manifest.extra.KAKAO_JAVASCRIPT_KEY;
  console.log(apiKey);
  const url = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`;
  

  return (
    <View style={{flex:1}}>
    <Paragraph
      style={{
      color:'black',
      top:100,
      left:167,
      fontSize:20,
      }}>
      위치설정
    </Paragraph>
    <WebView
        originWhitelist={['*']}
        source={{ html: LocationSet(url,position) }}
        javaScriptEnabled={true}
        injectedJavaScript={''}
        style={{ 
          flex: 1,
          top: 100 }}
      />
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('') }
      style={{bottom:150}}
    >
      확인
    </Button>
    </View>
  );
};

export default LocationSettings;
