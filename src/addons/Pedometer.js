import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function StepCounter() {
  const [steps, setSteps] = useState(0);
  
  useEffect(() => {
    let subscription;
    Accelerometer.setUpdateInterval(1000); // 1초마다 업데이트
  
    const calculateSteps = ({ x, y, z }) => {
      const acceleration = Math.sqrt(x*x + y*y + z*z);
      if (acceleration > 1.2) { // 걸음걸이 감지
        setSteps(prevState => prevState + 1);
      }
    };
  
    Accelerometer.isAvailableAsync().then(
      available => {
        if (available) {
          subscription = Accelerometer.addListener(calculateSteps);
        } else {
          console.log("Accelerometer is not available on this device.");
        }
      }
    );
  
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>걸음 수: {steps}</Text>
    </View>
  );
}