import React, { useState, useEffect } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { useDispatch } from 'react-redux';
import { start, stop, reset } from '../slices/All/Watchslice';

const StopWatchAPI = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [resetStatus, setResetStatus] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(isRunning){
      dispatch(start())
    }else{
      dispatch(stop())
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
