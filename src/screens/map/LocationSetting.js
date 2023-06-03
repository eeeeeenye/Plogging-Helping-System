import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import clientManager from '../../helpers/localStorage';
import axios from 'axios'
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';
import LocationSet from './htmlCode/LocationHTML';
import { useSelector,useDispatch } from 'react-redux';
import {addAdress} from '../../slices/All/Authslice'


const LocationSettings = ({navigation}) => {
  const [position, setPosition] = useState(null);
  const [city, setCity] = useState(null);
  const ip = Constants.manifest.extra.Local_ip;
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.auth.user.Client_ID)

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
      return

    } catch (error){
      console.error(error);
      clientManager.storeData('login',false);
      Alert.alert(error);
    }
  };

  const onPressButton= async()=>{       // 버튼을 누르면 작동하는 기능들 (회원 상태값 업데이트, 화면전환)
    try{
      
      await axios.put(`http://${ip}:3000/plogging/:params`, {Client_ID:user,city:city});
      dispatch(addAdress(city))
      navigation.navigate('HomeMain')
    }catch(event){
      console.log(event)
    }
      
  }

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
      onPress={onPressButton}
      style={{bottom:150}}
    >
      확인
    </Button>
    </View>
  );
};

export default LocationSettings;
