import React from 'react';
import { View } from 'react-native';
import Background from '../components/Background';
import locationTracker from '../map/mapPolylineHTML';
import StepCounter from '../addons/Pedometer';
import StopWatchAPI from '../addons/Watch';
import clientManager from '../helpers/localStorage';

export default function Dashboard() {

  clientManager.getAllKeys();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', height:50, top: 20}}>            {/*flex 레이아웃으로 row로 1:1비율을 유지하겠다.*/ }
        <StepCounter style={{ flex: 1 }} />
        <StopWatchAPI style={{ flex: 1 }} />
      </View>
      <View style={{ flex: 1 }}>
        <locationTracker/>
      </View>
    </View>
  );
}
