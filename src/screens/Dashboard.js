import React from 'react';
import { View, Text } from 'react-native';
import Background from '../components/Background';
import LocationTracker from '../map/mapPolylineHTML';
import StepCounter from '../addons/Pedometer';
import StopWatchAPI from '../addons/Watch';
import clientManager from '../helpers/localStorage';

export default function Dashboard() {

  clientManager.getAllKeys();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', height: 50, top: 20 }}>
          <StepCounter style={{ flex: 1 }} />
          <StopWatchAPI style={{ flex: 1 }} />
      </View>
      <View style={{ flex: 1 , top:100}}>
          <LocationTracker/>
      </View>
    </View>
  );
}
