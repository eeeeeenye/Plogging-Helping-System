import React, {useEffect} from 'react';
import { View,StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import Background from '../../components/Background';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import RestroomSet from './htmlCode/RestroomHTML';

function Public_toilet({navigation}) {
  useEffect(()=>{
    navigation.navigate('TabNav')
  },[])

  const markers = [
    {
      latitude: 37.12345,
      longitude: 126.67890
    },
    {
      latitude: 37.54321,
      longitude: 126.09876
    },
    {
        latitude: 37.26272,
        longitude: 123.0923
    }
  ];
  
  console.log('dddddddddd')

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
            <WebView
                style={{ flex: 1 }} // 스타일 추가
                source={{ html: RestroomSet(markers) }}
                javaScriptEnabled={true}
            />
        </View>
    </View>
    
  );
}

export default Public_toilet;




