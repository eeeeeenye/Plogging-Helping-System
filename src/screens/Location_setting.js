import {View} from 'react-native'
import React,{useState,useEffect} from 'react'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button';
import KakaoMapScreen from './HomeMain';
import axios from 'axios';
import clientManager from '../helpers/localStorage';
import Constants from 'expo-constants';
//최대한 디자인은 배제

const LocationSettings =({navigation})=>{
    const clientID = clientManager.getData('user')
    const city = clientManager.getData('city')
    const ip = Constants.manifest.extra.Local_ip;

    async function locationDB(){
        
        try {
            await axios.put(`http://${ip}:3000/plogging/:params`, {Client_ID:clientID._j.clientID,city:city._j});
            navigation.navigate('Dashboard',{ width: '100%', height: '70%' })
            return
        } catch (error) {
            console.error(error);
        }
    }
    
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
            <KakaoMapScreen 
            width='100%' 
            height='70%'
            tag= 'settings'
            />
            <Button
            mode="outlined"
            onPress={() => locationDB()}
            style={{bottom:150}}
            >
                확인
                </Button>
        </View>
    )
}

export default LocationSettings;