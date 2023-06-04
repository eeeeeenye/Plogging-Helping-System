import React, { useState } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';

const StopWatchAPI = () => {
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);

  const toggleStopwatch = () => {
    setStart(!start);
    setReset(false);
  };

  const resetStopwatch = () => {
    setStart(false);
    setReset(true);
  };

  const handleTimeElapsed = (time) => {
    const minutes = Math.floor(time / (1000 * 60));
    console.log(minutes);
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

  return (
    <View>
      <Stopwatch
        laps={false}
        msecs={false}
        start={start}
        reset={reset}
        options={options}
        getTime={handleTimeElapsed}
      />
      <TouchableHighlight onPress={toggleStopwatch}>
        <Text style={{ fontSize: 30 }}>{!start ? 'Start' : 'Stop'}</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={resetStopwatch}>
        <Text style={{ fontSize: 30 }}>Reset</Text>
      </TouchableHighlight>
    </View>
  );
};

export default StopWatchAPI;
