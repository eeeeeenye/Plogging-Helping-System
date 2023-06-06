import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios';
import Button from '../../components/Button';
import RestroomSet from './htmlCode/RestroomHTML';
import MyComponent from '../map/Public_Service';

const RestroomSettings = ({ navigation }) => {
  const [position, setPosition] = useState(null);
  const [city, setCity] = useState(null);
  const ip = Constants.manifest.extra.Local_ip;

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        // Handle permission not granted
        return;
      }

      const locationData = await Location.getCurrentPositionAsync();
      const latitude = locationData['coords']['latitude'];
      const longitude = locationData['coords']['longitude'];
      const location = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      setPosition({ lat: latitude, lng: longitude });
      setCity(location[0].district);
    } catch (error) {
      console.error(error);
      Alert.alert(error);
    }
  };

  const fetchToiletData = async () => {
    try {
      const response = await fetch('http://api.data.go.kr/openapi/tn_pubr_public_toilet_api');
      const data = await response.json();
      const toiletLocations = data.result;

      const html = RestroomSet(
        Constants.manifest.extra.KAKAO_JAVASCRIPT_KEY,
        position,
        toiletLocations
      );
      return html;
    } catch (error) {
      console.error(error);
      Alert.alert(error);
    }
  };

  const onPressButton = async () => {
    try {
      console.log(city, '----------------->>>>');
      await axios.put(`http://${ip}:3000/plogging/:params`, { city: city });
      navigation.navigate('HomeMain');
    } catch (event) {
      console.log(event);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getLocation();
      const html = await fetchToiletData();
      setWebViewHtml(html);
    };

    fetchData();
  }, []);

  const [webViewHtml, setWebViewHtml] = useState(null);

  if (!position || !webViewHtml) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: webViewHtml }}
        javaScriptEnabled={true}
        injectedJavaScript={''}
        style={{
          flex: 1,
          top: 100,
        }}
      />
      <Button mode="outlined" onPress={onPressButton} style={{ bottom: 130 }}>
        확인
      </Button>

      <MyComponent /> {/* MyComponent를 렌더링 */}
    </View>
  );
};

export default RestroomSettings;
