import React from 'react'
import { View } from 'react-native';
import Background from '../components/Background'
import KakaoMapScreen from './HomeMain';
import StepCounter from '../addons/Pedometer';
import StopWatchAPI from '../addons/Watch';

export default function Dashboard(props) {
  const { route } = props;                  // route를 props로부터 분리하여 할당
  const {width, height} = route.params

  return (
    <View style={{ flex: 1 }}>
      <KakaoMapScreen width={width} height={height}/>
      <StepCounter/>
      <StopWatchAPI/>
    </View>
  )
}
