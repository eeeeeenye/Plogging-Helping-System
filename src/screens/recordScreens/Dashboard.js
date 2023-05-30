import React, {useEffect,useState} from 'react';
import { View,Alert } from 'react-native';
import Background from '../../components/Background';
import LocationTracker from '../map/mapPolyline';
import StepCounter from '../addons/Pedometer';
import StopWatchAPI from '../addons/Watch';
import { useSelector } from 'react-redux';
import Distance from './distance';

function Dashboard({navigation}) {

  useEffect(()=>{
    navigation.navigate('TabNav')
  },[])

  return (
    <View style={{ flex: 1, backgroundColor:'white' }}>
      <View style={{ flex: 1}}>
        <View style={{ position:'absolute', top: 30, left: 110, right: 0, bottom: 0, zIndex:2 }}>
          <StopWatchAPI 
          style={{ flex:1 }}
          navigation={navigation} />
        </View>
        <View style={{ position:'absolute', top: 0, left: 0, right: 300, bottom: 610, zIndex:1 }}>
          <Distance/>
        </View>
        <View>
          <LocationTracker/>
        </View>
        <View style={{ position:'absolute', top: 300, left: 300, right: 0, bottom: 150, zIndex:1 }}>
          <StepCounter/>
        </View>
      </View>
    </View>
      
      
      
    
  );
}

export default Dashboard;