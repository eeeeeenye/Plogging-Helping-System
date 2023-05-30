import React, { useState, useEffect } from 'react';
import { Text, View, TouchableHighlight,Alert } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { useDispatch } from 'react-redux';
import { start, stop, reset } from '../slices/All/Watchslice';

const StopWatchAPI = ({navigation}) => {
  const [isRunning, setIsRunning] = useState(null);
  const [resetStatus, setResetStatus] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(isRunning){
      dispatch(start())
    }
    
    if(isRunning === false){
      dispatch(stop())
      Alert.alert(
        '기록종료',
        '기록을 종료하시겠습니까?',
        [
          {
            text: '예',
            onPress: ()=>{
              navigation.navigate('Camera');
            },
          },
          {
            text: '아니오',
            onPress: ()=>{
              dispatch(stop())
            }
          },
        ],
      )
    }
  },[isRunning])

  useEffect(()=>{
    if(resetStatus){
      dispatch(reset())
    }
  },[resetStatus])

  const toggleStopwatch = () => {
    setIsRunning(!isRunning);
    setResetStatus(false);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setResetStatus(true);
  };

  return (
    <View>  
      <Stopwatch
        laps
        msecs
        start={isRunning}                   
        reset={resetStatus}
        options={options}
        getTime={(time) => {}}
      />
      <TouchableHighlight onPress={toggleStopwatch}>
        <Text style={{ fontSize: 30 }}>{!isRunning ? 'Start' : 'Stop'}</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={resetStopwatch}>
        <Text style={{ fontSize: 30 }}>Reset</Text>
      </TouchableHighlight>
    </View>
  );
};

const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  },
};

export default StopWatchAPI;
