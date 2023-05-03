import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState(0);
  const [lastStepTime, setLastStepTime] = useState(null);

  useEffect(() => {
    let subscription;
    if (isRunning) {
      subscription = Accelerometer.addListener(handleAccelerometerData);
    } else {
      subscription?.remove();
    }
    return () => subscription?.remove();
  }, [isRunning]);

  const handleAccelerometerData = ({ x, y, z }) => {
    const acceleration = Math.sqrt(x * x + y * y + z * z) - 1;
    if (acceleration > 1) {
      const now = Date.now();
      if (!lastStepTime || now - lastStepTime > 300) {
        setSteps(steps + 1);
        setLastStepTime(now);
      }
    }
  };

  const handleStartStopPress = () => {
    setIsRunning(!isRunning);
    setSteps(0);
    setLastStepTime(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stepsText}>{steps} steps</Text>
      <TouchableOpacity
        style={styles.startStopButton}
        onPress={handleStartStopPress}
      >
        <Text style={styles.startStopButtonText}>
          {isRunning ? 'Stop' : 'Start'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  startStopButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  startStopButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
