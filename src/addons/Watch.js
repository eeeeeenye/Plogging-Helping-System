import React, { useState, useEffect } from 'react';
import { Text, View, TouchableHighlight, Alert, StyleSheet } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { useDispatch } from 'react-redux';
import { start, stop, reset,updateElapsedTime } from '../../slices/All/Watchslice';

const StopWatchAPI = ({ navigation }) => {
  const [isRunning, setIsRunning] = useState(null);
  const [resetStatus, setResetStatus] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRunning) {
      dispatch(start());
    }

    if (isRunning === false) {
      dispatch(stop());
      Alert.alert(
        '기록종료',
        '기록을 종료하시겠습니까?',
        [
          {
            text: '예',
            onPress: () => {
              navigation.navigate('Camera');
            },
          },
          {
            text: '아니오',
            onPress: () => {
              dispatch(stop());
            },
          },
        ],
      );
    }
  }, [isRunning]);

  useEffect(() => {
    if (resetStatus) {
      dispatch(reset());
    }
  }, [resetStatus]);

  const toggleStopwatch = () => {
    setIsRunning(!isRunning);
    setResetStatus(false);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setResetStatus(true);
  };

  const handleTimeElapsed = (time) => {
    const minutes = Math.floor(time / (1000 * 60));
    console.log(minutes);
  };

  return (
    <View>
      <Stopwatch
        laps
        msecs
        start={isRunning}
        reset={resetStatus}
        options={options}
        getTime={(time) => {if(!isRunning){dispatch(updateElapsedTime(time))}}}
      />
      <View style={{position:'absolute', top:480, left:180}}>
      <TouchableHighlight style={styles.circleButton} onPress={toggleStopwatch}>
        <Text style={styles.buttonText}>{!isRunning ? 'Start' : 'Stop'}</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.circleButton} onPress={resetStopwatch}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableHighlight>
      </View>
    </View>
  );
};

const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 20,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 10,
  },
};

const styles = StyleSheet.create({
  circleButton: {
    width: 70,
    height: 70,
    marginLeft:30,
    marginTop:10,
    borderRadius: 40,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
  },
});

export default StopWatchAPI;
