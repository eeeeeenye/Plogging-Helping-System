import * as Location from 'expo-location';
import {View} from 'react-native'
import React,{useState,useEffect} from 'react'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button';
import KakaoMapScreen from './HomeMain';
//최대한 디자인은 배제

const LocationSettings =({navigation})=>{

    
    return(
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
            <KakaoMapScreen width='100%' height='70%'/>
            <Button
            mode="outlined"
            onPress={() => navigation.navigate('StartScreen')}
            style={{bottom:200}}
            >
                확인
                </Button>
        </View>
    )
}

export default LocationSettings;