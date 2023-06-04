import React, {useEffect} from 'react';
import { View,StyleSheet } from 'react-native';
import Background from '../../components/Background';
import LocationTracker from '../map/mapPolyline';
import StepCounter from '../addons/Pedometer';
import StopWatchAPI from '../addons/Watch';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import LocationSettings from '../map/Restroom';

function Dashboard({navigation}) {
  useEffect(()=>{
    navigation.navigate('TabNav')
  },[])

  return (
    <View style={{ flex: 1, backgroundColor:'white' }}>
      <View style={{ flex: 1}}>
        <View style={{ position:'absolute', top: 40, left: 110, right: 0, bottom: 0, zIndex:2 }}>
          <StopWatchAPI 
          style={{ flex:1 }}
          navigation={navigation} />
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