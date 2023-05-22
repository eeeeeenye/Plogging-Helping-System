import React from 'react';
import { View } from 'react-native';
import Background from '../components/Background';
import KakaoMapScreen from './HomeMain';
import StepCounter from '../addons/Pedometer';
import StopWatchAPI from '../addons/Watch';
import clientManager from '../helpers/localStorage';

export default function Dashboard() {

  clientManager.getAllKeys();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', height:50, top: 20}}>
        <StepCounter style={{ flex: 1 }} />
        <StopWatchAPI style={{ flex: 1 }} />
      </View>
      <View style={{ flex: 1 }}>
        <KakaoMapScreen/>
      </View>
    </View>
  );
}
