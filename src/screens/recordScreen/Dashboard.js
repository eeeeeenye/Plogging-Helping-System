import React, {useEffect,useState} from 'react';
import { View,Alert } from 'react-native';
import Background from '../../components/Background';
import LocationTracker from '../../map/mapPolyline';
import StepCounter from '../../addons/Pedometer';
import StopWatchAPI from '../../addons/Watch';
import clientManager from '../../helpers/localStorage';
import { useSelector } from 'react-redux';

function Dashboard({navigation}) {

  useEffect(()=>{
    navigation.navigate('TabNav')
  },[])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', height: 50, top: 20 }}>
          <StepCounter style={{ flex: 1 }} />
          <StopWatchAPI 
          style={{ flex: 1 }}
          navigation={navigation} />
      </View>
      <View style={{ flex: 1 , top:100}}>
          <LocationTracker/>
      </View>
    </View>
  );
}

export default Dashboard;