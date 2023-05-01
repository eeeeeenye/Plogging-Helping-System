import * as Location from 'expo-location';
import {View} from 'react-native'
import React,{useState,useEffect} from 'React'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button';

const LocationSettings =({navigation})=>{
    useEffect(()=>{     //실행될때 한번만 실행

    },[])

    async function settings(){
        //권한 얻기
        await Location.requestPermissionsAsync();
      
        //현재 위치 정보 얻기 -> 시스템 location
          const locationData= await Location.getCurrentPositionAsync();
          const latitude = locationData['coords']['latitude']		  // 위도 가져오기
          const longitude = locationData['coords']['longitude']		// 경도 가져오기
          const location = await Location.reverseGeocodeAsync(    // 위도와 경도를 입력하면 자신의 위치를 역으로 변환
            { latitude, longitude },
              { useGoogleMaps: false }
          );
    }
    
    return(
        <View style={{flex:1}}>
            <Paragraph>
                위치설정
            </Paragraph>
            {/* 지도 마커(자신의 위치) 넣는 화면*/}
            {/*자신이 위치한 동이 뭔지 Paragraph를 통해 아래에 표시*/}
            <Button
            mode="outlined"
            onPress={() => navigation.navigate('StartScreen')}
            >
                확인
                </Button>
        </View>
    )
}

export default LocationSettings;